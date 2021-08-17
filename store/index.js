import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./rootReducer";
// import saga from "./rootSaga";

const persistConfig = {
  key: "rootKeyPersist",
  storage: storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  compose(composeWithDevTools(applyMiddleware(sagaMiddleware)))
);
const persistor = persistStore(store);

// sagaMiddleware.run(saga);

export const ReduxProvider = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
