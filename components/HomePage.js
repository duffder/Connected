import React, { Component } from 'react';
import ReactNative from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import ActionButton from './ActionButton';
import styles from '../styles';
import WallpaperImg from './WallpaperImg';
//import StackNavigator from 'react-navigation';
import { Card, CardSection } from './common/';


const {
    AsyncStorage,
  ListView,
  StyleSheet,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView,
  Touchablehighlight,
  Alert,
  Button,
} = ReactNative;

class HomePage extends React.Component {


  constructor(props) {
    super(props);


    this.state = {
      username: '',
      password: '',
      name: '',
      phone: '',
      homecity: '',
      sex: '',
      longitude: '',
      latitude: '',
      uid: '',
      error: '',
      listOfVariable: []
    };
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
    this.retrieveFromFirebase(user);
    //  this.writeToFirebase();
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


  getRef() {
    return firebase.database().ref();
  }
  
  //Router flux fis. I toppen
 //static navigationOptions = {
 //   title: 'Connected',
 // };

  retrieveFromFirebase = (user) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/profiles/${currentUser.uid}/`)
      //anytime we get any data, call this function below with an object, to describe the data
      .on('value', snapshot => {
        this.setState({

          homecity: snapshot.val().homecity,
          sex: snapshot.val().sex,
          name: snapshot.val().name,
          phone: snapshot.val().phone

        });
        console.log('now logging retrievefromFirebase');
        console.log(this.state.homecity);

      });
  }

  writeToFirebase = () => {
    const { currentUser } = firebase.auth();
    // const { longitude } = '30.30';
    firebase.database().ref(`/profiles/${currentUser.uid}/`)
      .push({
        homecity: 'nice nok',
        latitude: 20,
        longitude: 20,
        name: 'lol',
        phone: 232,
        sex: 'male',
        username: 'what'


      });

  };


  render() {
    return (
      <KeyboardAvoidingView style={styles.loginStyle} >
       <WallpaperImg/>

          <Card>
            <Text style={styles.homepageText}>Name: {this.state.name} </Text>
            <Text style={styles.homepageText}>Phone: {this.state.phone} </Text>
            <Text style={styles.homepageText}>Sex: {this.state.sex} </Text>
          </Card>

            <Card>
            <Button
            color="white"
              onPress={() => this.writeToFirebase()}
              title="Press me to push longitude to firebase"
 
            />
            </Card>


      </KeyboardAvoidingView>


    );
  }

}
module.exports = HomePage;
