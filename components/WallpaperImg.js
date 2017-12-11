import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  Text,
} from 'react-native';

const remote = 'https://s15.postimg.org/tw2qkvmcb/400px.png';

export default class BackgroundImage extends Component {
  render() {
    const resizeMode = 'center';
    const text = '';

    return (
      <Image
        style={{
          backgroundColor: '#ccc',
          flex: 1,
          resizeMode,
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
        source={require('./pictures/sun2.png')}
      >
        <Text
          style={{
            backgroundColor: 'transparent',
            textAlign: 'center',
            fontSize: 30,
            padding: 40,
          }}
        >
          {text}
        </Text>
      </Image>
    );
  }
}

module.exports = BackgroundImage;
AppRegistry.registerComponent('BackgroundImage', () => BackgroundImage);