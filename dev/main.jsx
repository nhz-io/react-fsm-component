import './style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import TestWrapper from './TestWrapper.jsx';
window.React = React;
window.ReactDOM = ReactDOM;
main();

function main() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<div><TestWrapper /></div>, div);
}
