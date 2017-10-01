import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import StatusBar from './StatusBar';
import ActionButton from './ActionButton';
import ListItem from './ListItem';
import styles from '../styles';
import StackNavigator from 'react-navigation';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps'


class Maps extends React.Component {

    constructor(props){
        super(props)
      
        this.state = {
          initialPosition: {
            latitude: 0,
            longitude: 0,
      
          }
        }
      }


      componentDidMount(){
        navigator.geolocation.getCurrentPosition((Position) => {
          
          var lat = parseFloat(Position.coords.latitude);
          var long = parseFloat(Position.coords.longitude);


          /**
           * 
           */
          var initialRegion = {
      
    
          latitude: lat,
          longitude: long,
          title: "hello",
       
          }
          
          this.setState({initialPosition: initialRegion})
    
           alert(this.state.initialPosition.longitude)
            alert(this.state.initialPosition.latitude)
      
          
        },
    
        (error) => alert(JSON.stringify(error), ),
        {enableHighAccuracy: true, timeout: 100, maximumAge: 1000});
        }
        
      render() {
        const { navigate } = this.props.navigation;
          return (
            
            <View style={styles.mapContainer}>
    
     
           
            <MapView
            
            style={styles.map}
    
            initialRegion= {this.initialPosition}
    
      
    
      
      >
      <MapView.Marker
      showsUserLocation={true}
            followUserLocation={true}
            zoomEnabled={true}
    
                coordinate={
                  //55.676097, 12.568337
                {
                latitude: 55.676097, longitude: 12.568337}
                }
    
                title={"Guide 1"}
                description={"Ved intet om noget"}
             />
    
    
          </MapView>
      
      
      
            </View>
          );
     
     
      }
      }
      module.exports = Maps;