import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          App
        </div>
      </Provider>
    );
  }
}

export default App;
