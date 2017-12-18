import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../styles';
import { Card, CardSection } from './common/';

const {
  Alert,
  AsyncStorage,
  Button,
  Text,
  View,
  ViewPropTypes
} = ReactNative;

class DrawerComponent extends Component{
  
  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string,
  }


  static contextTypes = {
    drawer: React.PropTypes.object,
  }


  async userLogout() {
    try {
      await AsyncStorage.removeItem('id_token');
      Alert.alert('Log Out Successfully!');
      Actions.Authentication();
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  
  render() {
    return (
      <View style={styles.drawer}>
 
        
      <Card>
        <Button
        color='white'
        style={styles.drawerButton} onPress={Actions.HP} title="Tester" />
        </Card>


        <Card>
          
        <Button
        color='white'
        style={styles.drawerButton} onPress={Actions.pop} title="Back" />
        </Card>

        <Card>
          
          <Button
          color='white'
          style={styles.drawerButton} onPress={Actions.mapbeta} title="Map Beta" />
          </Card>

        
        <Button 
        color='white'
        style={styles.drawerButton} onPress={this.userLogout.bind(this)} title="Log Out" />
        
      </View>
    );
  }
}
module.exports = DrawerComponent;