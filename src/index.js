import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

let initialState = {
  loginStatus: {
    member: null,
    status: false,
  },
};
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      if (state.loginStatus.status === true) {
        return {
          ...state,
          loginStatus: {
            member: null,
            status: false,
          },
        };
      } else if (state.loginStatus.status === false) {
        return {
          ...state,
          loginStatus: {
            member: action.member,
            status: true,
          },
        };
      } else {
        return {
          ...state,
          loginStatus: {
            member: null,
            status: false,
          },
        };
      }

    default:
      return {
        ...state,
      };
  }
};

let globalStore = createStore(mainReducer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={globalStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
