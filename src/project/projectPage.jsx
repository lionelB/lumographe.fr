"use strict";

var React = require("react");
var Router = require("react-router");
var ProjectHeader = require("./projectHeader");
var ProjectFooter = require("./projectFooter");
var DocumentTitle = require("react-document-title");

var flux = require("docbrown");
var store = require("../shared/stores").projects;
var actions = require("../shared/actions");
var api = require("../shared/api");

var { Link } = Router;

var ProjectPage = React.createClass({
  displayName: "Project",
  statics: {
    fetchData: function(params){
      return api.getPageData(params.url)
        .then( actions.loadProjectSuccess)
        .catch( actions.loadProjectError);
    }
  },
  mixins: [ Router.State, flux.storeMixin(store) ],

  render() {
    var tags = this.state.tags.map((tag, i) => <li key={"tag-"+i} dangerouslySetInnerHTML={{__html: tag}} /> )
    var links = this.state.links.map((link, i) => <li key={"links-"+i} dangerouslySetInnerHTML={{__html: link}} /> )
    return (
      <DocumentTitle title={this.state.title}>
        <div className="Projet">
          <ProjectHeader title={this.state.title} />
          <article className="grid clearfix">
            <div className="item item--small p-title">
              <div className="valign">
                <h2>R&eacute;gie de production de podcast</h2>
              </div>
            </div>

            <div className="item item--small p-small-img1">
              <img src={"/medias/" + this.state.images.small1} width="300" heigth="300" alt=""/>
            </div>

            <div className="item item--large p-main-img">
              <img src={"/medias/" + this.state.images.big} width="580" heigth="580" alt=""/>
            </div>
            <div className="item item--large up p-details"  >
              <div className="valign"><div>
                <div dangerouslySetInnerHTML={{__html: this.state.html}}></div>
              </div></div>
            </div>
            <div className="item item--small p-keywords" style={{background: this.state.color}}>
              <div className="valign">
                <ul className="flat"> {tags} </ul>
              </div>
            </div>

            <div className="item item--small p-small-img2">
              <img src={"/medias/" + this.state.images.small2} width="300" heigth="300" alt="" />
            </div>
            <div className="item item--wide p-url-info">
              <p> En savoir plus : </p>
              <ul className="flat">

                <li>Le projet: <a href="http://podcast.univ-lyon2.fr/" title="Le podcast &agrave; lyon 2">http://podcast.univ-lyon2.fr/</a></li>

                <li>Screencast: <a href="http://www.youtube.com/watch?v=KuoJxXPNQWY">Pr&eacute;sentation de l&rsquo;application Podcast Manager</a></li>

              </ul>
            </div>
          </article>
          <ProjectFooter />
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = ProjectPage;
