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
  white
} from "material-ui/styles/colors";
import ContentAdd from "material-ui/svg-icons/content/add";
import BotListPage from "./BotListPage";
import botReducer from "../reducers";
require("babel-core/register");
require("babel-polyfill");

const DashboardPage = () => {
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
  };

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

  var DisplayBotList = (nbBot) => {
    var indents = [];
    for (var i = 0; i < nbBot; i++) {
      indents.push(<span className='indent' key={i}><div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
      <InfoBox
        Icon={Face}
        color={orange600}
        title={"New Members"}
        value={"ok"}
      />
    </div></span>);
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
  
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
            <NewIntents data={Data.dashBoardPage.newIntents} />
          </div>
  
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15">
            <MonthlySales data={Data.dashBoardPage.monthlySales} />
          </div>
        </div>
  
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
            {/*<RecentlyProducts data={Data.dashBoardPage.recentProducts}/>*/}
            <LineBarChart data={Data.dashBoardPage.lineBarChart} />
          </div>
  
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
            <BrowserUsage data={Data.dashBoardPage.browserUsage} />
          </div>
        </div>
      </div>
    );
  }

  requestAPI('GET', 'http://localhost:5354/bots')
    .then(function (botList) {
      console.log("return 1")
      return DisplayBotList(botList.length); // Appel asynchrone avec promise (success)
    })
    .catch(function (err) {
      return DisplayBotList(0); // Appel asynchrone avec promise (error)
      console.error('Augh, there was an error!', err.statusText);
    });
  console.log("return 2"); // retour basique
  return DisplayBotList(4);
  
};

export default DashboardPage;
