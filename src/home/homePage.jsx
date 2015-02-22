"use strict";

var React = require("react");
var Router = require("react-router");
var flux = require("docbrown");

// Flux
var actions = require("../shared/actions");
var store = require("../shared/stores").home;
var api = require("../shared/api");

// Components
var Header = require("./header");
var Intro = require("./intro");
var ProjectPreview = require("./projectPreview");
var SkillSet = require("./skillSet");
var Social = require("./social");
var DocumentTitle = require("react-document-title");

var HomePage = React.createClass({
  displayName: "Home",
  statics: {
    fetchData: () => {
      return api.getPageData("index.html")
        .then( actions.initHome)
        .catch( actions.loadHomeError);
    }
  },
  mixins: [ Router.State, flux.storeMixin(store)],

  render() {
    var projects = this.state.projects.map((project, index) => {
       return <ProjectPreview key={index} project={project} />;
    });

    var skills = this.state.skills.map((skillset, index) => {
      return <SkillSet key={index} name={skillset.label} skills={skillset.values} />;
    });
    var markup = this.state.html.split("<hr>");
    return (
      <DocumentTitle title="Lumographe">
      <div>
        <Header />
        <Intro quotes={this.state.bubbles} markup={markup[0]} />
        <section className="block__container" id="projets">
          <div className="block block--main">
            <h1 className="h1-section"> Travail </h1>
            <ul className="project"> {projects} </ul>
          </div>
          <div className="block block--aside">
            <h1 className="h1-section">Compétences</h1>
            <ul className="skills"> {skills} </ul>
          </div>
        </section>

        <section className="block__container" id="apropos">

          <div className="block block--main">
            <h1 className="h1-section"> À propos </h1>
            <div dangerouslySetInnerHTML={{__html: markup[1]}}></div>
          </div>

          <div className="block block--aside">
            <Social links={this.state.socialLinks} />
            <h1 className="h1-section">Coordonnées</h1>
            <address>
              Lionel Breduillieard<br/>
              <span className="locality">Loriol sur Drôme</span> - <span className="country">France</span>
            </address>
            <ul className="flat icons">
              <li><i className="icon-phone"></i>{this.state.mobile}</li>
              <li><i className="icon-envelop"></i> <a href={this.state.email}>{this.state.email}</a></li>
            </ul>
          </div>
        </section>
      </div>
      </DocumentTitle>
    );
  }
});

module.exports = HomePage;
