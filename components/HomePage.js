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
    this.state = {text: ''};
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
      

      render() {
        const { navigate } = this.props.navigation;
        return (
          <KeyboardAvoidingView style={styles.listContainer} >
            <StatusBar onPress={this.userLogout.bind(this)} title="Home" />
            <Text style={styles.homepageText}>Name: <TextInput
          style={{height: 40, width: 300, alignItems: 'center'}}
          placeholder="Type in here!"
          onChangeText={(text) => this.setState({text})}
        /> </Text>
            <Text style={styles.homepageText}>Phone: </Text>
            <Text style={styles.homepageText}>Home City: </Text>
            <Text style={styles.homepageText}>Sex: </Text>

            <View style={style=styles.button}>
              
            <Button
            onPress={ () => Actions.Maps()} 
            title="Maps"
            color="white"
      />
            </View>


           
            

      


            </KeyboardAvoidingView>
            
            
            

          
        )
      }
    
    }
    module.exports = HomePage;