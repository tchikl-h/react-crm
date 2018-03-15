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
import NewOrders from "../components/dashboard/NewOrders";
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
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox
            Icon={ShoppingCart}
            color={pink600}
            title="Total Profit"
            value="1500k"
          />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox Icon={ThumbUp} color={cyan600} title="Likes" value="4231" />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox
            Icon={Assessment}
            color={purple600}
            title="Sales"
            value="460"
          />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox
            Icon={Face}
            color={orange600}
            title="New Members"
            value="248"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
          <NewOrders data={Data.dashBoardPage.newOrders} />
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
};

export default DashboardPage;
