import React, { Component } from 'react';
import {  AppRegistry, Image, Text, } from 'react-native';

export default class LogoImg extends Component {
  render() {

    return (
      <Image
        style={{
      
         width: 125,
          height: 125,
       


           
          justifyContent: 'center',
          alignItems: 'center'
          
        
        }}
        source={require('./pictures/friends2.png')}
      >
     
      </Image>
    );
  }
}
module.exports = LogoImg;
