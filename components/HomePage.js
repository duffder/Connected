import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import StatusBar from './StatusBar';
import ActionButton from './ActionButton';
import styles from '../styles';
import StackNavigator from 'react-navigation';
import { Card } from './common/';


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

  componentWillMount(){
    let user = firebase.auth().currentUser;
    this.retrieveFromFirebase();
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
      static navigationOptions = {
        title: 'Connected',
      };
      
      retrieveFromFirebase = () => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/profiles/1EQvtY7ghaR8lq9HszB1XAP76Cc2/`)
        //anytime we get any data, call this function below with an object, to describe the data
        .on('value', snapshot => {
          this.setState({ 
            
            longitude: snapshot.val().longitude,
            homecity: snapshot.val().homecity,
            sex: snapshot.val().sex,
            username: snapshot.val().username
          
          });
          console.log('now logging retrievefromFirebase');
          console.log(this.state.longitude);

        });
      }

      writeToFirebase =() => {
       // const { longitude } = '30.30';
        firebase.database().ref(`/profiles/`)
        .push({ longitude: 30 });
      };


      render() {
        const { navigate } = this.props.navigation;
        return (
          <KeyboardAvoidingView style={styles.listContainer} >
            <StatusBar onPress={this.userLogout.bind(this)} title="Home" />
          
            
            <Text style={styles.homepageText}>Name: {this.state.username} </Text>

           
            <Text style={styles.homepageText}>Longitude: {this.state.longitude} </Text>
           

            <Text style={styles.homepageText}>Home City: {this.state.homecity}</Text>
            <Text style={styles.homepageText}>Sex: {this.state.sex} </Text>

            <Card>

          
              

            <Button
            style={styles.button}
            onPress={ () => Actions.Maps()} 
            title="Maps"
         
      />

      <Button
            style={styles.button2}
            onPress={ () => this.writeToFirebase()} 
            title="Press me to push longitude to firebase"
            color="black"
            paddingTop='50'
         
      />
      
            </Card>


  

           
            

      


            </KeyboardAvoidingView>
            
            
            

          
        )
      }
    
    }
    module.exports = HomePage;