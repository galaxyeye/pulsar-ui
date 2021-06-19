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

class ScrapeMain extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sqlCard: this.props.sqlCard
    };

    this.timer = null;
    this.tick = 0;

    this.scrape = this.scrape.bind(this);
    this.getSQL = this.getSQL.bind(this);
  }

  componentDidMount() {
    this.scrape(this.getSQL())
  }

  componentWillUnmount() {
    this.clearRequestInterval()
  }

  getSQL() {
    return this.state.sqlCard.state.sql
  }

  scrape(sql: string) {
    if (!sql) {
      return
    }

    let auth = Store.getAuth()
    let request = {authToken: auth.userToken, sql: sql}
    ScrapeApi.query(request).then((taskId) => {
      this.setState({...this.state, taskId: taskId})
      this.getStatus(taskId)
    }).catch(function (ex) {
      console.log('Response parsing failed. Error: ', ex)
    });
  }

  getStatus(taskId) {
    let request = getTaskStatusRequest(taskId)
    this.timer = setInterval(() => {
      if (!adjustInterval(++this.tick, this.timer)) {
        return
      }

      ScrapeApi.status(request).then((response) => {
        let msg = JSON.stringify({isDone: response.isDone, status: response.status, pageStatus: response.pageStatus})
        console.log(msg)

        this.setState({
          ...this.state,
          scrapeResponse: response
        })

        if (response.statusCode === 200 || response.isDone) {
          this.clearRequestInterval()
        }
      }).catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
    }, 1500)
  }

  clearRequestInterval() {
    this.tick = 0
    clearInterval(this.timer)
  }

  render() {
    return (
      <Card className={defaultCardClassName()}>
        <CardHeader className="border-bottom">
          <Button theme="white" type="button"
                  onClick={() => {
                    let sql = this.getSQL()
                    if (sql) {
                      this.scrape(this.getSQL())
                    }
                  }}
          >
            执行
          </Button>
        </CardHeader>

        <Collapse open={!!this.getSQL()}>
          <CardBody>
            {
              this.getSQL() ?
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

ScrapeMain.propTypes = {
  /**
   * The sql.
   */
  sql: PropTypes.string,
};

export default ScrapeMain;
