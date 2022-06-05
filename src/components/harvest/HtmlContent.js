import React from "react";
import PropTypes from "prop-types";

import "bootstrap/dist/js/bootstrap.min";
import {Card, CardBody, Container} from "shards-react";

function fullPath(ele) {
  var names = [];
  while (ele.parentNode){
    if (ele.id){
      names.unshift('#' + ele.id);
      break;
    }else{
      if (ele === ele.ownerDocument.documentElement) names.unshift(ele.tagName.toLowerCase());
      else{
        for (var c = 1, e = ele; e.previousElementSibling; e = e.previousElementSibling, c++);
        names.unshift(ele.tagName.toLowerCase() + ":nth-child(" + c + ")");
      }
      ele = ele.parentNode;
    }
  }
  return names.join(" > ");
}

class HtmlContent extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.addTips = this.addTips.bind(this);
    this.removeTips = this.removeTips.bind(this);
    this.hasTips = false

    this.state = {
      tip: "点击获取 css path"
    };
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    let selector = `table tr:nth-child(${1 + this.props.rowIndex}) td`
    document.querySelector(selector).classList.add("bg-light")

    this.removeTips()
    document.querySelectorAll(".page-view__html-content *").forEach((e) => {
      e.addEventListener("click", this.handleClick)

      if (e.childElementCount === 0 && e.textContent.trim().length > 0) {
        e.classList.add("d-inline-block")
        e.classList.add("border")
        e.classList.add("border-light")
      }
    })
  }

  componentWillUnmount() {
    this.removeTips()
  }

  handleClick(event: Event) {
    event.preventDefault()

    let ele: Element = event.target

    let text = ele.textContent.trim()
    if (ele.childElementCount === 0 && text.length > 0) {
      let selector = `table tr:nth-child(${1 + this.props.rowIndex}) td, .page-view__html-content *`
      document.querySelectorAll(selector).forEach((e2) => {
        e2.classList.remove("text-info")
        if (e2.childElementCount === 0) {
          let text2 = e2.textContent.trim()
          if (text2.length > 1 && text2 === text) {
            e2.classList.add("text-info")
          }
        }
      })
    }

    if (!this.hasTips) {
      this.addTips()
    }

    ele.classList.add("text-secondary")
    let tip = ele.getAttribute("title")
    if (!tip) {
      tip = ele.getAttribute("data-original-title")
    }
    if (tip) {
      this.setState({...this.state, tip: tip})
    }
  }

  addTips() {
    if (this.hasTips) {
      return
    }
    this.hasTips = true

    document.querySelectorAll(".page-view__html-content *").forEach((e) => {
      this.addTip(e)
    })
  }

  removeTips() {
    document.querySelectorAll(".page-view__html-content *").forEach((e) => {
      e.classList.remove(["text-success", "data-toggle"])
    })
    this.hasTips = false
  }

  addTip(e: Element) {
    let tip = fullPath(e)
    let delimiter = "page-view__html-content > "
    let pos = tip.lastIndexOf(delimiter)
    if (pos >= 0) {
      pos += delimiter.length
      tip = tip.substring(pos, tip.length)
    }
    if (e.childElementCount === 0 && e.textContent.trim().length > 0) {
      e.setAttribute("title", tip)
      e.setAttribute("data-toggle", "tooltip")
    }
  }

  render() {
    let { title, html } = this.props
    return (
      <Container fluid>
        <Card>
          <CardBody>
            <h2>{ this.state.tip }</h2>
            <div className={"vh-100"}>
              <div className="page-view__html-content style-reset h-50 overflow-auto"
                   onClick={this.handleClick}
                   title={title}
                   dangerouslySetInnerHTML={{__html: html }}
              />
            </div>
          </CardBody>
        </Card>
      </Container>
    )
  }
}

HtmlContent.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The pageViews dataset.
   */
  html: PropTypes.string
};

HtmlContent.defaultProps = {
  title: "",
  html: ""
};

export default HtmlContent;
