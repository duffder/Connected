import React from 'React';
import { View } from 'react-native';

const Card = (props) => {
    return(
        <View style={styles.containerStyle}>
        {props.children}
        </View>
    );
};




const styles = {
    containerStyle: {
        borderWidth: 1, //define how wide a corner is
        borderRadius: 2, //round corners
        borderColor: '#ddd',
        borderBottomWidth: 0, //bottom segment has no width

        shadowOffset: { width: 0, height: 2 }, //Width(no shadow left or right side, height: some on the bottom)
        shadowColor: 'black',
        shadowOpacity: 0.2, //Make it see-through or not. (1 is solid)
        shadowRadius: 2, //rounding off corner of shadow (same as border radius so it lines up)
        elevation: 1, //Elevation needed for android only

        position: 'relative', 

        marginLeft: 5, //margin spacing
        marginRight: 5,
        marginTop: 10


    }
};

export { Card };
