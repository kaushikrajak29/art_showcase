import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/login/Main';

function App(props) {
  return (
    <div>
      <Router>
      <Main></Main>
      </Router>
    </div>
  );
}

export default App;