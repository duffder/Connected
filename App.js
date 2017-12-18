import React, {Component} from 'react';
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View, Alert } from 'react-native';
import {Router, Scene, Drawer, Tabs} from 'react-native-router-flux';
import * as firebase from 'firebase';
import { Icon } from 'react-native-elements';
import Authentication from './components/Authentication';
import HomePage from './components/HomePage';
import DeckSwiper from './components/DeckSwiper';
import DrawerComponent from './components/DrawerComponent';
import Maps from './components/Maps';
import MapBeta from './components/MapBeta';
import Profile from './components/Profile';
import Registration from './components/Registration';
import { Actions } from 'react-native-router-flux';
import SwipeDeck from 'react-native-elements/src/swipedeck/SwipeDeck';

const firebaseConfig = {
  apiKey: "AIzaSyBuseOK4Mrcl3miu_efGzfYaw6yjURHjmo",
  authDomain: "geoex-f3e5b.firebaseapp.com",
  databaseURL: "https://geoex-f3e5b.firebaseio.com",
  projectId: "geoex-f3e5b",
  storageBucket: "geoex-f3e5b.appspot.com",
  messagingSenderId: "181363238144"
};

/*
Following are constant variables. One initializing firebase
and two others initializing a menu and tab icon.
*/
const firebaseApp = firebase.initializeApp(firebaseConfig);
console.ignoredYellowBox = [
  "Setting a timer"
];

const MenuIcon = ({focused}) => {
  return (
    <Icon 
    name='menu'
    type='material-community'
    color={focused ? '#333333' : '#c0c0c0'}
    
    />
  );
}

const TabIcon = ({ focused, title }) => {
  return (
    <Icon 
      name={title}
      type='material-community'
      color={focused ? '#333333' : '#c0c0c0'} />
  );
}

export default class App extends React.Component {
  constructor() {
    super();

    //If we load the app and there is no usertoken then it means
    //user is not logged in and isLoaded = false.
    this.state = { hasToken: false, isLoaded: false };
  }

  
  componentWillMount() {

  
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
        <Router>
          <Scene 
          navigationBarStyle={{backgroundColor: 'white'}}
          navigationBarTitleImageStyle={{color: 'white'}}
          key='root'>
            
            <Scene

            component={Authentication}
            hideNavBar={true}
            initial={!this.state.hasToken}
            key='Authentication'
            title='Authentication'
            />

<Scene

component={HomePage}
hideNavBar={false}
key='HP'
title='Test Environment'
/>


<Scene

component={MapBeta}
hideNavBar={false}
key='mapbeta'
title='Map Beta'
/>

<Scene
            //Det er her det sner.
          
            component={Registration}
            hideNavBar={false}
            key='Registration'
            title='Registration'
            />


          <Drawer
          drawerImage
          hideNavBar 
          key="drawer"
          activeTintColor='white'
          contentComponent={DrawerComponent}
            >


              <Tabs
                key='Tabbar'
                swipeEnabled={false}
                showLabel={false}
                tabs={true}
                tabBarPosition='bottom'
                tabBarStyle={{ backgroundColor: 'white', color:'white'  }}
                >

     
            <Scene  
           key="HomeTab"
           title="account"
           icon={TabIcon}>


            <Scene 
            component={Profile}
            initial={this.state.hasToken}
            key='HomePage'
            title='Home Page'
          />

            </Scene>




            <Scene 
             key='DeckSwiper'
              title='map'
              icon={TabIcon}
              >
        
         
         
            <Scene
          component={DeckSwiper}
            key='Deck'
            title='Deck'
            />

            </Scene>


          <Scene
            key='MapsTab'
          title='google-maps'
          icon={TabIcon}
          >

  
            <Scene
            component={Maps}
            hideNavBar={false}
            key='Maps'
            title='Maps'
            />

            </Scene>



      

          </Tabs>
          </Drawer>
            </Scene>
            </Router>
      );
    }
  }
}


