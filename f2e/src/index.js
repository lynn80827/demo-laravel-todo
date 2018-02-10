/* global document */
// @flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import injectGlobalStyle from './utils/theme';

injectGlobalStyle();
ReactDOM.render(<App />, (document: any).getElementById('root'));
