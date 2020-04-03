import React, { Component } from 'react';
import { hexToRgb } from './src/colorConverter/hexToRgb';


export default class IMG extends Component {
    constructor(props) {
        super(props);
    }
    

    render () {
        const namedColors = {"aliceblue": "#f0f8ff","antiquewhite": "#faebd7","aqua": "#00ffff","aquamarine": "#7fffd4","azure": "#f0ffff","beige": "#f5f5dc","bisque": "#ffe4c4","black": "#000000","blanchedalmond": "#ffebcd","blue": "#0000ff","blueviolet": "#8a2be2","brown": "#a52a2a","burlywood": "#deb887","cadetblue": "#5f9ea0","chartreuse": "#7fff00","chocolate": "#d2691e","coral": "#ff7f50","cornflowerblue": "#6495ed","cornsilk": "#fff8dc","crimson": "#dc143c","cyan": "#00ffff","darkblue": "#00008b","darkcyan": "#008b8b","darkgoldenrod": "#b8860b","darkgray": "#a9a9a9","darkgreen": "#006400","darkgrey": "#a9a9a9","darkkhaki": "#bdb76b","darkmagenta": "#8b008b","darkolivegreen": "#556b2f","darkorange": "#ff8c00","darkorchid": "#9932cc","darkred": "#8b0000","darksalmon": "#e9967a","darkseagreen": "#8fbc8f","darkslateblue": "#483d8b","darkslategray": "#2f4f4f","darkslategrey": "#2f4f4f","darkturquoise": "#00ced1","darkviolet": "#9400d3","deeppink": "#ff1493","deepskyblue": "#00bfff","dimgray": "#696969","dimgrey": "#696969","dodgerblue": "#1e90ff","firebrick": "#b22222","floralwhite": "#fffaf0","forestgreen": "#228b22","fuchsia": "#ff00ff","gainsboro": "#dcdcdc","ghostwhite": "#f8f8ff","goldenrod": "#daa520","gold": "#ffd700","gray": "#808080","green": "#008000","greenyellow": "#adff2f","grey": "#808080","honeydew": "#f0fff0","hotpink": "#ff69b4","indianred": "#cd5c5c","indigo": "#4b0082","ivory": "#fffff0","khaki": "#f0e68c","lavenderblush": "#fff0f5","lavender": "#e6e6fa","lawngreen": "#7cfc00","lemonchiffon": "#fffacd","lightblue": "#add8e6","lightcoral": "#f08080","lightcyan": "#e0ffff","lightgoldenrodyellow": "#fafad2","lightgray": "#d3d3d3","lightgreen": "#90ee90","lightgrey": "#d3d3d3","lightpink": "#ffb6c1","lightsalmon": "#ffa07a","lightseagreen": "#20b2aa","lightskyblue": "#87cefa","lightslategray": "#778899","lightslategrey": "#778899","lightsteelblue": "#b0c4de","lightyellow": "#ffffe0","lime": "#00ff00","limegreen": "#32cd32","linen": "#faf0e6","magenta": "#ff00ff","maroon": "#800000","mediumaquamarine": "#66cdaa","mediumblue": "#0000cd","mediumorchid": "#ba55d3","mediumpurple": "#9370db","mediumseagreen": "#3cb371","mediumslateblue": "#7b68ee","mediumspringgreen": "#00fa9a","mediumturquoise": "#48d1cc","mediumvioletred": "#c71585","midnightblue": "#191970","mintcream": "#f5fffa","mistyrose": "#ffe4e1","moccasin": "#ffe4b5","navajowhite": "#ffdead","navy": "#000080","oldlace": "#fdf5e6","olive": "#808000","olivedrab": "#6b8e23","orange": "#ffa500","orangered": "#ff4500","orchid": "#da70d6","palegoldenrod": "#eee8aa","palegreen": "#98fb98","paleturquoise": "#afeeee","palevioletred": "#db7093","papayawhip": "#ffefd5","peachpuff": "#ffdab9","peru": "#cd853f","pink": "#ffc0cb","plum": "#dda0dd","powderblue": "#b0e0e6","purple": "#800080","rebeccapurple": "#663399","red": "#ff0000","rosybrown": "#bc8f8f","royalblue": "#4169e1","saddlebrown": "#8b4513","salmon": "#fa8072","sandybrown": "#f4a460","seagreen": "#2e8b57","seashell": "#fff5ee","sienna": "#a0522d","silver": "#c0c0c0","skyblue": "#87ceeb","slateblue": "#6a5acd","slategray": "#708090","slategrey": "#708090","snow": "#fffafa","springgreen": "#00ff7f","steelblue": "#4682b4","tan": "#d2b48c","teal": "#008080","thistle": "#d8bfd8","tomato": "#ff6347","turquoise": "#40e0d0","violet": "#ee82ee","wheat": "#f5deb3","white": "#ffffff","whitesmoke": "#f5f5f5","yellow": "#ffff00","yellowgreen": "#9acd32"
};
        let desiredColor;
        let resultingColor;
        if(Array.isArray(this.props.color)){
            desiredColor = this.props.color;
        }
        else if(typeof this.props.color == 'string'){
            if(this.props.color.includes('#')){
                desiredColor = hexToRgb(this.props.color);
            }
            else if(!this.props.color.includes('#') && namedColors[this.props.color]){
                desiredColor = hexToRgb(namedColors[this.props.color]);
            }
        }
        if(Array.isArray(desiredColor) && desiredColor.length == 3){
                const processingColor = new Color(desiredColor[0], desiredColor[1], desiredColor[2]);
                const finishingColor = new Solver(processingColor);
                resultingColor = finishingColor.solve();
        }
        else{
            resultingColor = {
                filter: ''
            }
        }
        return (
            <div>
                <img src={this.props.image} style={{filter:` ${resultingColor.filter}`}}/>
            </div>
        )
    }
}

