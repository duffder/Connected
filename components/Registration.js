import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Alert, ActivityIndicator, TextInput, Button, AsyncStorage} from 'react-native';
import { Card, CardSection } from './common/';
import { Actions } from 'react-native-router-flux';
import InputField from './InputField';
import styles from '../styles';
import * as firebase from 'firebase';


class Registration extends React.Component {

    constructor() {
        super();
        this.state = { 
             name: '',
             email: '', 
             password: '',
             phone: '',
             sex: '' ,
             longitude: '',
             latitude: '',
             loading: false,
              error: '' };
      }

      componentDidMount(){

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

      renderButtonOrSpinner() {
        if (this.state.loading) {
            return <ActivityIndicator size='small' />;    
        }
        return <Button 
        onPress={this.userRegister.bind(this)} 
        title="Register" 
        color="white"
        />;
        
      }

      writeToFirebase = () => {
        const { currentUser } = firebase.auth();
      
        firebase.database().ref(`/profiles/${currentUser.uid}/`)
          .push({
            homecity: this.state.homecity,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            name: this.state.name,
            phone: this.state,phone,
            sex: this.state.sex,
    
          });
    
      };


      
      writeToFirebaseGPS = () => {      
        firebase.database().ref(`/guides/${this.state.email}`)
          .set({
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          });
    
      };

      

      
  userRegister() {
        this.setState({ error: '', loading: true });
        const { email, password, name, phone, sex, latitude, longitude} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
      
      
        .then(() => {
            this.setState({ error: '', loading: false });
            firebase.auth().currentUser.getIdToken().then(function(idToken) {
                AsyncStorage.setItem('id_token', idToken);

                const { currentUser } = firebase.auth();
               
                firebase.database().ref(`/profiles/${currentUser.uid}`)
               
                .set({
                
                  latitude: latitude,
                  longitude: longitude,
                  name: name,
                  phone: phone,
                  sex: sex,
          
                });
                
                Alert.alert( 'Registration er successful');
                Actions.HomePage();
              })

            .catch((err) => {
              this.setState({ error: ''+err, loading: false });
            });

        
          })
          
          .catch((err) => {
            this.setState({ error: ''+err, loading: false });
          });
        


      }
      




      userAuth() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
      
      
        .then(() => { 
            this.setState({ error: '', loading: false });
            firebase.auth().signInWithEmailAndPassword(email, password)
            firebase.auth().currentUser.getIdToken().then(function(idToken) {
               

              AsyncStorage.setItem('id_token', idToken);
          
              writeToFirebase();
              writeToFirebaseGPS();
              
              Alert.alert( 'Registration er successful');
              Actions.HomePage();
            })


            .catch(() => {
              this.setState({ error: 'Failed to obtain user ID token.', loading: false });
            });
          })



        };



      

    render() {
        return (


       <KeyboardAvoidingView keyboardVerticalOffset={-140} behavior='position' style={styles.loginStyle
       
       }>

 
         <TitledInput
            style={{position: "absolute"}}
            onChangeText={(name) => this.setState({name})}
            placeholder='Name'
            value={this.state.name}
            keyboardType='next'
            maxLength = {40}

     />

     


              <TitledInput
            style={{position: "absolute"}}
            onChangeText={(email) => this.setState({email})}
            placeholder='E-mail'
            value={this.state.email}
            keyboardType='next'
            maxLength = {40}

     />


<TitledInput
            style={{position: "absolute"}}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            value={this.state.password}
            keyboardType='next'
            maxLength = {20}

     />


<TitledInput
            style={{position: "absolute"}}
            onChangeText={(phone) => this.setState({phone})}
            placeholder='Phone number'
            value={this.state.phone}
            keyboardType='next'
            maxLength = {8}

     />


<TitledInput
            style={{position: "absolute"}}
            onChangeText={(sex) => this.setState({sex})}
            placeholder='Sex'
            value={this.state.sex}
            type='next'
            maxLength = {6}

     />

     


     


<Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButtonOrSpinner()}

         </KeyboardAvoidingView>

    
        );
    }
}

const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType, maxLength }) => {
    

    return (


        <View style={styles.containerStyle}>
         

            <TextInput
          
            autoCorrect={false}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            style={styles.inputStyle}
            editable
            placeholderTextColor="white"
            keyboardType = {keyboardType}
            maxLength ={maxLength}

          />
          
        </View>
   
    );
};


module.exports = Registration;

