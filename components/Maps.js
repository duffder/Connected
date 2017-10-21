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
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
  
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      }
    }
    
  }
  
  watchID: ?number = null
  
  componentDidMount() {
  navigator.geolocation.getCurrentPosition((position) => {
    var lat = parseFloat(position.coords.latitude)
    var long = parseFloat(position.coords.longitude)
  
    var initialRegion = {
      latitude: lat,
      longitude: long,
      latitudeDelta: LATTITUDE_DELTA,
      longitudeDelta: LONGTITUDE_DELTA
    }
  
    this.setState({initialPosition: initialRegion})
    this.setState({markerPosition: initialRegion})
  
  },
  (error) => alert(JSON.stringify(error)),
  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
  
  this.watchID = navigator.geolocation.watchPosition((position) => {
    var lat = parseFloat(position.coords.latitude)
    var long = parseFloat(position.coords.longitude)
  
    var lastRegion = {
      latitude: lat,
      longitude: long,
      longitudeDelta: LONGTITUDE_DELTA,
      latitudeDelta: LATTITUDE_DELTA
    }
  
    this.setState({initialPosition: lastRegion})
    this.setState({markerPosition: lastRegion})
  })
  }
  
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