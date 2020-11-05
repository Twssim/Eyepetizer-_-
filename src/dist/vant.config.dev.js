"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vant = require("vant");

var vants = [_vant.Empty, _vant.Icon, _vant.Skeleton, _vant.Toast, _vant.Form];
var _default = {
  /**
   * Vue.use 方法会自动调用install函数
   * Install Vant Component plugin
   * @param Vue
   */
  install: function install(Vue) {
    vants.forEach(function (Component) {
      Vue.use(Component);
    });
  }
};
exports["default"] = _default;