import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStore,applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import thunk from "redux-thunk";

import reducer from './redux/reducers/';
import NavigationApp from "./navigator/NavigationApp";


const store = createStore(reducer,applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <NavigationApp />
      </NavigationContainer>
    </Provider>
  );
};


export default App;
