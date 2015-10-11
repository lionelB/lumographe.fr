import React from "react";
import routes from "./routes";
import { Router } from "react-router";

React.render((
  <Router routes={routes} />
), document.getElementById("root"));

