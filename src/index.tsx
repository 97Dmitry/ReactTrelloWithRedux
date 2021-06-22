import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import Global from "./styles/globalStyle";

ReactDOM.render(
  <StrictMode>
    <Global />

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
