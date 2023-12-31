import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter, HashRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AppProvider } from "./ContextHook/AppContext";

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <Provider store={store}>
                <AppProvider>
                    <App />
                </AppProvider>
            </Provider>
        </ScrollToTop>
    </HashRouter >,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
