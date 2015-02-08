"use strict";


var flux = require("docbrown");
var dispatcher = require("./dispatcher");

var appActions = flux.createActions(dispatcher, [
  "initHome",
  "loadHomeSuccess",
  "loadHomeError",

  "initProject",
  "loadProjectSuccess",
  "loadProjectError"
]);

module.exports = appActions;
