 "use strict";

var React = require("react");
var Router = require("react-router");

var routes = require("./routes.jsx");
var actions = require("./shared/actions");

require("es6-promise").polyfill();

function getInitialState() {
  var span = document.createElement("span");
  span.innerHTML = document.getElementById("react-store-data").innerHTML;
  var data = {};
  try{
    data = JSON.parse(span.textContent);
  } catch(error){
    console.error("can't JSON.parse the initial store data");
  }
  return data;
}

document.addEventListener("DOMContentLoaded", function() {
  var initialData = getInitialState();
  actions.initHome( initialData );
  Router.run(routes, Router.HistoryLocation, function (Handler, state) {

    var p;

    if (initialData) {
      if (state.path === "/") {
        actions.initHome( initialData );
      } else {
        actions.initProject( initialData );
      }

      state.title = document.title;
      initialData = null;
      p = Promise.resolve();
    } else {
      p = Promise.all(state.routes
        .filter(route => route.handler.fetchData)
        .map(route => {
          return route.handler.fetchData(state.params);
        })
      );
    }

    p.then( () => {
      React.render(<Handler {...state} />, document.getElementById("react-app"));
    });
  });
});
