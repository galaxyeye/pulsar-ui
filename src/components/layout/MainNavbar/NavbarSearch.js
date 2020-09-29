import React from "react";
import {
  Form,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "shards-react";
import PropTypes from "prop-types";
import {isUrl, splitUrlAndArgs} from "../../../lib/utils";
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

      let input = event.target.value.trim()
      if (!input) return

      let {url, args} = splitUrlAndArgs(input)
      if (!url) return

      const base = this.appBase ? ("/" + this.appBase) : ""
      url = args ? url + " " + args : url
      window.location = base + "/ai?url=" + encodeURIComponent(btoa(url))
    }
  }

  render() {
    let className = classnames(this.props.className, "w-100 d-md-flex d-lg-flex")
    let {defaultUrl, args} = this.props
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
            defaultValue={args ? defaultUrl + " " + args : defaultUrl}
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
  args: PropTypes.string,
  className: PropTypes.string
}

NavbarSearch.defaultProps = {
  defaultUrl: "",
  args: "",
  className: ""
};

export default NavbarSearch;
