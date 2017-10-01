import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';
import StatusBar from './StatusBar';
import ActionButton from './ActionButton';
import ListItem from './ListItem';
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
          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          })
        };
        this.itemsRef = this.getRef().child('items');
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


       goMaps() {
        try {
          Alert.alert("Maps")
          Actions.Maps();
        } catch (error) {
          console.log('error: ' + error.message);
        }
      }
    


      

      render() {
        const { navigate } = this.props.navigation;
        return (
          <KeyboardAvoidingView style={styles.listContainer} behavior="padding" >
            <StatusBar onPress={this.userLogout.bind(this)} title="Home" />

           
            

      <Button
      title="Maps"
        onPress={() => Actions.Maps()} 
      />


            </KeyboardAvoidingView>
            
            
            

          
        )
      }
    
    }
    module.exports = HomePage;