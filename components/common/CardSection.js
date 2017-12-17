import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {

    return (
<View style={styles.containerStyle}> 
{props.children}
</View>
    );
};

const styles = {

containerStyle: {

    borderBottomWidth: 1,
    padding: 5,
    paddingLeft: 100,
    paddingRight: 100,
    backgroundColor: '#3498db',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: '#3498db',
    position: 'relative'

}

};


export { CardSection };