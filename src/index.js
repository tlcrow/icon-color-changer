import React, { Component } from 'react';
import { hexToRgb } from './src/colorConverter/hexToRgb';
import { namedColors } from './src/variables';
import { HSLValues, FilterValues } from './src/colorConverter/filterColor';

export default class IMG extends Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        let styling = this.props.style;

        if(typeof styling.color == 'string'){
            if(styling.color.includes('#')){
                styling.color = hexToRgb(styling.color);
            }
            else if(!styling.color.includes('#') && namedColors[styling.color.toLowerCase()]){
                styling.color = hexToRgb(namedColors[styling.color.toLowerCase()]);
            }
        }
        if(Array.isArray(styling.color) && styling.color.length == 3){
                let processingColor = new HSLValues(styling.color[0], styling.color[1], styling.color[2]);
                let finishingColor = new FilterValues(processingColor);
                styling.filter = finishingColor.solve().filter;
        }
        else{
            styling.filter = {
                filter: ''
            }
        }
        return (
            <div>
                <img src={this.props.image} style={styling}/>
            </div>
        )
    }
}