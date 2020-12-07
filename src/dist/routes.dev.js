"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./pages/index1/index1"));

var _index2 = _interopRequireDefault(require("./pages/index2/index2"));

var _index3 = _interopRequireDefault(require("./pages/index3/index3"));

var _index4 = _interopRequireDefault(require("./pages/index4/index4"));

var _index5 = _interopRequireDefault(require("./pages/index5/index5"));

var _index6 = _interopRequireDefault(require("./pages/index6/index6"));

var _index7 = _interopRequireDefault(require("./pages2/index1/index1"));

var _index8 = _interopRequireDefault(require("./pages2/index2/index2"));

var _index9 = _interopRequireDefault(require("./pages2/index3/index3"));

var _index10 = _interopRequireDefault(require("./pages2/index4/index4"));

var _index11 = _interopRequireDefault(require("./pages2/index5/index5"));

var _index12 = _interopRequireDefault(require("./pages2/index6/index6"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = [{
  path: "/Indexsecond6",
  component: _index12["default"]
}, {
  path: "/indexsecond5",
  component: _index11["default"]
}, {
  path: "/indexsecond4",
  component: _index10["default"]
}, {
  path: "/indexsecond3",
  component: _index9["default"]
}, {
  path: "/indexsecond2",
  component: _index8["default"]
}, {
  path: "/indexsecond1",
  component: _index7["default"]
}, {
  path: "/index6",
  component: _index6["default"]
}, {
  path: "/index5",
  component: _index5["default"]
}, {
  path: "/index4",
  component: _index4["default"]
}, {
  path: "/index3",
  component: _index3["default"]
}, {
  path: "/index2",
  component: _index2["default"]
}, {
  path: "/",
  component: _index["default"]
}];
var _default = routes;
exports["default"] = _default;