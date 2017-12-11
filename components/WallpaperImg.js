import React, { Component } from 'react';
import {  AppRegistry, Image, Text, } from 'react-native';

export default class BackgroundImage extends Component {
  render() {

    return (
      <Image
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          position: 'absolute',
        }}
        source={require('./pictures/sun2.png')}
      >
     
      </Image>
    );
  }
}
module.exports = BackgroundImage;
