//import libraries for making a component
import React, { Component } from 'react';
import { Text, View } from 'react-native';

//Make a component
class Header extends Component {
//This.props references a properti that may be passed from parent component
render() {
        return (
        <View style={styles.viewStyle}>
         <Text style={styles.textStyle}>{this.props.headerText} </Text>

         </View>
    );
}

}


const styles = {

    viewStyle: {
        backgroundColor: '#F8F8F8',
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 3, //Elevation needed for android only
        position: 'relative',

        justifyContent: 'center',
        alignItems: 'center',
        height: 60, //passing a pixel value
        paddingTop: 30, //pixel
    },

    shadow: {
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 3
        },

  
    //First styling rule: Font size
    textStyle: {
        fontSize: 20
        

    }
};


//Make the component available to other parts of the app
export { Header };
//export default header;

        //Justify Content (Used to position the elements in the veritcal)
        //Start,center, end
        //Alignitems (Position elements in the horizontal direction.)
        // Start, center , end