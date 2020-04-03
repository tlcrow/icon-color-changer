import React, { Component } from 'react';
import { hexToRgb } from './src/colorConverter/hexToRgb';
import { namedColors } from './src/variables';
import { HSLValues } from './src/colorConverter/hslValues';


export default class IMG extends Component {
    constructor(props) {
        super(props);
    }
    

    render () {
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
                const processingColor = new HSLValues(desiredColor[0], desiredColor[1], desiredColor[2]);
                const finishingColor = new FilterValues(processingColor);
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



class FilterValues {
  constructor(target, baseColor) {
    this.target = target;
    this.targetHSL = target.hsl();
    this.reusedColor = new HSLValues(0, 0, 0);
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