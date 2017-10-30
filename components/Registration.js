import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, TextInput, Button } from './common/';
import styles from '../styles';

class Registration extends Component {

    constructor() {
        super();
        this.state = { username: '', password: '', loading: false, error: '' };
      }


    render() {
        return (

            <CardSection>

            <Card>
            <View>
           <Text> Test </Text>

            </View>

            </Card>



            <Card style={{height: 50 }}>
                

            <Button
              style={styles.button}
             onPress={() => console.log('yes')} title="Register"  
             title="Register"
             
             />
             
                </Card>

</CardSection>

         
            
        );
    }

}

const TitledInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    

    return (

      <CardSection>
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
            editable
            returnKeyType='next'
          />
        </View>
        </Card>
        </CardSection>
    );
};


module.exports = Registration;

