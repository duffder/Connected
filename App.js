import React, {Component} from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View, Alert } from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import * as firebase from 'firebase';
import Authentication from './components/Authentication';
import HomePage from './components/HomePage';
import DeckSwiper from './components/DeckSwiper';
import Maps from './components/Maps';
import Registration from './components/Registration';
import { Actions } from 'react-native-router-flux';

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

    /*
    Following code will log you in automatically.
    */
    
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({hasToken: token !== null, isLoaded: true});
    })
  }


  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Alert.alert("Du er logget ud!")
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }


  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator/>
      )
    } else {
      return (
        <Router sceneStyle={{paddingTop: 25}}>
          <Scene key='root'>
            
            <Scene

            component={Authentication}
            hideNavBar={true}
            initial={!this.state.hasToken}
            key='Authentication'
            title='Authentication'
            />
            <Scene 
            onRight={() => this.userLogout()}
            rightTitle="LOG OUT"
            component={HomePage}
            hideNavBar={true}
            initial={this.state.hasToken}
            key='HomePage'
            title='Home Page'
         
            />
            <Scene 
            onRight={() => this.userLogout()}
            rightTitle="LOG OUT"
            component={DeckSwiper}
            key='DeckSwiper'
            title='Deck Swiper'
         
            />


            <Scene
            //Det er her det sner.
          
            component={Maps}
            hideNavBar={false}
            key='Maps'
            title='Maps'
            />



            <Scene
            //Det er her det sner.
          
            component={Registration}
            hideNavBar={false}
            key='Registration'
            title='Registration'
            />



            </Scene>
            </Router>
      );
    }
  }
}


