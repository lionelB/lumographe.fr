"use strict";


var flux = require("docbrown");
var dispatcher = require("./dispatcher");

var appActions = flux.createActions(dispatcher, [
  "initHome",
  "loadHomeError",

  "initProject",
  "loadProjectError"
]);

module.exports = appActions;
