"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _recommand = _interopRequireDefault(require("../components/view/recommand.vue"));

var _option = _interopRequireDefault(require("../components/option.vue"));

var _my = _interopRequireDefault(require("../components/my.vue"));

var _mycollect = _interopRequireDefault(require("../components/view/instrument/mycollect.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: '/',
  component: _option["default"],
  children: [{
    path: '/',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/view/discover.vue"));
      });
    }
  }, {
    path: '/recommand',
    component: _recommand["default"]
  }, {
    path: '/dayreport',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../components/view/dayreport.vue"));
      });
    }
  }],
  meta: {
    keepAlive: true
  }
}, {
  path: '/videoPlay',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/videoPlay"));
    });
  }
}, {
  path: '/my',
  component: _my["default"]
}, {
  path: '/login',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/view//register/login.vue"));
    });
  }
}, {
  path: '/mycollect',
  component: _mycollect["default"]
}, {
  path: '/person',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/view/person-page/person.vue"));
    });
  }
}, {
  path: '/userAgreement',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/view/person-page/person-page-instrument/use-agreement.vue"));
    });
  }
}, {
  path: '/privacyPolicy',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/view/person-page/person-page-instrument/privacy-policy.vue"));
    });
  }
}, {
  path: '/VideoFeatureStatment',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/view/person-page/person-page-instrument/Video feature Statement.vue"));
    });
  }
}, {
  path: '/HomePage',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/view/HomePage/HomePage.vue"));
    });
  }
}, {
  path: '/ChangeMessage',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/view/HomePage/changeMessage/Message.vue"));
    });
  }
}, {
  path: '/introduce',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/view/HomePage/changeMessage/introduce.vue"));
    });
  }
}, {
  path: '/attection',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/view/instrument/myattection.vue"));
    });
  }
}, {
  path: '/record',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/view/instrument/videoRecord.vue"));
    });
  }
}, {
  path: '/search',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/view/Search/search.vue"));
    });
  }
}, {
  path: '/dayreport',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../components/view/dayreport'));
    });
  }
}, {
  path: '/videoSearch',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../components/view/Search/resultVideo.vue'));
    });
  } // meta: {
  //   keepAlive:true
  // }

}, {
  path: '/VideoPlay',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../components/view/dayreport/VideoPlay.vue"));
    });
  }
}];
var router = new _vueRouter["default"]({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports["default"] = _default;