import React, { Component } from 'react';

export default class IMG extends Component {

    render () {

        return (
            <div>
                <img src={this.props.heart} style={{filter:this.props.filter}}/>
            </div>
        )

    }

}

// 'invert(19%) sepia(86%) saturate(6794%) hue-rotate(275deg) brightness(69%) contrast(105%)'