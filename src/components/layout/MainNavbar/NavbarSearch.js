import React from "react";
import {
  Form,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "shards-react";
import PropTypes from "prop-types";
import {isUrl} from "../../../lib/utils";
import * as classnames from "classnames";

class NavbarSearch extends React.Component {
  constructor(props) {
    super(props);

    this.appBase = process.env.REACT_APP_BASENAME || ""
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault()

      let targetUrl = event.target.value.trim()

      if (!isUrl(targetUrl)) {
        return
      }

      const base = this.appBase ? ("/" + this.appBase) : ""
      window.location = base + "/ai?url=" + encodeURIComponent(btoa(targetUrl))
    }
  }

  render() {
    let className = classnames(this.props.className, "w-100 d-md-flex d-lg-flex")
    return (
      <Form className={className}>
        <InputGroup seamless>
          <InputGroupAddon type="prepend">
            <InputGroupText>
              <i className="material-icons">search</i>
            </InputGroupText>
          </InputGroupAddon>
          <FormInput
            className="navbar-search"
            placeholder="输入一个列表页链接 ..."
            defaultValue={this.props.defaultUrl}
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
  defaultUrl: PropTypes.string,
  className: PropTypes.string
}

NavbarSearch.defaultProps = {
  defaultUrl: "",
  className: ""
};

export default NavbarSearch;
