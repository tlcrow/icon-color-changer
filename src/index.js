import React, { Component } from 'react';
import { hexToRgb } from './src/colorConverter/hexToRgb';
import { namedColors } from './src/variables';
import { HSLValues, FilterValues } from './src/colorConverter/hslValues';
// import { FilterValues } from './src/colorConverter/filterValues';


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