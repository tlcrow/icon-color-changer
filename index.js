"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hexToRgb = hexToRgb;

function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HSLValues = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HSLValues = /*#__PURE__*/function () {
  function HSLValues(r, g, b) {
    _classCallCheck(this, HSLValues);

    this.set(r, g, b);
  }

  _createClass(HSLValues, [{
    key: "toString",
    value: function toString() {
      return "rgb(".concat(Math.round(this.r), ", ").concat(Math.round(this.g), ", ").concat(Math.round(this.b), ")");
    }
  }, {
    key: "set",
    value: function set(r, g, b) {
      this.r = this.clamp(r);
      this.g = this.clamp(g);
      this.b = this.clamp(b);
    }
  }, {
    key: "hueRotate",
    value: function hueRotate() {
      var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      angle = angle / 180 * Math.PI;
      var sin = Math.sin(angle);
      var cos = Math.cos(angle);
      this.multiply([0.213 + cos * 0.787 - sin * 0.213, 0.715 - cos * 0.715 - sin * 0.715, 0.072 - cos * 0.072 + sin * 0.928, 0.213 - cos * 0.213 + sin * 0.143, 0.715 + cos * 0.285 + sin * 0.140, 0.072 - cos * 0.072 - sin * 0.283, 0.213 - cos * 0.213 - sin * 0.787, 0.715 - cos * 0.715 + sin * 0.715, 0.072 + cos * 0.928 + sin * 0.072]);
    }
  }, {
    key: "grayscale",
    value: function grayscale() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.multiply([0.2126 + 0.7874 * (1 - value), 0.7152 - 0.7152 * (1 - value), 0.0722 - 0.0722 * (1 - value), 0.2126 - 0.2126 * (1 - value), 0.7152 + 0.2848 * (1 - value), 0.0722 - 0.0722 * (1 - value), 0.2126 - 0.2126 * (1 - value), 0.7152 - 0.7152 * (1 - value), 0.0722 + 0.9278 * (1 - value)]);
    }
  }, {
    key: "sepia",
    value: function sepia() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.multiply([0.393 + 0.607 * (1 - value), 0.769 - 0.769 * (1 - value), 0.189 - 0.189 * (1 - value), 0.349 - 0.349 * (1 - value), 0.686 + 0.314 * (1 - value), 0.168 - 0.168 * (1 - value), 0.272 - 0.272 * (1 - value), 0.534 - 0.534 * (1 - value), 0.131 + 0.869 * (1 - value)]);
    }
  }, {
    key: "saturate",
    value: function saturate() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.multiply([0.213 + 0.787 * value, 0.715 - 0.715 * value, 0.072 - 0.072 * value, 0.213 - 0.213 * value, 0.715 + 0.285 * value, 0.072 - 0.072 * value, 0.213 - 0.213 * value, 0.715 - 0.715 * value, 0.072 + 0.928 * value]);
    }
  }, {
    key: "multiply",
    value: function multiply(matrix) {
      var newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
      var newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
      var newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
      this.r = newR;
      this.g = newG;
      this.b = newB;
    }
  }, {
    key: "brightness",
    value: function brightness() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.linear(value);
    }
  }, {
    key: "contrast",
    value: function contrast() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.linear(value, -(0.5 * value) + 0.5);
    }
  }, {
    key: "linear",
    value: function linear() {
      var slope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var intercept = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.r = this.clamp(this.r * slope + intercept * 255);
      this.g = this.clamp(this.g * slope + intercept * 255);
      this.b = this.clamp(this.b * slope + intercept * 255);
    }
  }, {
    key: "invert",
    value: function invert() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      this.r = this.clamp((value + this.r / 255 * (1 - 2 * value)) * 255);
      this.g = this.clamp((value + this.g / 255 * (1 - 2 * value)) * 255);
      this.b = this.clamp((value + this.b / 255 * (1 - 2 * value)) * 255);
    }
  }, {
    key: "hsl",
    value: function hsl() {
      // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
      var r = this.r / 255;
      var g = this.g / 255;
      var b = this.b / 255;
      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h,
          s,
          l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;

          case g:
            h = (b - r) / d + 2;
            break;

          case b:
            h = (r - g) / d + 4;
            break;
        }

        h /= 6;
      }

      return {
        h: h * 100,
        s: s * 100,
        l: l * 100
      };
    }
  }, {
    key: "clamp",
    value: function clamp(value) {
      if (value > 255) {
        value = 255;
      } else if (value < 0) {
        value = 0;
      }

      return value;
    }
  }]);

  return HSLValues;
}();

