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
            src={require("../../../../assets/images/avatars/0.jpg")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">访客</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={"button"} href="http://www.platon.ai/">
            <i className="material-icons">&#xE7FD;</i> 官网
          </DropdownItem>
          <DropdownItem tag={"button"} href="http://bi.platonic.fun/">
            <i className="material-icons">&#xE8B8;</i> 专业版
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
