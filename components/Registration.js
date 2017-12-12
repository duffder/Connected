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
             loading: false,
              error: '' };
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
        // const { longitude } = '30.30';
        firebase.database().ref(`/profiles/${currentUser.uid}/`)
          .push({
            homecity: this.state.homecity,
            latitude: 20,
            longitude: 20,
            name: this.state.name,
            phone: this.state,phone,
            sex: this.state.sex,
            phone: this.state.phone
    
          });
    
      };

      /*
  userAuth() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
      
      
        .then(() => {
            this.setState({ error: '', loading: false });
            firebase.auth().currentUser.getIdToken().then(function(idToken) {
              console.log(idToken);
              this.setState({ error: 'User already exists', loading: false });
            })
            .catch((err) => {
              this.setState({ error: 'Something went wrong'+err, loading: false });
            });
          })



        .catch((err) => {
            //Login was not successful, let's create a new account
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => { 
              this.setState({ error: '', loading: false });
              firebase.auth().currentUser.getIdToken().then(function(idToken) {
                AsyncStorage.setItem('id_token', idToken);
            
                writeToFirebase();

                Alert.alert( 'Registration er successful');
                Actions.HomePage();
              })


              .catch(() => {
                this.setState({ error: 'Failed to obtain user ID token.', loading: false });
              });
            })


            .catch((err) => {
                this.setState({ error: 'Authentication failed. '+err, loading: false });
            });


        });



      }
      */

      
  userRegister() {
        this.setState({ error: '', loading: true });
        const { email, password, name, phone, sex} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
      
      
        .then(() => {
            this.setState({ error: '', loading: false });
            firebase.auth().currentUser.getIdToken().then(function(idToken) {
                AsyncStorage.setItem('id_token', idToken);

                const { currentUser } = firebase.auth();
               
                firebase.database().ref(`/profiles/${currentUser.uid}`)
               
                .set({
                
                  latitude: 20,
                  longitude: 20,
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


            <View style={styles.loginStyle}>

            <Card>
         <TitledInput
            style={{position: "absolute"}}
            onChangeText={(name) => this.setState({name})}
            placeholder='Name'
            value={this.state.name}

     />

     </Card>

     <Card>
              <TitledInput
            style={{position: "absolute"}}
            onChangeText={(email) => this.setState({email})}
            placeholder='E-mail'
            value={this.state.email}

     />

</Card>

<Card>
<TitledInput
            style={{position: "absolute"}}
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            value={this.state.password}

     />

     </Card>


<Card>
<TitledInput
            style={{position: "absolute"}}
            onChangeText={(phone) => this.setState({phone})}
            placeholder='Phone number'
            value={this.state.phone}

     />

     </Card>
     

     <Card>
<TitledInput
            style={{position: "absolute"}}
            onChangeText={(sex) => this.setState({sex})}
            placeholder='Sex'
            value={this.state.sex}

     />

     </Card>


     


<Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButtonOrSpinner()}

         </View>

    
        );
    }
}

const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    

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
            returnKeyType='next'
            placeholderTextColor="white"
          />
          
        </View>
   
    );
};


module.exports = Registration;