exports.HSLValues = HSLValues;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _hexToRgb = require("./src/colorConverter/hexToRgb");

var _variables = require("./src/variables");

var _hslValues = require("./src/colorConverter/hslValues");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var IMG = /*#__PURE__*/function (_Component) {
  _inherits(IMG, _Component);

  var _super = _createSuper(IMG);

  function IMG(props) {
    _classCallCheck(this, IMG);

    return _super.call(this, props);
  }

  _createClass(IMG, [{
    key: "render",
    value: function render() {
      var desiredColor;
      var resultingColor;

      if (Array.isArray(this.props.color)) {
        desiredColor = this.props.color;
      } else if (typeof this.props.color == 'string') {
        if (this.props.color.includes('#')) {
          desiredColor = (0, _hexToRgb.hexToRgb)(this.props.color);
        } else if (!this.props.color.includes('#') && _variables.namedColors[this.props.color]) {
          desiredColor = (0, _hexToRgb.hexToRgb)(_variables.namedColors[this.props.color]);
        }
      }

      if (Array.isArray(desiredColor) && desiredColor.length == 3) {
        var processingColor = new _hslValues.HSLValues(desiredColor[0], desiredColor[1], desiredColor[2]);
        var finishingColor = new FilterValues(processingColor);
        resultingColor = finishingColor.solve();
      } else {
        resultingColor = {
          filter: ''
        };
      }

      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("img", {
        src: this.props.image,
        style: {
          filter: " ".concat(resultingColor.filter)
        }
      }));
    }
  }]);

  return IMG;
}(_react.Component);

exports["default"] = IMG;