class Color {
  constructor(r, g, b) {
    this.set(r, g, b);
  }
  
  toString() {
    return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
  }

  set(r, g, b) {
    this.r = this.clamp(r);
    this.g = this.clamp(g);
    this.b = this.clamp(b);
  }

  hueRotate(angle = 0) {
    angle = angle / 180 * Math.PI;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    this.multiply([
      0.213 + cos * 0.787 - sin * 0.213,
      0.715 - cos * 0.715 - sin * 0.715,
      0.072 - cos * 0.072 + sin * 0.928,
      0.213 - cos * 0.213 + sin * 0.143,
      0.715 + cos * 0.285 + sin * 0.140,
      0.072 - cos * 0.072 - sin * 0.283,
      0.213 - cos * 0.213 - sin * 0.787,
      0.715 - cos * 0.715 + sin * 0.715,
      0.072 + cos * 0.928 + sin * 0.072,
    ]);
  }

  grayscale(value = 1) {
    this.multiply([
      0.2126 + 0.7874 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 + 0.2848 * (1 - value),
      0.0722 - 0.0722 * (1 - value),
      0.2126 - 0.2126 * (1 - value),
      0.7152 - 0.7152 * (1 - value),
      0.0722 + 0.9278 * (1 - value),
    ]);
  }

  sepia(value = 1) {
    this.multiply([
      0.393 + 0.607 * (1 - value),
      0.769 - 0.769 * (1 - value),
      0.189 - 0.189 * (1 - value),
      0.349 - 0.349 * (1 - value),
      0.686 + 0.314 * (1 - value),
      0.168 - 0.168 * (1 - value),
      0.272 - 0.272 * (1 - value),
      0.534 - 0.534 * (1 - value),
      0.131 + 0.869 * (1 - value),
    ]);
  }

  saturate(value = 1) {
    this.multiply([
      0.213 + 0.787 * value,
      0.715 - 0.715 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 + 0.285 * value,
      0.072 - 0.072 * value,
      0.213 - 0.213 * value,
      0.715 - 0.715 * value,
      0.072 + 0.928 * value,
    ]);
  }

  multiply(matrix) {
    const newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]);
    const newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]);
    const newB = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
    this.r = newR;
    this.g = newG;
    this.b = newB;
  }

  brightness(value = 1) {
    this.linear(value);
  }
  contrast(value = 1) {
    this.linear(value, -(0.5 * value) + 0.5);
  }

  linear(slope = 1, intercept = 0) {
    this.r = this.clamp(this.r * slope + intercept * 255);
    this.g = this.clamp(this.g * slope + intercept * 255);
    this.b = this.clamp(this.b * slope + intercept * 255);
  }

  invert(value = 1) {
    this.r = this.clamp((value + this.r / 255 * (1 - 2 * value)) * 255);
    this.g = this.clamp((value + this.g / 255 * (1 - 2 * value)) * 255);
    this.b = this.clamp((value + this.b / 255 * (1 - 2 * value)) * 255);
  }

  hsl() {
    // Code taken from https://stackoverflow.com/a/9493060/2688027, licensed under CC BY-SA.
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
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
      l: l * 100,
    };
  }

  clamp(value) {
    if (value > 255) {
      value = 255;
    } else if (value < 0) {
      value = 0;
    }
    return value;
  }
}

