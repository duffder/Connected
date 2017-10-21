//import libraries for making a component
import React, { Component } from 'react';
import { View } from 'react-native';
import axios from 'axios';
import AlbumDetail from './AlbumDetail';

//Make a component
class AlbumList extends Component {
    state = { albums: [] }; // -> initial empty state, accessible in render function
    //it is for initialzing, not modification.

    componentWillMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')

        //this.setstate -> state 2, when we fetch the data.
        //this.setstate does NEVER equals anything. it merely modifies an initial state
        //under class, the inital state is an empty albums array. we update it with setState.
        //it is just like a setmethod in java.
        .then(response => this.setState({ albums: response.data })); //<- We fetch the array called Data from HTTP response
}



renderAlbums() {

   
   /*
   
    //Map is an array helper, it can be called on arrays such as albums.
     //When you are in JSX (HTML) and want to use javascript, use {}
     console.log('returning albums');
   this.state.albums.map(album => 
   <Text>Hey key={album.artists}>{album.artists} </Text>);
   console.log('albums returend');

   */
}

//This.props references a properti that may be passed from parent component

render() {
        return (
            
<View>
{ this.state.albums.map(album => 
<AlbumDetail key={album.title} album={album} />

)} 

</View>

    );
}


}
const styles = {
      
        //First styling rule: Font size
        textStyle: {
            fontSize: 20
            
    
        }
    };

    module.exports = AlbumList;
