import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {

    const { inputStyle, containerStyle } = style;

    return(

            <View style ={containerStyle}>
                <Text  
          
                style={style.labelStyle}> 

                {label} 
                </Text>
                <TextInput
                secureTextEntry = {secureTextEntry}
                placeholder = {placeholder}
                autoCorrect={false}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}
                />

            </View>

          );


}

const style = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23, //Height between each line 23
        flex: 2 //When we have siblings with flex, we use flex in order to proportioner
        //space to each one. So for each sibling (input and label), we add up the flex
        //that's 3, so 2/3 is allocated to input and 1/3 is allocated to labelStyle
    
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },

    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    
    },

testStyle: {
    underlineColorAndroid: 'transparent',
    color: 'black',
    paddingBottom: 0

}

};

export { Input };

