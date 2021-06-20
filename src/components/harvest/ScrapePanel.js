import React from "react";
import {ScrapeApi} from "../../services";
import PropTypes from "prop-types";
import {Store} from "../../flux";
import {adjustInterval} from "../../lib/utils";
import ReactJson from "react-json-view";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Container
} from "shards-react";
import {defaultCardClassName} from "./cards/common";

let auth = Store.getAuth()

function getTaskStatusRequest(taskId) {
  return {
    "authToken": auth.userToken,
    "uuid": taskId
  }
}

class ScrapePanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sql: this.props.sql,
      scrapeResponse: null
    }

    this.timer = null
    this.tick = 0

    this.scrape = this.scrape.bind(this)
    this.clearScrapeStatusTimer = this.clearScrapeStatusTimer.bind(this)
  }

  componentDidMount() {
    this.props.didMount(this)
  }

  componentWillUnmount() {
    this.clearScrapeStatusTimer()
  }

  scrape() {
    let sql = this.state.sql
    if (!sql) {
      return
    }

    let auth = Store.getAuth()
    let request = {authToken: auth.userToken, sql: sql}
    ScrapeApi.query(request).then((taskId) => {
      this.clearScrapeStatusTimer()
      this.setState({...this.state, taskId: taskId, scrapeResponse: null})
      this.getStatus(taskId)
    }).catch(function (ex) {
      console.log('Response parsing failed. Error: ', ex)
    });
  }

  getStatus(taskId) {
    let panel = this
    let request = getTaskStatusRequest(taskId)
    this.timer = setInterval(() => {
      if (!adjustInterval(++this.tick, this.timer)) {
        return
      }

      ScrapeApi.status(request).then((response) => {
        let msg = JSON.stringify({isDone: response.isDone, status: response.status, pageStatus: response.pageStatus})
        console.log(msg)

        this.setState({...this.state, scrapeResponse: response})

        if (response.statusCode === 200 || response.isDone) {
          this.clearScrapeStatusTimer()
        }
      }).catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
    }, 2000)
  }

  clearScrapeStatusTimer() {
    this.tick = 0
    clearInterval(this.timer)
    this.timer = null
  }

  render() {
    return (
      <Card className={defaultCardClassName()}>
        <CardHeader className="border-bottom">
          <Button theme="white" type="button"
                  onClick={() => {
                    this.scrape()
                  }}
          >
            执行
          </Button>
        </CardHeader>

        <Collapse open={!!this.state.scrapeResponse}>
          <CardBody>
            {
              this.state.scrapeResponse ?
                <ReactJson src={this.state.scrapeResponse}
                           displayObjectSize={false}
                           displayDataTypes={false}
                /> : <div />
            }
          </CardBody>
        </Collapse>
      </Card>
    )
  }
}

ScrapePanel.propTypes = {
  /**
   * The sql.
   */
  sql: PropTypes.string,
};

export default ScrapePanel;
