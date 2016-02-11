import { createStore, applyMiddleware } from "redux"
import compose from "lodash/fp/compose"
import thunk from "redux-thunk"
import rootReducer from "../reducers"
import createLogger from "redux-logger"
import DevTools from "../redux-devtools"

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  )
  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const newReducer = require("../reducers").default
      store.replaceReducer(newReducer)
    })
  }
  return store
}

