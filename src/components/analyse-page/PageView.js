import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Row
} from "shards-react";
import HtmlContent from "./HtmlContent";

const PageView = ({ title, pageView }) => (
  <Card small className="blog-comments">
    <CardBody className="p-0">
      <HtmlContent/>
      <HtmlContent/>
      <HtmlContent/>
      <HtmlContent/>
      <HtmlContent/>
      <HtmlContent/>
    </CardBody>

    <CardFooter className="border-top">
      <Row>
        <Col className="text-center view-report">
          <Button theme="white" type="submit">
            View All Comments
          </Button>
        </Col>
      </Row>
    </CardFooter>
  </Card>
);

PageView.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The pageViews dataset.
   */
  pageView: PropTypes.object
};

PageView.defaultProps = {
  title: "PageView",
  pageView: {
    id: 1,
    date: "3 days ago",
    author: {
      image: require("../../assets/images/avatars/1.jpg"),
      name: "John Doe",
      url: "#"
    },
    post: {
      title: "Hello World!",
      url: "#"
    },
    body: "Well, the way they make shows is, they make one show ..."
  }
};

export default PageView;
