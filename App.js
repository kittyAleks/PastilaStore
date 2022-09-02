import React from "react";
import {Provider, useSelector} from "react-redux";
// import {I18nextProvider, useTranslation} from "react-i18next";
// import i18n from "i18next";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "./src/store/configureStore";
import {Main} from "./Main";

export default function App() {
  return (
    // <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main/>
      </PersistGate>
    </Provider>
    // </I18nextProvider>
  );
}

