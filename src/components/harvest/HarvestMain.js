import React from "react";
import {Store} from "../../flux";
import {Col, Container, Row} from "shards-react";
import HarvestResult from "../../components/harvest/HarvestResult";
import HarvestDevtools from "../../components/harvest/HarvestDevtools";
import {HarvestApi} from "../../services";
import PageTitle from "../../components/common/PageTitle";
import type {HarvestTaskStatusType} from "../../lib/HarvestTaskStatusType";
import {RingLoader} from "react-spinners";
import {formatPercentage, isUrl} from "../../lib/utils"
import PropTypes from "prop-types";
import {getRestApiBaseURI} from "../../lib/api";

let auth = Store.getAuth()
const clientTemplate = {
  username: auth.username,
  authToken: auth.authToken,
  args: "-i 1d -ii 365d -ol a[href~=/dp/] -diagnose -vj",
  apiEntry: getRestApiBaseURI() + "/api",
  proxyLinks: true
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
      message: "加载中 ...",
      clientTemplate: clientTemplate,
      harvestTaskStatus: defaultHarvestStatus
    };

    this.timer = null;
    this.tick = 0;

    this.submitTask = this.submitTask.bind(this);
    this.getHarvestTaskStatus = this.getHarvestTaskStatus.bind(this);
    this.clearRequestInterval = this.clearRequestInterval.bind(this);
    this.getTables = this.getTables.bind(this);
  }

  componentDidMount() {
    this.submitTask(this.state.portalUrl)
  }

  componentWillUnmount() {
    this.clearRequestInterval()
  }

  submitTask(portalUrl) {
    let request = this.state.clientTemplate
    if (!portalUrl.startsWith("http")) {
      return
    }

    request.portalUrl = portalUrl
    HarvestApi.query(request).then((taskId) => {
      console.log("Task id: " + taskId)

      this.setState({taskId: taskId})
      this.getHarvestTaskStatus(taskId)
    }).catch(function (ex) {
      console.log('Response parsing failed. Error: ', ex);
    });
  }

  getHarvestTaskStatus(id) {
    let request = getTaskStatusRequest(id)
    let component = this
    let portalUrl = this.state.portalUrl
    this.timer = setInterval(() => {
      if (!this.adjustInterval(++component.tick, component.timer)) {
        return
      }

      HarvestApi.get(request).then((taskStatus) => {
        console.log("status:  " + taskStatus.statusCode
          + " " + taskStatus.ntotalPages
          + " " + taskStatus.nsuccessPages)
        // console.log(JSON.stringify(taskStatus))

        let message = this.buildMessage(component.tick, portalUrl, taskStatus)
        this.setState({
          ...this.state,
          message: message,
          harvestTaskStatus: taskStatus
        })

        if (taskStatus.statusCode === 200) {
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

  adjustInterval(tick: number, timer: number) {
    if (tick > 180) {
      clearInterval(timer)
      return false
    } else if (tick > 120 && tick % 20 === 0) {
      return false
    } else if (tick > 60 && tick % 10 === 0) {
      return false
    } else if (tick > 30 && tick % 5 === 0) {
      return false
    } else if (tick > 20 && tick % 3 === 0) {
      return false
    } else if (tick % 2 === 0) {
      return false
    }

    return true
  }

  clearRequestInterval() {
    this.tick = 0
    clearInterval(this.timer)
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
      message = "分析中 ..."
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

    return (
      <Row>
        <Col className="p-0">
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
          <PageTitle title="柏拉图 AI 浏览器" subtitle={message} className="text-sm-left mb-3 ml-3"/>
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