var FilterValues = /*#__PURE__*/function () {
  function FilterValues(target, baseColor) {
    _classCallCheck(this, FilterValues);

    this.target = target;
    this.targetHSL = target.hsl();
    this.reusedColor = new _hslValues.HSLValues(0, 0, 0);
    console.log(target);
    console.log(baseColor);
  }

  _createClass(FilterValues, [{
    key: "solve",
    value: function solve() {
      var result = this.solveNarrow(this.solveWide());
      return {
        values: result.values,
        loss: result.loss,
        filter: this.css(result.values)
      };
    }
  }, {
    key: "solveWide",
    value: function solveWide() {
      var A = 5;
      var c = 15;
      var a = [60, 180, 18000, 600, 1.2, 1.2];
      var best = {
        loss: Infinity
      };

      for (var i = 0; best.loss > 25 && i < 3; i++) {
        var initial = [50, 20, 3750, 50, 100, 100];
        var result = this.spsa(A, a, c, initial, 1000);

        if (result.loss < best.loss) {
          best = result;
        }
      }

      return best;
    }
  }, {
    key: "solveNarrow",
    value: function solveNarrow(wide) {
      var A = wide.loss;
      var c = 2;
      var A1 = A + 1;
      var a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
      return this.spsa(A, a, c, wide.values, 500);
    }
  }, {
    key: "spsa",
    value: function spsa(A, a, c, values, iters) {
      var alpha = 1;
      var gamma = 0.16666666666666666;
      var best = null;
      var bestLoss = Infinity;
      var deltas = new Array(6);
      var highArgs = new Array(6);
      var lowArgs = new Array(6);

      for (var k = 0; k < iters; k++) {
        var ck = c / Math.pow(k + 1, gamma);

        for (var i = 0; i < 6; i++) {
          deltas[i] = Math.random() > 0.5 ? 1 : -1;
          highArgs[i] = values[i] + ck * deltas[i];
          lowArgs[i] = values[i] - ck * deltas[i];
        }

        var lossDiff = this.loss(highArgs) - this.loss(lowArgs);

        for (var _i = 0; _i < 6; _i++) {
          var g = lossDiff / (2 * ck) * deltas[_i];
          var ak = a[_i] / Math.pow(A + k + 1, alpha);
          values[_i] = fix(values[_i] - ak * g, _i);
        }

        var loss = this.loss(values);

        if (loss < bestLoss) {
          best = values.slice(0);
          bestLoss = loss;
        }
      }

      return {
        values: best,
        loss: bestLoss
      };

      function fix(value, idx) {
        var max = 100;

        if (idx === 2
        /* saturate */
        ) {
            max = 7500;
          } else if (idx === 4
        /* brightness */
        || idx === 5
        /* contrast */
        ) {
            max = 200;
          }

        if (idx === 3
        /* hue-rotate */
        ) {
            if (value > max) {
              value %= max;
            } else if (value < 0) {
              value = max + value % max;
            }
          } else if (value < 0) {
          value = 0;
        } else if (value > max) {
          value = max;
        }

        return value;
      }
    }
  }, {
    key: "loss",
    value: function loss(filters) {
      // Argument is array of percentages.
      var color = this.reusedColor;
      color.set(0, 0, 0);
      color.invert(filters[0] / 100);
      color.sepia(filters[1] / 100);
      color.saturate(filters[2] / 100);
      color.hueRotate(filters[3] * 3.6);
      color.brightness(filters[4] / 100);
      color.contrast(filters[5] / 100);
      var colorHSL = color.hsl();
      return Math.abs(color.r - this.target.r) + Math.abs(color.g - this.target.g) + Math.abs(color.b - this.target.b) + Math.abs(colorHSL.h - this.targetHSL.h) + Math.abs(colorHSL.s - this.targetHSL.s) + Math.abs(colorHSL.l - this.targetHSL.l);
    }
  }, {
    key: "css",
    value: function css(filters) {
      function fmt(idx) {
        var multiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        return Math.round(filters[idx] * multiplier);
      }

      return "saturate(100%) brightness(0%) invert(".concat(fmt(0), "%) sepia(").concat(fmt(1), "%) saturate(").concat(fmt(2), "%) hue-rotate(").concat(fmt(3, 3.6), "deg) brightness(").concat(fmt(4), "%) contrast(").concat(fmt(5), "%)");
    }
  }]);

  return FilterValues;
}(); // 'invert(19%) sepia(86%) saturate(6794%) hue-rotate(275deg) brightness(69%) contrast(105%)'
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namedColors = void 0;
var namedColors = {
  "aliceblue": "#f0f8ff",
  "antiquewhite": "#faebd7",
  "aqua": "#00ffff",
  "aquamarine": "#7fffd4",
  "azure": "#f0ffff",
  "beige": "#f5f5dc",
  "bisque": "#ffe4c4",
  "black": "#000000",
  "blanchedalmond": "#ffebcd",
  "blue": "#0000ff",
  "blueviolet": "#8a2be2",
  "brown": "#a52a2a",
  "burlywood": "#deb887",
  "cadetblue": "#5f9ea0",
  "chartreuse": "#7fff00",
  "chocolate": "#d2691e",
  "coral": "#ff7f50",
  "cornflowerblue": "#6495ed",
  "cornsilk": "#fff8dc",
  "crimson": "#dc143c",
  "cyan": "#00ffff",
  "darkblue": "#00008b",
  "darkcyan": "#008b8b",
  "darkgoldenrod": "#b8860b",
  "darkgray": "#a9a9a9",
  "darkgreen": "#006400",
  "darkgrey": "#a9a9a9",
  "darkkhaki": "#bdb76b",
  "darkmagenta": "#8b008b",
  "darkolivegreen": "#556b2f",
  "darkorange": "#ff8c00",
  "darkorchid": "#9932cc",
  "darkred": "#8b0000",
  "darksalmon": "#e9967a",
  "darkseagreen": "#8fbc8f",
  "darkslateblue": "#483d8b",
  "darkslategray": "#2f4f4f",
  "darkslategrey": "#2f4f4f",
  "darkturquoise": "#00ced1",
  "darkviolet": "#9400d3",
  "deeppink": "#ff1493",
  "deepskyblue": "#00bfff",
  "dimgray": "#696969",
  "dimgrey": "#696969",
  "dodgerblue": "#1e90ff",
  "firebrick": "#b22222",
  "floralwhite": "#fffaf0",
  "forestgreen": "#228b22",
  "fuchsia": "#ff00ff",
  "gainsboro": "#dcdcdc",
  "ghostwhite": "#f8f8ff",
  "goldenrod": "#daa520",
  "gold": "#ffd700",
  "gray": "#808080",
  "green": "#008000",
  "greenyellow": "#adff2f",
  "grey": "#808080",
  "honeydew": "#f0fff0",
  "hotpink": "#ff69b4",
  "indianred": "#cd5c5c",
  "indigo": "#4b0082",
  "ivory": "#fffff0",
  "khaki": "#f0e68c",
  "lavenderblush": "#fff0f5",
  "lavender": "#e6e6fa",
  "lawngreen": "#7cfc00",
  "lemonchiffon": "#fffacd",
  "lightblue": "#add8e6",
  "lightcoral": "#f08080",
  "lightcyan": "#e0ffff",
  "lightgoldenrodyellow": "#fafad2",
  "lightgray": "#d3d3d3",
  "lightgreen": "#90ee90",
  "lightgrey": "#d3d3d3",
  "lightpink": "#ffb6c1",
  "lightsalmon": "#ffa07a",
  "lightseagreen": "#20b2aa",
  "lightskyblue": "#87cefa",
  "lightslategray": "#778899",
  "lightslategrey": "#778899",
  "lightsteelblue": "#b0c4de",
  "lightyellow": "#ffffe0",
  "lime": "#00ff00",
  "limegreen": "#32cd32",
  "linen": "#faf0e6",
  "magenta": "#ff00ff",
  "maroon": "#800000",
  "mediumaquamarine": "#66cdaa",
  "mediumblue": "#0000cd",
  "mediumorchid": "#ba55d3",
  "mediumpurple": "#9370db",
  "mediumseagreen": "#3cb371",
  "mediumslateblue": "#7b68ee",
  "mediumspringgreen": "#00fa9a",
  "mediumturquoise": "#48d1cc",
  "mediumvioletred": "#c71585",
  "midnightblue": "#191970",
  "mintcream": "#f5fffa",
  "mistyrose": "#ffe4e1",
  "moccasin": "#ffe4b5",
  "navajowhite": "#ffdead",
  "navy": "#000080",
  "oldlace": "#fdf5e6",
  "olive": "#808000",
  "olivedrab": "#6b8e23",
  "orange": "#ffa500",
  "orangered": "#ff4500",
  "orchid": "#da70d6",
  "palegoldenrod": "#eee8aa",
  "palegreen": "#98fb98",
  "paleturquoise": "#afeeee",
  "palevioletred": "#db7093",
  "papayawhip": "#ffefd5",
  "peachpuff": "#ffdab9",
  "peru": "#cd853f",
  "pink": "#ffc0cb",
  "plum": "#dda0dd",
  "powderblue": "#b0e0e6",
  "purple": "#800080",
  "rebeccapurple": "#663399",
  "red": "#ff0000",
  "rosybrown": "#bc8f8f",
  "royalblue": "#4169e1",
  "saddlebrown": "#8b4513",
  "salmon": "#fa8072",
  "sandybrown": "#f4a460",
  "seagreen": "#2e8b57",
  "seashell": "#fff5ee",
  "sienna": "#a0522d",
  "silver": "#c0c0c0",
  "skyblue": "#87ceeb",
  "slateblue": "#6a5acd",
  "slategray": "#708090",
  "slategrey": "#708090",
  "snow": "#fffafa",
  "springgreen": "#00ff7f",
  "steelblue": "#4682b4",
  "tan": "#d2b48c",
  "teal": "#008080",
  "thistle": "#d8bfd8",
  "tomato": "#ff6347",
  "turquoise": "#40e0d0",
  "violet": "#ee82ee",
  "wheat": "#f5deb3",
  "white": "#ffffff",
  "whitesmoke": "#f5f5f5",
  "yellow": "#ffff00",
  "yellowgreen": "#9acd32"
};
exports.namedColors = namedColors;
