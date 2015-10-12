import React from "react";
import routes from "./routes";
import { Router } from "react-router";

import "./styles.css";

React.render((
  <Router routes={routes} />
), document.getElementById("root"));

