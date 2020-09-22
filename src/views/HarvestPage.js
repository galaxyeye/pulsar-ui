import React from "react";
import {Store} from "../flux";
import {Col, Container, Row} from "shards-react";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import PageTitle from "../components/common/PageTitle";
import HarvestMain from "../components/harvest/HarvestMain";

class HarvestPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      portalUrl: Store.getPortalUrl(),
      message: "加载中 ...",
      devMode: Store.getDevMode()
    };

    this.onDevModeChange = this.onDevModeChange.bind(this);
  }

  componentDidMount() {
    Store.addDevtoolsToggleListener(this.onDevModeChange);
  }

  componentWillUnmount() {
    Store.removeDevtoolsToggleListener(this.onDevModeChange);
  }

  onDevModeChange() {
    this.setState({
      ...this.state,
      devMode: Store.getDevMode()
    });
  }

  render() {
    let portalUrl = this.state.portalUrl
    return (
      <Row>
        <Col className="p-0">
          <MainNavbar defaultUrl={portalUrl} stickyTop={true} devtoolsSwitch={true}/>
          {
            (portalUrl === "")
              ?
              this.renderTip(this.state.message)
              :
              (
                <HarvestMain portalUrl={portalUrl} />
              )
          }
        </Col>
      </Row>
    )
  }

  renderTip(message) {
    return (
      <Container fluid>
        <Row noGutters className="page-header py-4">
          <PageTitle title="柏拉图 AI 浏览器" subtitle={message} className="text-sm-left mb-3"/>
        </Row>

        <Row className="page-loading align-items-center h-100">
          <div className="mx-auto">
            <div className="jumbotron text-center">
              请输入一个入口链接，我们将从该链接出发将整个站点还原为数据。
            </div>
          </div>
        </Row>
      </Container>
    )
  }
}

export default HarvestPage;
