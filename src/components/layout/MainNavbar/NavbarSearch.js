import React from "react";
import {Form, FormInput, InputGroup, InputGroupAddon, InputGroupText} from "shards-react";

export default ({defaultUrl}) => (
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
        defaultValue={defaultUrl}
      />
    </InputGroup>
  </Form>
);
