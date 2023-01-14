import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import redux from "./store/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { BrowserRouter, Routes, Route } from "react-router-dom";

let persistor = persistStore(redux);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={redux}>
      <PersistGate persistor={persistor}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
