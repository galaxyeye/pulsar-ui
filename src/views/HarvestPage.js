import React from "react";
import {Store} from "../flux";
import {Col, Container, Row} from "shards-react";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import HarvestResult from "../components/harvest/HarvestResult";
import HarvestDevtools from "../components/harvest/HarvestDevtools";
import {HarvestApi} from "../services";
import PageTitle from "../components/common/PageTitle";
import type {HarvestTaskStatusType} from "../lib/HarvestTaskStatusType";
import {RingLoader} from "react-spinners";

let auth = Store.getAuth()
const clientTemplate = {
  username: auth.username,
  authToken: auth.authToken,
  args: "-i 1d -ii 365d -ol a[href~=/dp/] -diagnose -vj",
  apiEntry: Store.getApiHost() + "/api",
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
  return {"username": clientTemplate.username, "authToken": clientTemplate.authToken, "id": id}
}

class HarvestPage extends React.Component {
  constructor(props) {
    super(props)

    // Set some state
    this.state = {
      portalUrl: Store.getPortalUrl(),
      message: "加载中 ...",
      devMode: Store.getDevMode(),
      clientTemplate: clientTemplate,
      harvestTaskStatus: defaultHarvestStatus
    };

    this.timer = null;
    this.tick = 0;

    this.onDevModeChange = this.onDevModeChange.bind(this);
    this.onPortalUrlChange = this.onPortalUrlChange.bind(this);
    this.submitTask = this.submitTask.bind(this);
    this.getHarvestTaskStatus = this.getHarvestTaskStatus.bind(this);
    this.getTables = this.getTables.bind(this);
  }

  componentDidMount() {
    this.submitTask(this.state.portalUrl)

    Store.addDevtoolsToggleListener(this.onDevModeChange);
    Store.addPortalUrlChangeListener(this.onPortalUrlChange);
  }

  componentWillUnmount() {
    Store.removeDevtoolsToggleListener(this.onDevModeChange);
    Store.removePortalUrlChangeListener(this.onPortalUrlChange);
    clearInterval(this.timer)
  }

  onDevModeChange() {
    this.setState({
      ...this.state,
      devMode: Store.getDevMode()
    });
  }

  onPortalUrlChange() {
    let portalUrl = Store.getPortalUrl()

    console.log("changed to 1: " + Store.getPortalUrl())
    if (portalUrl === this.state.portalUrl) {
      return
    }

    this.setState({
      ...this.state,
      portalUrl: portalUrl,
      harvestTaskStatus: defaultHarvestStatus
    });

    this.submitTask(portalUrl)

    console.log("changed to: " + Store.getPortalUrl())
  }

  submitTask(portalUrl) {
    let request = this.state.clientTemplate
    if (!portalUrl.startsWith("http")) {
      return
    }

    request.portalUrl = portalUrl
    HarvestApi.query(request).then((taskId) => {
      console.log("Task id: " + taskId)

      this.setState({ taskId: taskId })
      this.getHarvestTaskStatus(taskId)
    }).catch(function (ex) {
      console.log('Response parsing failed. Error: ', ex);
    });
  }

  getHarvestTaskStatus(id) {
    let request = getTaskStatusRequest(id)
    let component = this
    this.timer = setInterval(() => {
      ++component.tick

      HarvestApi.get(request).then((taskStatus) => {
        console.log("status:  " + taskStatus.statusCode
          + " " + taskStatus.ntotalPages
          + " " + taskStatus.nsuccessPages)
        console.log(JSON.stringify(taskStatus))

        let message = ""
        let statusCode = taskStatus.statusCode
        if (statusCode === 404) {
          message = "加载中 ..."
        } else if (statusCode === 201) {
          message = "分析中 ..."
        }

        if (component.tick > 60) {
          message = "刷新试试"
        }

        this.setState({
          ...this.state,
          message: message,
          harvestTaskStatus: taskStatus
        })

        if (statusCode === 200 || component.tick > 20) {
          clearInterval(component.timer)
        }
      }).catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
    }, 3000)
  }

  getTables() {
    let taskStatus = this.state.harvestTaskStatus
    if (taskStatus.statusCode === 200) {
      return taskStatus.result.tables.filter((table) => !table.tableData.isCombined)
    } else {
      return []
    }
  }

  render() {
    let taskStatus = this.state.harvestTaskStatus
    let statusCode = taskStatus.statusCode

    return (
      <Row>
        <Col className="p-0">
          <MainNavbar defaultUrl={this.state.portalUrl} stickyTop={true} devtoolsSwitch={true} />
          {
            (statusCode !== 200) ? this.renderLoading(taskStatus) : this.renderHarvestResult()
          }
        </Col>
      </Row>
    )
  }

  renderHarvestResult() {
    return (
      !this.state.devMode ?
      <HarvestResult
        portalUrl={this.state.portalUrl}
        args={this.state.clientTemplate.args}
        tables={this.getTables()}
      /> :
        <HarvestDevtools
          portalUrl={this.state.portalUrl}
          args={this.state.clientTemplate.args}
          tables={this.getTables()}
        />
      )
  }

  renderLoading(taskStatus) {
    return (
      <Container fluid>
        <Row noGutters className="page-header py-4">
          <PageTitle title="柏拉图 AI 浏览器" subtitle={this.state.message} className="text-sm-left mb-3" />
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
            <div className="jumbotron">
              {
                (taskStatus.ntotalPages == null || taskStatus.ntotalPages === 0)
                ?
                (<div>正在分析中 。。。</div>)
                :
                (
                  (taskStatus.nsuccessPages >= taskStatus.ntotalPages) ? (<div>正在解读网页集。。。</div>) :
                    (<div>正在访问第 {taskStatus.nsuccessPages}/{taskStatus.ntotalPages} 个网页
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

function formatPercentage(num) {
  return Number(num / 100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1})
}

export default HarvestPage;
