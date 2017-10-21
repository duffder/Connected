import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import styles from '../styles';
import { Card } from './common/';

const {
  Alert,
  AsyncStorage,
  ActivityIndicator,
  Button,
  StyleSheet,
  TextInput,
  Text,
  View,
  KeyboardAvoidingView
} = ReactNative;

class Authentication extends Component {
  constructor() {
    super();
    this.state = { username: '', password: '', loading: false, error: '' };
  }
  userAuth() {
    this.setState({ error: '', loading: true });
    const { username, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(() => {
      this.setState({ error: '', loading: false });
      firebase.auth().currentUser.getIdToken().then(function(idToken) {
        AsyncStorage.setItem('id_token', idToken);
        console.log(idToken);
        Alert.alert( 'Velkommen');
        Actions.HomePage();
      })
      .catch((err) => {
        this.setState({ error: 'Failed to obtain user ID token.'+err, loading: false });
      });
    })
    .catch((err) => {
        //Login was not successful, let's create a new account
        firebase.auth().createUserWithEmailAndPassword(username, password)
        .then(() => { 
          this.setState({ error: '', loading: false });
          firebase.auth().currentUser.getIdToken().then(function(idToken) {
            AsyncStorage.setItem('id_token', idToken);
            console.log(idToken);
            Alert.alert( 'Velkommen!');
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
  renderButtonOrSpinner() {
    if (this.state.loading) {
        return <ActivityIndicator size='small' />;    
    }
    return <Button onPress={this.userAuth.bind(this)} title="Log in" />;
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Text style={styles.title}>Be connected</Text>

        <View style={styles.form}>
          <TitledInput
            label='Email Address'
            onChangeText={(username) => this.setState({username})}
            placeholder='Username'
            value={this.state.username}
          />

          <TitledInput
            label='Password'
            onChangeText={(password) => this.setState({password})}
            placeholder='Password'
            secureTextEntry
            value={this.state.password}
          />
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          {this.renderButtonOrSpinner()}
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    

    return (

      <Card>
        <View style={styles.containerStyle}>
            <Text style={{flex: 1}}>{label.toUpperCase()}</Text>
            <TextInput
            autoCorrect={false}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            style={styles.inputStyle}
            editable={true}
            returnKeyType='next'
          />
        </View>
        </Card>
    );
};



module.exports = Authentication;