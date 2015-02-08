var HomeStore = require("./HomeStore");
var ProjectStore = require("./ProjectStore");

module.exports = {
  home: new HomeStore(),
  projects: new ProjectStore()
};