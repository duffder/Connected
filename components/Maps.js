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
        latitude: 55.676098,
        longitude: 12.568337,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.033,
  
      },
      markerPosition: {
        latitude: 55.665098,
        longitude: 12.557337
      },

      markerPosition2: {
        latitude: 55.674098,
        longitude: 12.566337
      },

      markerPosition3: {
        latitude: 55.666098,
        longitude: 12.558337
      },

      markerPosition4: {
        latitude: 55.646098,
        longitude: 12.538337
      }


    }
    
  }

  ComponentDidMount(){

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (this.map) {
          this.map.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          })
        }
      },
      (error) => alert('Error: Are location services on?'),
      { enableHighAccuracy: true }
    )


  }
  
    render() {
      return (
        <View style={styles.container}>
          <MapView
          style={styles.map}
          region={this.state.initialPosition}>
          
         

          
          
            <View style={styles.marker}>
         
         
            <MapView.Marker
           coordinate={this.state.markerPosition} />

           <MapView.Marker
           coordinate={this.state.markerPosition2} />

           <MapView.Marker
           coordinate={this.state.markerPosition3} />

           <MapView.Marker
           coordinate={this.state.markerPosition4} />

              
              </View>


      
           
              </MapView>


              <Card>

      
            </Card>
            
        </View>


      );
    }
  }
      module.exports = Maps;