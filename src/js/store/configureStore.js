import { applyMiddleware, compose, createStore } from 'redux'
import Reducers from 'reducers'
import rootSaga from 'sagas'
import Server from "server"
import {isEnvTrue} from 'utils'
import socketMiddleware from 'middleware/socket'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function configureStore(options = {}) {
  const { initialState = {}, browserHistory = {}, server } = options

  const middlewares = []

  const sagaMiddleware = createSagaMiddleware({
    logger: () => {},
  })

  middlewares.push(
    routerMiddleware(browserHistory),
    sagaMiddleware,
    socketMiddleware(Server),
  )

  if (isEnvTrue('LOGGER')) {
    middlewares.push(createLogger())
  }

  const store = createStore(
    connectRouter(browserHistory)(Reducers),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  )

  sagaMiddleware.run(rootSaga)

  return store
}
