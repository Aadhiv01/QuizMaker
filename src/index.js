import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';


ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>,
  document.getElementById("root"),
);
