import React from "react";
import {Constants, Dispatcher, Store} from "../../flux";
import {Col, Container, Navbar, NavLink, Row} from "shards-react";
import HarvestResult from "../../components/harvest/HarvestResult";
import HarvestDevtools from "../../components/harvest/HarvestDevtools";
import {HarvestApi, HotLinkApi} from "../../services";
import PageTitle from "../../components/common/PageTitle";
import type {HarvestTaskStatusType} from "../../lib/HarvestTaskStatusType";
import {RingLoader} from "react-spinners";
import {
  adjustInterval,
  formatPercentage,
  getHarvestUrl,
  isUrl
} from "../../lib/utils"
import PropTypes from "prop-types";
import {getRestApiBaseURI} from "../../lib/api";
import MainNavbar from "../layout/MainNavbar/MainNavbar";
import getHotLinks from "../../data/hot-links";

let auth = Store.getAuth()
const clientTemplate = {
  username: auth.username,
  authToken: auth.authToken,
  args: "-diagnose -vj",
  apiEntry: getRestApiBaseURI() + "/api"
}

let defaultHarvestStatus: HarvestTaskStatusType = {
  statusCode: 201,
  status: "Created",
  result: {
    tables: []
  }
}

function getTaskStatusRequest(id) {
  return {
    "username": clientTemplate.username,
    "authToken": clientTemplate.authToken,
    "id": id
  }
}

