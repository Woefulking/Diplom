import App from './App';
import User from "./store/User";
import React, {createContext} from 'react';
import { createRoot } from 'react-dom/client';

export const Context = createContext(null)

const root = createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={{
      user: new User(),
  }}>
      <App />
  </Context.Provider>,
);