import React from "react"
import { render } from "react-dom"
import { Router, browserHistory } from "react-router"
import { Provider } from "react-redux"

import routes from "./routes"
import configureStore from "./shared/store/configureStore.dev"

import "./styles.css"
import "./shared/font-observer"

const store = configureStore({
  meta: {
    title: "",
    desc: "",
    bio: "",
    keywords: []
  },
  projects: [],
  page: []
}) 

render((
    <Provider store={store}>
      <Router history={browserHistory}  routes={routes} />
    </Provider>
), document.getElementById("App"))

