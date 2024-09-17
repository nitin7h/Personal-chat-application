import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import SocketProvider from "./context/SocketProvider.jsx";
import MessageStorage from "./context/MessageStorage.jsx";

import { Provider } from "react-redux";
import store from "./redux/store/store.js";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // <SocketProvider>
  //   <MessageStorage>
  //     <App />
  //   </MessageStorage>
  // </SocketProvider>
  <SocketProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </SocketProvider>

  // </StrictMode>,
);
