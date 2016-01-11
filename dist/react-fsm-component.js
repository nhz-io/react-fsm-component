module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.State = exports.StateMachine = undefined;

	var _StateMachine = __webpack_require__(1);

	var _StateMachine2 = _interopRequireDefault(_StateMachine);

	var _State = __webpack_require__(5);

	var _State2 = _interopRequireDefault(_State);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.StateMachine = _StateMachine2.default;
	exports.State = _State2.default;
	exports.default = { StateMachine: _StateMachine2.default, State: _State2.default };

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _javascriptStateMachine = __webpack_require__(4);

	var _javascriptStateMachine2 = _interopRequireDefault(_javascriptStateMachine);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = _react2.default.PropTypes;

	var StateMachine = function (_React$Component) {
	  _inherits(StateMachine, _React$Component);

	  _createClass(StateMachine, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return this.context;
	    }
	  }]);

	  function StateMachine(props) {
	    _classCallCheck(this, StateMachine);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StateMachine).call(this, props));

	    _this.state = {};
	    _this.container = document.createElement('div');
	    return _this;
	  }

	  _createClass(StateMachine, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.context = { events: [], callbacks: {}, container: this.container };
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var props = this.props;
	      var context = this.context;
	      var events = context.events;
	      var callbacks = context.callbacks;

	      if (props.internal) {
	        ['onEnterState', 'onLeaveState', 'onBeforeEvent', 'onAfterEvent'].forEach(function (c) {
	          if (props[c]) {
	            callbacks[c.toLowerCase()] = props[c];
	          }
	        });
	        this.jsm = _javascriptStateMachine2.default.create({ initial: props.initial, events: events, callbacks: callbacks });
	        this.props.onCreate(this.jsm);
	      } else {
	        _reactDom2.default.render(_react2.default.createElement(
	          StateMachine,
	          _extends({}, props, { internal: true, jsm: this }),
	          this.props.children
	        ), this.container);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;

	      if (props.internal) {
	        return _react2.default.createElement(
	          'script',
	          { style: { display: 'none' } },
	          props.children
	        );
	      }
	      return _react2.default.createElement('script', { 'data-name': 'state-machine', style: { display: 'none' } });
	    }
	  }]);

	  return StateMachine;
	}(_react2.default.Component);

	StateMachine.defaultProps = {
	  onCreate: function onCreate() {},
	  initial: 'init',
	  internal: false,
	  jsm: null
	};
	StateMachine.propTypes = {
	  callback: PropTypes.func,
	  initial: PropTypes.string.isRequired,
	  internal: PropTypes.bool,
	  jsm: PropTypes.object,
	  onCreate: PropTypes.func,
	  onEnterState: PropTypes.func,
	  onLeaveState: PropTypes.func,
	  onBeforeEvent: PropTypes.func,
	  onAfterEvent: PropTypes.func
	};
	StateMachine.childContextTypes = {
	  events: PropTypes.array,
	  callbacks: PropTypes.object,
	  container: PropTypes.object
	};
	exports.default = StateMachine;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("javascript-state-machine");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PropTypes = _react2.default.PropTypes;

	var State = function (_React$Component) {
	  _inherits(State, _React$Component);

	  function State() {
	    _classCallCheck(this, State);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(State).apply(this, arguments));
	  }

	  _createClass(State, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      var _context = this.context;
	      var initial = _context.initial;
	      var events = _context.events;
	      var callbacks = _context.callbacks;

	      return { initial: initial, events: events, callbacks: callbacks, from: this.props.name };
	    }
	  }, {
	    key: 'addCallbacks',
	    value: function addCallbacks(name, event, _ref) {
	      var onBefore = _ref.onBefore;
	      var onEnter = _ref.onEnter;
	      var onLeave = _ref.onLeave;
	      var onAfter = _ref.onAfter;
	      var onEvent = _ref.onEvent;
	      var onState = _ref.onState;
	      var callbacks = this.context.callbacks;

	      if (name) {
	        if (onEnter) {
	          callbacks['onenter' + name] = onEnter;
	        }
	        if (onLeave) {
	          callbacks['onleave' + name] = onLeave;
	        }
	        if (onEvent) {
	          callbacks['onevent' + name] = onEvent;
	        }
	        if (onState) {
	          callbacks['onstate' + name] = onState;
	        }
	      }
	      if (event) {
	        if (onBefore) {
	          callbacks['onbefore' + event] = onBefore;
	        }
	        if (onAfter) {
	          callbacks['onafter' + event] = onAfter;
	        }
	      }
	      return this;
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;

	      var props = this.props;

	      var context = this.context;
	      var events = context.events;
	      var event = props.event;
	      var fromState = context.from;
	      var toState = props.name;

	      /* Bind state callbacks */
	      (typeof toState === 'string' ? [toState] : toState).forEach(function (s) {
	        _this2.addCallbacks(s, null, props);
	      });

	      if (typeof toState === 'string') {
	        if (typeof fromState === 'string') {
	          if (typeof event === 'string') {
	            /* to is string, from is string, event is string */
	            events.push({ name: event, from: fromState, to: toState });
	            this.addCallbacks(null, event, props);
	          } else if (event instanceof Array) {
	            /* to is string, from is string, event is array */
	            event.forEach(function (e) {
	              events.push({ name: e, from: fromState, to: toState });
	              _this2.addCallbacks(null, e, props);
	            });
	          }
	        } else if (fromState instanceof Array) {
	          if (typeof event === 'string') {
	            /* to is string, from is array, event is string */
	            events.push({ name: event, from: fromState, to: toState });
	            this.addCallbacks(null, event, props);
	          } else if (event instanceof Array) {
	            /* to is string, from is array, event is array */
	            event.forEach(function (e) {
	              events.push({ name: e, from: fromState, to: toState });
	              _this2.addCallbacks(null, e, props);
	            });
	          }
	        }
	      } else if (toState instanceof Array) {
	        if (typeof fromState === 'string') {
	          if (typeof event === 'string') {
	            /* to is array, from is string, event is string */
	            /* Illegal Combination */
	          } else if (event instanceof Array) {
	              /* to is array, from is string, event is array */
	              var i = 0;
	              while (true) {
	                var e = event[i],
	                    t = toState[i];
	                if (!e || !t) {
	                  break;
	                }
	                i++;
	                events.push({ name: e, from: fromState, to: t });
	                this.addCallbacks(null, e, props);
	              }
	            }
	        } else if (fromState instanceof Array) {
	          if (typeof event === 'string') {
	            /* to is array, from is array, event is string */
	            var i = 0;
	            while (true) {
	              var f = fromState[i],
	                  t = toState[i];
	              if (!f || !t) {
	                break;
	              };
	              i++;
	              events.push({ name: event, from: f, to: t });
	            }
	            this.addCallbacks(null, event, props);
	          } else if (event instanceof Array) {
	            /* to is array, from is array, event is array */
	            var i = 0;
	            while (true) {
	              var e = event[i],
	                  t = toState[i];
	              if (!e || !t) {
	                break;
	              }
	              i++;
	              events.push({ name: e, from: fromState, to: t });
	              this.addCallbacks(null, e, props);
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;

	      return _react2.default.createElement(
	        'state',
	        { 'data-name': props.name, 'data-event': props.event },
	        props.children
	      );
	    }
	  }]);

	  return State;
	}(_react2.default.Component);

	State.propTypes = {
	  name: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)]),
	  event: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)]),
	  onBefore: PropTypes.func,
	  onEnter: PropTypes.func,
	  onLeave: PropTypes.func,
	  onAfter: PropTypes.func,
	  onEvent: PropTypes.func,
	  onState: PropTypes.func
	};
	State.contextTypes = {
	  initial: PropTypes.string,
	  events: PropTypes.array,
	  callbacks: PropTypes.object,
	  from: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)])
	};
	State.childContextTypes = {
	  initial: PropTypes.string,
	  events: PropTypes.array,
	  callbacks: PropTypes.object,
	  from: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)])
	};
	exports.default = State;

/***/ }
/******/ ]);