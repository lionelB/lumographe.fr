"use strict";

var flux = require("docbrown");
var Actions = require("./actions");

var AppStore = flux.createStore({
  actions: [Actions.only("initHome", "loadHomeError")],

  initHome: function(data) {
    this.setState({
      title: data.meta.title,
      avatar: data.meta.avatar,
      bubbles: data.meta.bubbles,
      email: data.meta.email,
      mobile: data.meta.mobile,
      socialLinks: data.meta.socialLinks,
      projects: data.meta.projects,
      skills: data.meta.skills,
      html: data.html
    });
  },

  loadHomeError: function(data){
    console.error("loadHomeError", data);
  },

  getInitialState: function() {
    return  {
      title: "",
      avatar: "",
      bubbles: [],
      email: "",
      mobile: "",
      socialLinks: [],
      projects: [],
      skills: [],
      html: ""
    };
  }
});

module.exports = AppStore;
