import React, {Component} from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import * as firebase from 'firebase';
import Authentication from './components/Authentication';
import HomePage from './components/HomePage';
import Maps from './components/Maps';

const firebaseConfig = {
  apiKey: "AIzaSyBuseOK4Mrcl3miu_efGzfYaw6yjURHjmo",
  authDomain: "geoex-f3e5b.firebaseapp.com",
  databaseURL: "https://geoex-f3e5b.firebaseio.com",
  projectId: "geoex-f3e5b",
  storageBucket: "geoex-f3e5b.appspot.com",
  messagingSenderId: "181363238144"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
console.ignoredYellowBox = [
  "Setting a timer"
];


export default class App extends React.Component {
  constructor() {
    super();
    this.state = { hasToken: false, isLoaded: false };
  }
  componentWillMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({hasToken: token !== null, isLoaded: true});
    })
  }
  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator/>
      )
    } else {
      return (
        <Router>
          <Scene key='root'>
            <Scene
            component={Authentication}
            hideNavBar={true}
            initial={!this.state.hasToken}
            key='Authentication'
            title='Authentication'
            />
            <Scene
            component={HomePage}
            hideNavBar={true}
            initial={this.state.hasToken}
            key='HomePage'
            title='Home Page'
            />
            <Scene
            //Det er her det sner.
          
            component={Maps}
            hideNavBar={false}
          
            key='Maps'
            title='Maps'
            />
            </Scene>
            </Router>
      );
    }
  }
}


