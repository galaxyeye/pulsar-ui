import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

export default class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/1.jpg")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">访客</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={"button"} href="http://www.platon.ai/">
            <i className="material-icons">&#xE7FD;</i> 首页
          </DropdownItem>
          <DropdownItem tag={"button"} href="http://bi.platonic.fun/">
            <i className="material-icons">&#xE8B8;</i> 专业版
          </DropdownItem>
          {/*<DropdownItem tag={Link} to="file-manager-list">*/}
          {/*  <i className="material-icons">&#xE2C7;</i> Files*/}
          {/*</DropdownItem>*/}
          {/*<DropdownItem tag={Link} to="transaction-history">*/}
          {/*  <i className="material-icons">&#xE896;</i> Transactions*/}
          {/*</DropdownItem>*/}
          {/*<DropdownItem divider />*/}
          {/*<DropdownItem tag={Link} to="/" className="text-danger">*/}
          {/*  <i className="material-icons text-danger">&#xE879;</i> Logout*/}
          {/*</DropdownItem>*/}
        </Collapse>
      </NavItem>
    );
  }
}
