const React = require('react');
const ReactDOM = require('react-dom');
const injectTapEventPlugin = require('react-tap-event-plugin');

const Router = require('./router');

(() => {
  injectTapEventPlugin();

  ReactDOM.render(
    <Router />,
    document.getElementById('root')
  );
})();
