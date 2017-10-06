import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import StatusBar from './StatusBar';
import ActionButton from './ActionButton';
import styles from '../styles';
import StackNavigator from 'react-navigation';


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
  componentDidMount() {
    let user = firebase.auth().currentUser;
    this.listenForProfile(this.proRef.child(user.uid));
    this.setState({ username: user.username, uid: user.uid});
  }


  //Listen for UID
  listenForProfile(proRef) {
    proRef.on('value', (snap) => {
      this.setState({
        loading: false,
        name: snap.val().name,
        phone: snap.val().phone,
        homecity: snap.val().homecity,
        sex: snap.val().sex,
        longitude: snap.val().longitude,
        latitude: snap.val().latitude,
        uid: snap.key,

      });
    });

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

      async updateInformation() {
        try {
          Alert.alert("Information updated! See people around you on the map.")
          Actions.Maps();
        } catch (error) {
          console.log('Error: ' + error.message);
        }
      }


      getRef() {
        return firebase.database().ref();
      }
      //Router flux fis. I toppen
      static navigationOptions = {
        title: 'Back',
      };
      

      render() {
        const { navigate } = this.props.navigation;
        return (
          <KeyboardAvoidingView style={styles.listContainer} >
            <StatusBar onPress={this.userLogout.bind(this)} title="" />
            <View style={styles.homepageText}>
              </View>
            <Text style={styles.homepageText}>Name: <TextInput
          style={{height: 40, width: 300, alignItems: 'center'}}
          placeholder="Type in here!"
          onChangeText={(text) => this.setState({text})}
          value={this.state.username}
        /> </Text>
            <Text style={styles.homepageText}>Phone: </Text>
            <Text style={styles.homepageText}>Home City: </Text>
            <Text style={styles.homepageText}>Sex: </Text>

            <View style={styles.button}>
            <Button style={styles.button}
            onPress={this.updateInformation.bind(this)}
            title="Update Information"
            color="white"
            
            />
            </View>
        
            <View style={style=styles.button}>
              
            <Button
            onPress={ () => Actions.Maps()} 
            title="Map"
            color="white"
      />
            </View>


           
            

      


            </KeyboardAvoidingView>
            
            
            

          
        )
      }
    
    }
    module.exports = HomePage;