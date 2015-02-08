"use strict";

var request = require("bloody-request");

var Api = {
  getPageData: function(page) {
    return request.get("/json/" + page.replace(/\.html$/, ".json"))
      .then( function(data) {
        return JSON.parse(data.response);
      });
  }
};

module.exports = Api;