class Solver {
  constructor(target, baseColor) {
    this.target = target;
    this.targetHSL = target.hsl();
    this.reusedColor = new Color(0, 0, 0);
    console.log(target)
    console.log(baseColor)
  }

  solve() {
    const result = this.solveNarrow(this.solveWide());
    return {
      values: result.values,
      loss: result.loss,
      filter: this.css(result.values),
    };
  }

  solveWide() {
    const A = 5;
    const c = 15;
    const a = [60, 180, 18000, 600, 1.2, 1.2];

    let best = { loss: Infinity };
    for (let i = 0; best.loss > 25 && i < 3; i++) {
      const initial = [50, 20, 3750, 50, 100, 100];
      const result = this.spsa(A, a, c, initial, 1000);
      if (result.loss < best.loss) {
        best = result;
      }
    }
    return best;
  }

  solveNarrow(wide) {
    const A = wide.loss;
    const c = 2;
    const A1 = A + 1;
    const a = [0.25 * A1, 0.25 * A1, A1, 0.25 * A1, 0.2 * A1, 0.2 * A1];
    return this.spsa(A, a, c, wide.values, 500);
  }

  spsa(A, a, c, values, iters) {
    const alpha = 1;
    const gamma = 0.16666666666666666;

    let best = null;
    let bestLoss = Infinity;
    const deltas = new Array(6);
    const highArgs = new Array(6);
    const lowArgs = new Array(6);

    for (let k = 0; k < iters; k++) {
      const ck = c / Math.pow(k + 1, gamma);
      for (let i = 0; i < 6; i++) {
        deltas[i] = Math.random() > 0.5 ? 1 : -1;
        highArgs[i] = values[i] + ck * deltas[i];
        lowArgs[i] = values[i] - ck * deltas[i];
      }

      const lossDiff = this.loss(highArgs) - this.loss(lowArgs);
      for (let i = 0; i < 6; i++) {
        const g = lossDiff / (2 * ck) * deltas[i];
        const ak = a[i] / Math.pow(A + k + 1, alpha);
        values[i] = fix(values[i] - ak * g, i);
      }

      const loss = this.loss(values);
      if (loss < bestLoss) {
        best = values.slice(0);
        bestLoss = loss;
      }
    }
    return { values: best, loss: bestLoss };

    function fix(value, idx) {
      let max = 100;
      if (idx === 2 /* saturate */) {
        max = 7500;
      } else if (idx === 4 /* brightness */ || idx === 5 /* contrast */) {
        max = 200;
      }

      if (idx === 3 /* hue-rotate */) {
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

  loss(filters) {
    // Argument is array of percentages.
    const color = this.reusedColor;
    color.set(0, 0, 0);

    color.invert(filters[0] / 100);
    color.sepia(filters[1] / 100);
    color.saturate(filters[2] / 100);
    color.hueRotate(filters[3] * 3.6);
    color.brightness(filters[4] / 100);
    color.contrast(filters[5] / 100);

    const colorHSL = color.hsl();
    return (
      Math.abs(color.r - this.target.r) +
      Math.abs(color.g - this.target.g) +
      Math.abs(color.b - this.target.b) +
      Math.abs(colorHSL.h - this.targetHSL.h) +
      Math.abs(colorHSL.s - this.targetHSL.s) +
      Math.abs(colorHSL.l - this.targetHSL.l)
    );
  }

  css(filters) {
    function fmt(idx, multiplier = 1) {
      return Math.round(filters[idx] * multiplier);
    }
    return `saturate(100%) brightness(0%) invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(2)}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(5)}%)`;
  }
}

  


// 'invert(19%) sepia(86%) saturate(6794%) hue-rotate(275deg) brightness(69%) contrast(105%)'