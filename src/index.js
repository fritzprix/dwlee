import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import ReactDOM from 'react-dom';
import App from './App';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-155219058-1');
ReactDOM.render(<App />, document.getElementById('root'));
