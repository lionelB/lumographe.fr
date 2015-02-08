"use strict";

var flux = require("docbrown");
var Actions = require("./actions");
var AppStore = flux.createStore({
  actions: [Actions.only("initProject", "loadProjectSuccess", "loadProjectError")],

  initProject: function(data) {
    this.setState({
      title: data.meta.title,
      subtitle: data.meta.subtitle,
      year: data.meta.year,
      color: data.meta.color,
      images: data.meta.images,
      tags: data.meta.tags,
      links: data.meta.links,
      html: data.html
    });
  },

  loadProjectSuccess: function(data){
    this.setState({
      title: data.meta.title,
      subtitle: data.meta.subtitle,
      year: data.meta.year,
      color: data.meta.color,
      images: data.meta.images,
      tags: data.meta.tags,
      links: data.meta.links,
      html: data.html
    });
  },

  loadProjectError: function(data){
    console.error("loadProjectError", data);
  },

  getInitialState: function() {
    return  {
      title: "",
      subtitle: "",
      year: "",
      color: "",
      images: {},
      tags: [],
      links: [],
      html: ""
    };
  }
});

module.exports = AppStore;
