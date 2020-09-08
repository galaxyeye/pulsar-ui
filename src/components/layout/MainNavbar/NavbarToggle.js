import React from "react";

import {Constants, Dispatcher, Store} from "../../../flux";

class NavbarToggle extends React.Component {
  constructor(props) {
    super(props);

    this.triggerDevtools = this.triggerDevtools.bind(this);

    this.state = {
      devMode: Store.getDevMode()
    }
  }

  triggerDevtools() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_DEVTOOLS
    });
    this.setState({...this.state, devMode: Store.getDevMode() } )
  }

  render() {
    return (
      <nav>
        {/* font: https://material.io/resources/icons/?icon=build&style=baseline*/ }
        <a href="#" onClick={this.triggerDevtools} className="nav-link nav-link-icon d-sm-inline text-center">
          <i className="material-icons" title={this.state.devMode ? "切换到普通模式" : "切换到开发者模式"}>
            {this.state.devMode ? "table_view" : "developer_board"}</i>
        </a>
      </nav>
    )
  }
}

export default NavbarToggle;
