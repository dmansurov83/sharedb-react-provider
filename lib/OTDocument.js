'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _OTContext = require('./OTContext');

var _OTContext2 = _interopRequireDefault(_OTContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OTDocument = function (_Component) {
    _inherits(OTDocument, _Component);

    function OTDocument() {
        var _ref;

        var _temp, _this, _ret;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _classCallCheck(this, OTDocument);

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OTDocument.__proto__ || Object.getPrototypeOf(OTDocument)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            data: null,
            isReady: false,
            connectionState: 'disconnected'
        }, _this.otContext = {
            submitOp: function submitOp(op) {
                _this.doc.submitOp(op);
            }
        }, _this.onOp = function () {
            _this.setState({
                data: _this.doc.data
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(OTDocument, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.connect();
        }

        // eslint-disable-next-line no-unused-vars

    }, {
        key: 'connect',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this2 = this;

                var _props, connect, collection, id, defaultData, type, connection, doc;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _props = this.props, connect = _props.connect, collection = _props.collection, id = _props.id, defaultData = _props.defaultData, type = _props.type;
                                _context.next = 3;
                                return connect();

                            case 3:
                                connection = _context.sent;

                                connection.on('state', function (state) {
                                    _this2.setState({ connectionState: state });
                                });
                                doc = connection.get(collection, id);

                                doc.subscribe(function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    if (!doc.data) {
                                        doc.create(defaultData, type);
                                    }
                                    _this2.setState({ isReady: true, data: doc.data });
                                });
                                doc.on('op', this.onOp);
                                this.doc = doc;

                            case 9:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function connect() {
                return _ref2.apply(this, arguments);
            }

            return connect;
        }()
    }, {
        key: 'render',
        value: function render() {
            var children = this.props.children;
            var _state = this.state,
                isReady = _state.isReady,
                data = _state.data,
                connectionState = _state.connectionState;
            var submitOp = this.otContext.submitOp;

            return _react2.default.createElement(
                _OTContext2.default.Provider,
                { value: this.otContext },
                children({
                    isReady: isReady, data: data, connectionState: connectionState, submitOp: submitOp
                })
            );
        }
    }]);

    return OTDocument;
}(_react.Component);

OTDocument.propTypes = {
    connect: _propTypes2.default.func,
    collection: _propTypes2.default.string,
    id: _propTypes2.default.string,
    defaultData: _propTypes2.default.any,
    type: _propTypes2.default.string,
    children: _propTypes2.default.func
};
OTDocument.defaultProps = {
    type: 'json0'
};
exports.default = OTDocument;