import React from "react";
import Assessment from "material-ui/svg-icons/action/assessment";
import GridOn from "material-ui/svg-icons/image/grid-on";
import PermIdentity from "material-ui/svg-icons/action/perm-identity";
import Web from "material-ui/svg-icons/av/web";
import SettingsPower from "material-ui/svg-icons/action/settings-power";
import VpnKey from "material-ui/svg-icons/communication/vpn-key";
import { cyan600, pink600, purple600 } from "material-ui/styles/colors";
import ExpandLess from "material-ui/svg-icons/navigation/expand-less";
import ExpandMore from "material-ui/svg-icons/navigation/expand-more";
import ChevronRight from "material-ui/svg-icons/navigation/chevron-right";

const data = {
  menus: [
    { text: "DashBoard", icon: <Assessment />, link: "/dashboard" },
    { text: "Order", icon: <GridOn />, link: "/orders" },
    { text: "Bot", icon: <PermIdentity />, link: "/bots" },
    { text: "Product", icon: <GridOn />, link: "/products" },
    { text: "About", icon: <Web />, link: "/about" }
  ],
  signOutMenus: [
    { text: "Sign out", icon: <SettingsPower />, link: "/login" },
    { text: "Change password", icon: <VpnKey />, link: "" }
  ],
  tablePage: {
    items: [
    ]
  },
  dashBoardPage: {
    recentProducts: [
    ],
    monthlySales: [
    ],
    newOrders: [
    ],
    browserUsage: [
    ],
    lineBarChart: [
    ]
  }
};

export default data;
