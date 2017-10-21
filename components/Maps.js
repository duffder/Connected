import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import ActionButton from './ActionButton';
import styles from '../styles';
import StackNavigator from 'react-navigation';
import { StyleSheet, Text, View, Dimensions, Alert, Button, TouchableHighlight } from 'react-native';
import MapView from 'react-native-maps'
import { Card } from './common/';

const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO


class Maps extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      initialPosition: {
        latitude: 55.676098,
        longitude: 12.568337,
        latitudeDelta: 2,
        longitudeDelta: 2,
  
      },
      markerPosition: {
        latitude: 55.676098,
        longitude: 12.568337
      }
    }
    
  }
  
  watchID: ?number = null
  
  ComponentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }  
    render() {
      return (
        <View style={styles.container}>
          <MapView
          style={styles.map}
          region={this.state.initialPosition}>
          
          <MapView.Marker
          coordinate={this.state.markerPosition}>
          <View style={styles.radius}>
            <View style={styles.marker}>
              </View>
              </View>
              </MapView.Marker>
              </MapView>


              <Card>

      
            </Card>
            
        </View>


      );
    }
  }
      module.exports = Maps;