class HarvestMain extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      portalUrl: this.props.portalUrl,
      args: this.props.args,
      mode: this.props.mode,
      message: "加载中 ...",
      clientTemplate: clientTemplate,
      harvestTaskStatus: defaultHarvestStatus,
      hotLinks: getHotLinks(),
    };

    this.timer = null;
    this.tick = 0;

    if (this.state.mode === "dev") {
      Dispatcher.dispatch({
        actionType: Constants.TOGGLE_DEVTOOLS
      });
    }

    this.submitTask = this.submitTask.bind(this);
    this.getHarvestTaskStatus = this.getHarvestTaskStatus.bind(this);
    this.clearRequestInterval = this.clearRequestInterval.bind(this);
    this.getTables = this.getTables.bind(this);
    this.triggerDevtools = this.triggerDevtools.bind(this);
    this.getHotLinks = this.getHotLinks.bind(this);
  }

  componentDidMount() {
    this.submitTask(this.state.portalUrl, this.state.args)
  }

  componentWillUnmount() {
    this.clearRequestInterval()
  }

  triggerDevtools() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_DEVTOOLS
    });
    this.setState({...this.state, devMode: Store.getDevMode()})
  }

  getHotLinks() {
    HotLinkApi.get().then((hotLinks) => {
      if (hotLinks && hotLinks.length > 0) {
        this.setState({...this.state, hotLinks: hotLinks})
      }
    }).catch(function (ex) {
      console.log('Response parsing failed. Error: ', ex);
    });
  }

  submitTask(portalUrl: string, args: string) {
    let request = this.state.clientTemplate
    if (!isUrl(portalUrl)) {
      console.log('A valid url is required | <' + portalUrl + '>')
      return
    }

    request.portalUrl = portalUrl
    request.args = args
    HarvestApi.query(request).then((taskId) => {
      console.log("Task id: " + taskId)

      this.setState({...this.state, taskId: taskId})
      this.getHarvestTaskStatus(taskId)
    }).catch(function (ex) {
      console.log('Response parsing failed. Error: ', ex);
    });
  }

  getHarvestTaskStatus(id) {
    let request = getTaskStatusRequest(id)
    let portalUrl = this.state.portalUrl
    this.timer = setInterval(() => {
      if (!adjustInterval(++this.tick, this.timer)) {
        return
      }

      HarvestApi.get(request).then((taskStatus) => {
        console.log("status:  " + taskStatus.statusCode
          + " " + taskStatus.ntotalPages
          + " " + taskStatus.nsuccessPages)

        let message = this.buildMessage(this.tick, portalUrl, taskStatus)
        this.setState({
          ...this.state,
          message: message,
          harvestTaskStatus: taskStatus
        })

        if (taskStatus.statusCode === 200 || taskStatus.isDone) {
          this.clearRequestInterval()
        }
      }).catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
    }, 1000)
  }

  getTables() {
    let taskStatus = this.state.harvestTaskStatus
    if (taskStatus.statusCode === 200) {
      return taskStatus.result.tables.filter((table) => !table.tableData.isCombined)
    } else {
      return []
    }
  }

  clearRequestInterval() {
    this.tick = 0
    clearInterval(this.timer)
    this.timer = null
  }

  buildMessage(tick: number, portalUrl: string, taskStatus: HarvestTaskStatusType) {
    let message = ""
    let statusCode = taskStatus.statusCode
    if (portalUrl === "") {
      message = "你好，世界"
    } else if (!isUrl(portalUrl)) {
      message = "请输入一个有效链接 ..."
    } else if (statusCode === 404) {
      message = "加载中 ..."
    } else if (statusCode === 201) {
      message = "准备分析 ..."
    } else if (statusCode >= 100 && statusCode < 200) {
      message = "正在分析 ..."
    }

    if (tick > 180) {
      message = "刷新试试"
    }

    return message
  }

  render() {
    let devMode = Store.getDevMode()
    let taskStatus = this.state.harvestTaskStatus
    let statusCode = taskStatus.statusCode
    let message = this.state.message
    let tables = this.getTables()
    const hotLinks = this.state.hotLinks

    return (
      <Row>
        <Col className="p-0">
          <MainNavbar defaultUrl={this.state.portalUrl} args={this.state.args}
                      stickyTop={true} devtoolsSwitch={true}/>

          <Row className="align-items-center">
            <Col className="mx-auto col-md-8 col-sm-auto">
              <Navbar type="light"
                      className="mx-auto mt-3 align-items-stretch flex-md-nowrap p-0">
                {hotLinks.map((link, i) => (
                  <NavLink key={i}
                           href={getHarvestUrl(this.state.mode, link.href)}>{link.text}</NavLink>
                ))}
              </Navbar>
            </Col>
          </Row>

          {
            (statusCode !== 200)
              ? this.renderLoading(taskStatus, message)
              : this.renderHarvestResult(devMode, tables)
          }
        </Col>
      </Row>
    )
  }

  renderHarvestResult(devMode, tables) {
    return (
      !devMode ?
        <HarvestResult
          portalUrl={this.state.portalUrl}
          args={this.state.clientTemplate.args}
          tables={tables}
        /> :
        <HarvestDevtools
          portalUrl={this.state.portalUrl}
          args={this.state.clientTemplate.args}
          tables={tables}
        />
    )
  }

  renderLoading(taskStatus, message: String) {
    return (
      <Container fluid>
        <Row noGutters className="page-header py-4">
          <PageTitle title="柏拉图 AI 浏览器" subtitle={message}
                     className="text-sm-left mb-3 ml-3"/>
        </Row>

        <Row className="page-loading align-items-center h-100">
          <div className="mx-auto">
            <div className="jumbotron text-center">
              <RingLoader
                size={60}
                color={"#36D7B7"}
                css={"display: inline-block"}
                loading={this.state.statusCode !== 200}
              />
            </div>
            <div className="jumbotron mt-0">
              {
                (taskStatus.ntotalPages == null || taskStatus.ntotalPages === 0)
                  ?
                  (<div>正在分析中 。。。</div>)
                  :
                  (
                    (taskStatus.nsuccessPages >= taskStatus.ntotalPages) ? (
                        <div>正在解读网页集。。。</div>) :
                      (
                        <div>正在访问第 {taskStatus.nsuccessPages}/{taskStatus.ntotalPages} 个网页
                          - {formatPercentage(100 * taskStatus.nsuccessPages / taskStatus.ntotalPages)}</div>)
                  )
              }
            </div>
          </div>
        </Row>
      </Container>
    )
  }
}

HarvestMain.propTypes = {
  /**
   * The portalUrl .
   */
  portalUrl: PropTypes.string,
  /**
   * The portalUrl .
   */
  args: PropTypes.string,
  /**
   * The tables dataset.
   */
  tables: PropTypes.array
};

export default HarvestMain;
