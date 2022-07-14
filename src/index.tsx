import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthStore from './store/auth-store';


const rootStore = { authStore: new AuthStore(), }

export type TypeRootStore = typeof rootStore

export const Context = createContext({} as TypeRootStore)

ReactDOM.render(
  <Context.Provider value={rootStore}>
    <App />
  </Context.Provider>
  ,
  document.getElementById('root')
);
