import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';
import styles from '../styles';
import markerImg from './imgs/human-pin-s.png';

const {
  ActivityIndicator,
  Alert,
  Animated,
  AsyncStorage,
  Image,
  Text,
  View,
  KeyboardAvoidingView
} = ReactNative;





class MapBeta extends Component {
/*
Initialize variables
*/

    constructor(props) {
    super(props);
    this.state = { 
      loading: false,
      uid: '',
      name: '',
      watchId: null,
      region: {
        latitude: 37.785834,
        longitude: -122.4063417,
        latitudeDelta: 0.00922*0.5,
        longitudeDelta: 0.00421*0.5
      },
      polylineCoords: [],
      guides: []
    };
 
    this.coordRef = firebase.database().ref(`/guides/`);
  }

  /*
When component is mounted, it will get location and retreive
user from AsyncStorage (Which is set in the Profile component)

It will parse it to json format so it can be sent to database.
  */


  componentDidMount() {
    this.getLocation();
    this.listenForActors();
    AsyncStorage.getItem('user').then((userString) => {
      let user = JSON.parse(userString);
    console.log(user)
      this.setState({ uid: user.uid, name: user.name });

    });

  }


  /*
When component unmounts just clear the watchid 
  */
  componentWillUnmount() {
    if(this.state.watchId !== null){
      navigator.geolocation.clearWatch(this.state.watchId);
      this.setState({watchId: null, polylineCoords: []});
    }
  }

  /*
  Method to get the user location.
  */

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        let region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922*0.5,
          longitudeDelta: 0.00421*0.5
        }
        this.onRegionChange(region);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 },
    );
  }

  /*
Find all guides in array and stringify them for use
  */

  findActor(key, guides){
   
    for (var i=0; i < guides.length; i++) {
      if (guides[i]._key === key) {
        return JSON.parse(JSON.stringify(guides[i]));
       
        alert(JSON.parse(JSON.stringify(guides[i])))
      }
    }
    return null;
  }

  /*
Retreive all guides from firebase.
  */


  listenForActors() {
    this.coordRef.on('value', (snap) => {
    //Create array of items (Array of json objects)  
     var items = [];
    
     snap.forEach((item) => {
       console.log("key: " + item.key)
        //First try to find yourself 
        var guide = this.findActor(item.key, this.state.guides);
      
        //if you are not in the database, push yourself into it.
        if(guide === null){
         
          items.push({
            name: item.val().name,
           
            coordinate: {
              latitude: item.val().latitude,
              longitude: item.val().longitude
            },

            coordinates: [
              {
                latitude: item.val().latitude,
                longitude: item.val().longitude
              }
            ],

            _key: item.key
          });


          //if latitude  or longitude has changed from the array value, then update values.
        }else if(guide.coordinate.latitude !== item.val().latitude || guide.coordinate.longitude !== item.val().longitude){
                alert("updating coors")
            guide.coordinates.push({
              latitude: item.val().latitude,
              longitude: item.val().longitude
          });

          //set the guide new coordinate after pushing
          guide.coordinate = {
            latitude: item.val().latitude,
            longitude: item.val().longitude
          }
          items.push(
            guide
          )
        }else{
          items.push(
            guide
          )
        }
      });
      this.setState({
        guides: items
      });
    });

  }

  /*
  If region is changed, set new state of region.
  */

  onRegionChange(region) {
    this.setState({ region });
  }


/*
Method for watchposition
*/
  watchPosition() {
      //If the watchId is null, it means no posiiton is being watched.
    if(this.state.watchId === null){
        //Initalize a watchid from navigator to read position of user.
      var watchId = navigator.geolocation.watchPosition(
        (position) => {
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: this.state.region.latitudeDelta,
            longitudeDelta: this.state.region.longitudeDelta
          }

          //If region changes, run onRegionChange and parse new region.
          this.onRegionChange(region);
          const { polylineCoords } = this.state;
          this.setState({
            polylineCoords: [...polylineCoords, position.coords]
          });
          this.updateCoord(position.coords);
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 10, distanceFilter: 1 },
      );
      this.setState({ watchId: watchId });
    }else{
      navigator.geolocation.clearWatch(this.state.watchId);
      this.setState({watchId: null, polylineCoords: []});
    }
  }


  updateCoord(coords) {
    this.setState({ loading: true });
    var that = this;
    var data = {
      name: this.state.name,
      latitude: coords.latitude,
      longitude: coords.longitude
    };

    this.coordRef.child(this.state.uid).once('value', function(snapshot) {
      if(snapshot.val() === null){
        that.coordRef.child(that.state.uid).set(data);
        that.setState({ loading: false });
      }else{
        that.coordRef.child(that.state.uid).update(data)
        .then(() => {
          that.setState({ loading: false });
        })
        .catch((err) => {
          console.log(err);
          that.setState({
            loading: false
          });
        });
      }
    })
    .catch(err => console.error(err));
  }

  


  render() {
    return (
      <View style ={styles.preview}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
        >
        {this.state.guides.map(marker => (
          <MapView.Marker
            coordinate={marker.coordinate}
            image={markerImg}
            title={marker.name}
            description={marker.uid}
       
          >
          </MapView.Marker>
        ))}
        {this.state.guides.map(marker => (
          <MapView.Polyline
            key={marker._key}
            coordinates={marker.coordinates}
            strokeColor='rgba(0,153,204,0.5)'
            fillColor='rgba(255,0,0,0.5)'
            strokeWidth={5}
          />
        ))}
          <MapView.Polyline
            key={1}
            coordinates={this.state.polylineCoords}
            strokeColor='rgba(0,153,204,0.5)'
            fillColor='rgba(255,0,0,0.5)'
            strokeWidth={5}
          />
        </MapView>
        <Icon 
          name={(this.state.watchId === null) ? 'walk' : 'human-male'}
          type='material-community'
          color='#333333'
          style={styles.capture}
          onPress={this.watchPosition.bind(this)}/>
      </View>
    )
  }
}
module.exports = MapBeta;