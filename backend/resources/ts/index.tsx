import React from "react";
import ReactDOM from "react-dom";
import "./bootstrap";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { QueryClientProvider, QueryClient } from "react-query";


const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 300000,
    },
  },
});
ReactDOM.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>

, document.getElementById('app')

);

// f you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();