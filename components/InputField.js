import React, { Component } from 'react';
import {  AppRegistry, Image, Text, View, TextInput } from 'react-native';
import { Card, CardSection } from './common/';
import styles from '../styles';

export default class InputField extends Component {
  render() {

    return (
        
              <CardSection>
              <Card>
                <View style={styles.containerStyle}>
                
                    <TextInput
                    
                    autoCorrect={false}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.inputStyle}
                    editable
                    returnKeyType='next'
                  />
                </View>
                </Card>
                </CardSection>
            );
  }
}
module.exports = InputField;
