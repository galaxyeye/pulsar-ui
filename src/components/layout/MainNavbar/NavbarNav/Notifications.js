import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }

  toggleNotifications() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">&#xE7F4;</i>
            <Badge pill theme="danger">
              2
            </Badge>
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE6E1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">性能提升</span>
              <p>
                现在使用柏拉图，将 Web 数据使用效率提升到
                <span className="text-success text-semibold">1000%</span>
                ！
              </p>
            </div>
          </DropdownItem>
          <DropdownItem>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE8D1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">成本削减</span>
              <p>
                使用柏拉图全新的 Web SQL 引擎，基于 Web 的 BI 项目成本削减
                <span className="text-danger text-semibold">50%</span>
              </p>
            </div>
          </DropdownItem>
          <DropdownItem className="notification__all text-center">
            所有消息
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
