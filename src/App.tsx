import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux/es/exports";
import store from "./redux/store";
import Main from "./components/main";
import "./App.css";


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
