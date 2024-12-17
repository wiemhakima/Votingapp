'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

var DocumentContext = require('./document-context');

var Main = function Main() {
  return /*#__PURE__*/React.createElement(DocumentContext.Consumer, null, function (children) {
    return children;
  });
};

module.exports = Main;
