import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/login/Main';
import { reducers } from './reducers/index.js';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';


const store = createStore(reducers, compose(applyMiddleware(thunk)));


function App(props) {
  return (
    <div>
      <Provider store={store}>
      <Router>
      <Main></Main>
      </Router>
      </Provider>
    </div>
  );
}

export default App;