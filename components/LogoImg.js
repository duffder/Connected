import React, { Component } from 'react';
import {  AppRegistry, Image, Text, } from 'react-native';

export default class LogoImg extends Component {
  render() {

    return (
      <Image
        style={{
          paddingLeft:300,
          paddingTop: 50,
            width: "100%",
          height: 170,
          flex: 1,


            position: "absolute",
          justifyContent: 'center',
          alignItems: 'center'
          
        
        }}
        source={require('./pictures/hulk.png')}
      >
     
      </Image>
    );
  }
}
module.exports = LogoImg;
