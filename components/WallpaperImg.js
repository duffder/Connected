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
    const text = 'This is some text inlaid in an <Image />';

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
        source={{ uri: remote }}
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

AppRegistry.registerComponent('BackgroundImage', () => BackgroundImage);