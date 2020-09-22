import React from "react";
import {
  Form,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "shards-react";
import {Constants, Dispatcher, Store} from "../../../flux";

class NavbarSearch extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      portalUrl: Store.getPortalUrl()
    }
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      console.log(event.target.value)
      Dispatcher.dispatch({
        actionType: Constants.CHANGE_PORTAL_URL,
        payload: event.target.value
      });
    }
  }

  render() {
    return (
      <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
        <InputGroup seamless className="ml-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>
              <i className="material-icons">search</i>
            </InputGroupText>
          </InputGroupAddon>
          <FormInput
            className="navbar-search"
            placeholder="输入一个链接 ..."
            defaultValue={this.state.portalUrl}
            onKeyDown={(e) => this.handleKeyDown(e)}
          />
        </InputGroup>
      </Form>
    )
  }
}

export default NavbarSearch;
