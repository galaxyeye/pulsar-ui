import React from "react";
import {
  Form,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "shards-react";

import {Constants, Dispatcher, Store} from "../../../flux";
import PropTypes from "prop-types";
import {isUrl} from "../../../lib/utils";

class NavbarSearch extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = {
      portalUrl: this.props.defaultUrl
    }
  }

  handleKeyDown(event: Event) {
    if (event.key === 'Enter') {
      event.preventDefault()

      let targetUrl = event.target.value

      if (!isUrl(targetUrl)) {
        return
      }

      window.location = "/ai?url=" + btoa(targetUrl)
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

NavbarSearch.propTypes = {
  /**
   * The defaultUrl
   */
  defaultUrl: PropTypes.string
}

NavbarSearch.defaultProps = {
  defaultUrl: ""
};

export default NavbarSearch;
