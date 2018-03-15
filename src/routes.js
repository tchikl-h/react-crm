import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./containers/App";
import NotFoundPage from "./containers/NotFoundPage.js";
import FormPage from "./containers/FormPage";
import Dashboard from "./containers/DashboardPage";
import AboutPage from "./containers/AboutPage";
import BotListPage from "./containers/BotListPage";
import BotFormPage from "./containers/BotFormPage";

import OrderListPage from "./containers/OrderListPage";
import OrderFormPage from "./containers/OrderFormPage";
import ProductFormPage from "./containers/ProductFormPage";
import ProductListPage from "./containers/ProductListPage";

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="form" component={FormPage} />
      <Route path="bot" component={BotFormPage} />
      <Route path="bot/:id" component={BotFormPage} />
      <Route path="order" component={OrderFormPage} />
      <Route path="order/:id" component={OrderFormPage} />
      <Route path="product" component={ProductFormPage} />
      <Route path="product/:id" component={ProductFormPage} />
      <Route path="bots" component={BotListPage} />
      <Route path="orders" component={OrderListPage} />
      <Route path="products" component={ProductListPage} />
      <Route path="about" component={AboutPage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Route>
);
