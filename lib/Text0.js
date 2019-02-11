'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.TextAreaText0 = TextAreaText0;
exports.InputText0 = InputText0;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextUtils = require('./TextUtils');

var _OTContext = require('./OTContext');

var _OTContext2 = _interopRequireDefault(_OTContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text0 = function (_Component) {
    _inherits(Text0, _Component);

    function Text0() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Text0);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Text0.__proto__ || Object.getPrototypeOf(Text0)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (e) {
            var _this$props = _this.props,
                path = _this$props.path,
                value = _this$props.value;

            _this.context.submitOp((0, _TextUtils.text0ChangeOp)(path, value, e.target.value));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Text0, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                value = _props.value;

            return children({
                value: value,
                onChange: this.onChange
            });
        }
    }]);

    return Text0;
}(_react.Component);

Text0.propTypes = {
    value: _propTypes2.default.string,
    path: _propTypes2.default.array,
    children: _propTypes2.default.func
};
Text0.contextType = _OTContext2.default;
exports.default = Text0;
function TextAreaText0(_ref2) {
    var path = _ref2.path,
        value = _ref2.value,
        onOp = _ref2.onOp,
        props = _objectWithoutProperties(_ref2, ['path', 'value', 'onOp']);

    return _react2.default.createElement(
        Text0,
        { path: path, onOp: onOp, value: value },
        function (_ref3) {
            var value = _ref3.value,
                onChange = _ref3.onChange;
            return _react2.default.createElement('textarea', _extends({}, props, { value: value, onChange: onChange }));
        }
    );
}

function InputText0(_ref4) {
    var path = _ref4.path,
        value = _ref4.value,
        onOp = _ref4.onOp,
        props = _objectWithoutProperties(_ref4, ['path', 'value', 'onOp']);

    return _react2.default.createElement(
        Text0,
        { path: path, onOp: onOp, value: value },
        function (_ref5) {
            var value = _ref5.value,
                onChange = _ref5.onChange;
            return _react2.default.createElement('input', _extends({}, props, { value: value, onChange: onChange }));
        }
    );
}