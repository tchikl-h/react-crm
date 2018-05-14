import React from "react";
import {
  cyan600,
  pink600,
  purple600,
  orange600
} from "material-ui/styles/colors";
import Assessment from "material-ui/svg-icons/action/assessment";
import Face from "material-ui/svg-icons/action/face";
import ThumbUp from "material-ui/svg-icons/action/thumb-up";
import ShoppingCart from "material-ui/svg-icons/action/shopping-cart";
import InfoBox from "../components/dashboard/InfoBox";
import NewIntents from "../components/dashboard/NewIntents";
import MonthlySales from "../components/dashboard/MonthlySales";
import BrowserUsage from "../components/dashboard/BrowserUsage";
// import RecentlyProducts from '../components/dashboard/RecentlyProducts';
import LineBarChart from "../components/dashboard/LineBarChart";
import globalStyles from "../styles";
import Data from "../data";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { Link } from "react-router";
import ContentCreate from "material-ui/svg-icons/content/create";
import {
  pink500,
  grey200,
  grey500,
  green400,
  orange400,
  white
} from "material-ui/styles/colors";
import ActionFace from "material-ui/svg-icons/action/face";
import ContentAdd from "material-ui/svg-icons/content/add";
import BotListPage from "./BotListPage";
import botReducer from "../reducers";
require("babel-core/register");
require("babel-polyfill");

function requestAPI(method, url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        resolve(xhr.response);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.onerror = function () {
      reject(xhr.statusText);
    };
    xhr.send();
  })
}

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    requestAPI('GET', 'http://localhost:5354/bots')
    .then((botList) => {
      this.setState({data: botList});
    })
    .catch(function (err) {
      console.log("error requesting /bots");
    });
  }

  render() {
    const styles = {
      editButton: {
        paddingRight: 25,
        paddingBottom: 15,
        display: "block"
      },
      editButtonIcon: {
        fill: white
      },
      fab: {
        // margin: 0,
        left: 20,
        top: 60,
        left: "auto",
        position: "fixed",
        marginLeft: 180
      },
      faceButton: {
        paddingRight: 25,
        height: 10,
        marginTop: 10
      },
    };
    if (this.state.data) {
          var indents = [];
          for (var i = 0; i < this.state.data.length; i++) {
            indents.push(<span className='indent' key={i}><div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
            <Link className="button" to={"/bot/" + this.state.data[i].id + "/intents"}>
            <InfoBox
                Icon={Face}
                color={orange600}
                title={this.state.data[i].name}
                value={this.state.data[i].description}
              />
            </Link>
            </div>
          </span>);
          }
          return (
            <div>
              <h3 style={globalStyles.navigation}>Application / Dashboard</h3>
        
              <div className="row">
              <Link to="/bot">
                <FloatingActionButton
                  backgroundColor="lightblue"
                  secondary={true}
                  style={styles.fab}
                  backgroundColor={pink500}
                >
                  <ContentAdd />
                </FloatingActionButton>
              </Link>
        
              {indents}
              </div>
            </div>
          );
        }
    else {
      console.log("loading");
      return <div>Loading...</div>;
    }
  }
}

export default DashboardPage;
