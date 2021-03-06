"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

var _axios = _interopRequireDefault(require("axios"));

var _vantConfig = _interopRequireDefault(require("../src/vantConfig"));

require("lib-flexible");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].config.productionTip = false;

_vue["default"].use(_vueAxios["default"], _axios["default"]);

_vue["default"].use(_vantConfig["default"]);

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');