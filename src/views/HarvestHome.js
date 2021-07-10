import React from "react";
import {Store} from "../flux";
import {Col, Container, Navbar, NavLink, Row} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import HarvestMain from "../components/harvest/HarvestMain";
import {getHarvestUrl, isUrl, splitUrlAndArgs} from "../lib/utils";
import getHotLinks from "../data/hot-links";
import NavbarSearch from "../components/layout/MainNavbar/NavbarSearch";
import {HotLinkApi} from "../services";

class HarvestHome extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: "你好啊，",
      hotLinks: getHotLinks(),
      devMode: Store.getDevMode()
    };

    this.appBase = process.env.REACT_APP_BASENAME || ""
    this.onDevModeChange = this.onDevModeChange.bind(this);
    this.getHotLinks = this.getHotLinks.bind(this);
  }

  componentDidMount() {
    Store.addDevtoolsToggleListener(this.onDevModeChange);
    // TODO: load hot links on the fly
    // this.getHotLinks()
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

  getHotLinks() {
    HotLinkApi.get().then((hotLinks) => {
      if (hotLinks && hotLinks.length > 0) {
        this.setState({...this.state, hotLinks: hotLinks})
      }
    }).catch(function (ex) {
      console.log('Response parsing failed. Error: ', ex);
    });
  }

  render() {
    let params = new URLSearchParams(this.props.location.search);
    let configuredUrl = (params.get("url") || "").trim()
    let mode = (params.get("mode") || "").trim()
    this.state.mode = mode
    configuredUrl = decodeURIComponent(atob(configuredUrl));
    let {url, args} = splitUrlAndArgs(configuredUrl)

    let portalUrl = url
    return (
      <Row>
        <Col className="p-0">
          {
            (!portalUrl)
              ?
              this.renderWelcome(this.state.message)
              :
              (
                <HarvestMain portalUrl={portalUrl} args={args} mode={mode} />
              )
          }
        </Col>
      </Row>
    )
  }

  renderWelcome(message) {
    const hotLinks = this.state.hotLinks
    return (
      <Container fluid>
        <Row noGutters className="page-header py-4">
          <PageTitle title="柏拉图 AI 浏览器" subtitle={message} className="text-sm-left mb-3"/>
        </Row>

        <Row className="page-loading align-items-center h-100">
          <Col className="mx-auto col-md-8 col-sm-auto">
            <NavbarSearch className={"main__search"} />
            <div className="jumbotron mt-0">
              <Navbar type="light" className="mx-auto mt-3 align-items-stretch flex-md-nowrap p-0">
                {hotLinks.map((link, i) => (
                  <NavLink key={i} href={getHarvestUrl(this.state.mode, link.href)}>{link.text}</NavLink>
                ))}
              </Navbar>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default HarvestHome;
