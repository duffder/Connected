import React, {Component} from 'react';
import ReactNative from 'react-native';

const { StyleSheet, Text, View, TouchableOpacity} = ReactNative;

class ButtonCustom extends Component {
  render() {
    return (
      <View style={styles.action}>
  
        <TouchableOpacity style ={styles.buttonContainer}>
       
       
        underlayColor={constants.actionColor}
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.title}</Text>
            </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create({
buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,


},

buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'

}

});

module.exports = ButtonCustom;