import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import styles from '../styles';

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
    this.state = { 
      loading: false,
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
     };
     this.proRef = firebase.database().ref().child('profiles');
  }
  userAuth() {
    this.setState({ error: '', loading: true });
    const { username, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(username, password)
    .then(() => {
      var user = firebase.auth().currentUser;
      this.listenForProfile(this.proRef.child(user.uid));
      this.setState({ error: '', loading: false });
    
    })
    .catch((err) => {
        //Login was not successful, let's create a new account
        this.setState({ error: 'Failed to obtain user ID token.'+err, loading: false });
        firebase.auth().createUserWithEmailAndPassword(username, password)
        .then(() => { 
          this.setState({ error: '', loading: false });
          firebase.auth().currentUser.getIdToken().then(function(idToken) {
            AsyncStorage.setItem('id_token', idToken);
            console.log(idToken);
            Alert.alert( 'Welcome!');
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
  //Tager info fra profiles under det UID.
  listenForProfile(proRef) {
    proRef.on('value', (snap) => {
      this.setState({
        loading: false,
        error: ''
      });
      var user = {
        name: snap.val().name,
        phone: snap.val().phone,
        homecity: snap.val().homecity,
        sex: snap.val().sex,
        longitude: snap.val().longitude,
        latitude: snap.val().latitude,
        uid: snap.key,
        token: ''
      };
      firebase.auth().currentUser.getIdToken().then(function(idToken) {
        user.token = idToken;
        AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert('Welcome');
        Actions.HomePage();
      })
      .catch((err) => {
        this.setState({ error: 'Failed to obtain user ID token. ' + err, loading: false });
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
    
    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label.toUpperCase()}</Text>
            <TextInput
            autoCorrect={false}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            style={inputStyle}
            editable={true}
            returnKeyType='next'
          />
        </View>
    );
};
module.exports = Authentication;