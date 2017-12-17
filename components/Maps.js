import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import ActionButton from './ActionButton';
import styles from '../styles';
import StackNavigator from 'react-navigation';
import { StyleSheet, Text, View, Dimensions, Alert, Button, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps'
import { Card, Header } from './common/';

class Maps extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {

      initialPosition: {
        latitude: 55.676314,
        longitude: 12.569990,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.033,
  
      },
      markerPosition: {
        latitude: 55.677859,
        longitude: 12.573155
      },

      markerPosition2: {
        latitude: 55.675899,
        longitude: 12.562877
      },

      markerPosition3: {
        latitude: 55.674302,
        longitude: 12.570666
      },

      markerPosition4: {
        latitude: 55.675548,
        longitude: 12.578284
      }


    }
    
  }

  ComponentDidMount(){

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );


  }
  
    render() {
      return (
        <View style={styles.container}>
          <MapView
          style={styles.map}
          region={this.state.initialPosition}>
     
         

          
          
            <View style={styles.marker}>
         
         
            <MapView.Marker
            title={"Alex"}
            description={"Phone: 12345678 "}
           coordinate={this.state.markerPosition} />

           <MapView.Marker
           title={"John"}
           description={"Phone: 12345678 "}
           coordinate={this.state.markerPosition2} />

           <MapView.Marker
           title={"Per"}
           description={"Phone: 12345678 "}
           coordinate={this.state.markerPosition3} />

           <MapView.Marker
           title={"Supreme"}
           description={"Phone: 12345678 "}
           coordinate={this.state.markerPosition4} />

              
              </View>


      
           
              </MapView>
              
        </View>


      );
    }
  }
      module.exports = Maps;