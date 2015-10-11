import React from "react";
import {Router, Route, IndexRoute} from "react-router";


import App from "./App";
import HomePage from "./home/HomePage";
import ProjectPage from "./projects/ProjectPage";
import NotFoundPage from "./NotFoundPage";

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={HomePage} />
    <Route path="/project/:url" component={ProjectPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);

