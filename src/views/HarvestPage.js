import React from "react";
import {Store} from "../flux";
import {Col, Container, Row} from "shards-react";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import HarvestResult from "../components/harvest/HarvestResult";
import HarvestDevtools from "../components/harvest/HarvestDevtools";
import {HarvestApi} from "../services";
import PageTitle from "../components/common/PageTitle";
import UsersOverview from "../components/blog/UsersOverview";
import UsersByDevice from "../components/blog/UsersByDevice";

let auth = Store.getAuth()
let harvestTask = {
  username: auth.username,
  authToken: auth.authToken,
  portalUrl: "https://www.amazon.com/Best-Sellers-Automotive/zgbs/automotive/ref=zg_bs_nav_0",
  args: "-i 1d -ii 365d -ol a[href~=/dp/] -diagnose -vj",
  apiEntry: Store.getApiHost() + "/api",
  proxyLinks: true
}

let defaultTaskId = "5f0c0ed0-78b5-4255-992e-03649c6c20b3"

let defaultHarvestStatus = {
  statusCode: 201,
  status: "CREATED",
  result: {
    tables: []
  }
}

function getTaskStatusRequest(id) {
  return {"username": harvestTask.username, "authToken": harvestTask.authToken, "id": id}
}

class HarvestPage extends React.Component {
  constructor(props) {
    super(props)

    // Set some state
    this.state = {
      messageShown: false,
      devMode: Store.getDevMode(),
      harvestTask: harvestTask,
      harvestStatus: defaultHarvestStatus,
    };

    this.timer = null;

    this.onChange = this.onChange.bind(this);
    this.getHarvestTaskStatus = this.getHarvestTaskStatus.bind(this);
    this.getTables = this.getTables.bind(this);
  }

  componentWillMount() {
    let task = this.state.harvestTask

    HarvestApi.query(task).then((taskId) => {
      console.log("Task id: " + taskId)

      this.setState({ taskId: taskId })
      this.getHarvestTaskStatus(taskId)
    }).catch(function (ex) {
      console.log('Response parsing failed. Error: ', ex);
    });

    Store.addDevtoolsToggleListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeDevtoolsToggleListener(this.onChange);
    clearInterval(this.timer)
  }

  onChange() {
    this.setState({
      ...this.state,
      devMode: Store.getDevMode()
    });
  }

  getHarvestTaskStatus(id) {
    let request = getTaskStatusRequest(id)
    let parent = this
    this.timer = setInterval(() => {
      HarvestApi.get(request).then((harvestStatus) => {
        console.log(harvestStatus.statusCode)

        this.setState({ harvestStatus: harvestStatus })
        if (harvestStatus.statusCode === 200) {
          console.log(harvestStatus.result.tables.length)
          clearInterval(parent.timer)
        }
      }).catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
    }, 3000)
  }

  getTables() {
    return this.state.harvestStatus.result.tables.columnsData.filter(column => column.cname.length > 0)
  }

  render() {
    let statusCode = this.state.harvestStatus.statusCode

    return (
      <Container fluid className={"vw-100"}>
        <Row>
          <Col className="p-0">
            <MainNavbar defaultUrl={this.state.harvestTask.portalUrl} stickyTop={true} devtoolsSwitch={true} />

            {
              (statusCode !== 200) ? this.renderLoading() :
                (this.state.devMode ? this.renderHarvestDevtools() : this.renderHarvestResult())
            }
          </Col>
        </Row>
      </Container>
    )
  }

  renderHarvestResult() {
    return (
      <HarvestResult
        portalUrl={this.state.harvestTask.portalUrl}
        args={this.state.harvestTask.args}
        tables={this.getTables()}
      />)
  }

  renderHarvestDevtools() {
    return (
      <HarvestDevtools
        portalUrl={this.state.harvestTask.portalUrl}
        args={this.state.harvestTask.args}
        tables={this.getTables()}
      />)
  }

  renderLoading() {
    return (
      <Container fluid>
        <Row noGutters className="page-header py-4">
          <PageTitle title="AI Aided Browser" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>

        <Row>
          {/* Users Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <UsersOverview />
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default HarvestPage;
