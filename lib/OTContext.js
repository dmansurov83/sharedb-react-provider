'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OTContext = _react2.default.createContext({
    submitOp: function submitOp() {
        throw new Error('submitOp not implemented');
    }
});

exports.default = OTContext;