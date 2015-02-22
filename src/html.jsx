"use strict";

var React = require("react");

var Html = React.createClass({

  render: function() {
    return (
      <html>
        <head>
          <meta charSet="utf-8"></meta>
          <title>{ this.props.title }</title>
          <meta name="author" content={ this.props.author }></meta>
          <meta name="description" content={ this.props.description }></meta>
          <meta name="keywords" content={ this.props.keywords }></meta>
          <meta name="geo.placename" content="Loriol, Drôme, France"></meta>
          <meta name="viewport" content="width=device-width"></meta>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="icon" type="image/png" href="/favicon.ico" />
          <link rel="stylesheet" href="/css/styles.20130313.css" />
        </head>
        <body>
          <div className="wrapper" id="react-app" dangerouslySetInnerHTML={{__html: this.props.markup}} />
          <script type="application/json" id="react-store-data">{this.props.data}</script>
          <script src="/js/lib.js" />
          <script src="/js/app.js" />
        </body>
      </html>
    );
  }

});

module.exports = Html;
