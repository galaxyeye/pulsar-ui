import React from "react";
import {Store} from "../flux";
import {Col, Container, Row} from "shards-react";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import HarvestResult from "../components/harvest/HarvestResult";
import HarvestDevtools from "../components/harvest/HarvestDevtools";

let status = Store.getHarvestStatus()

class HarvestPage extends React.Component {
  constructor(props) {
    super(props)

    // Set some state
    this.state = {
      messageShown: false,
      devMode: Store.getDevMode()
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addDevtoolsToggleListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeDevtoolsToggleListener(this.onChange);
  }

  onChange() {
    console.log("onChange")
    this.setState({
      ...this.state,
      devMode: Store.getDevMode()
    });
  }

  render() {
    return (
      <Container fluid className={"vw-100"}>
        <Row>
          <Col className="p-0">
            <MainNavbar defaultUrl={status.result.portalUrl} stickyTop={true} devtoolsSwitch={true} />

            {this.state.devMode ? this.renderHarvestDevtools() : this.renderHarvestResult() }
          </Col>
        </Row>
      </Container>
    )
  }

  renderHarvestResult() {
    return (
      <HarvestResult
        portalUrl={status.result.portalUrl}
        args={status.result.args}
        tables={status.result.tables}
      />)
  }

  renderHarvestDevtools() {
    return (
      <HarvestDevtools
        portalUrl={status.result.portalUrl}
        args={status.result.args}
        tables={status.result.tables}
      />)
  }
}

export default HarvestPage;
