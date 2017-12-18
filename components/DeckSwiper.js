import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button } from "react-native";
import Swiper from 'react-native-deck-swiper';
import { Constants } from 'expo';
import { Card, CardSection } from './common/';


class DeckSwiper extends Component {

    constructor(props) {
    super(props);
    this.state = {
      cards: ["1", "2", "3",
      "4", "5", "6",
      "7", "8", "9",
      "10"  ],
      swipedAllCards: false, //if all cards are swiped we need logic to stop
      //Initial state of direction is empty
      isSwipingBack: false, 
      cardIndex: 1 //We need to index our cards so we know what's what.
    };
  }

  swipeForward() {
  this.setState(this.state.cardIndex--);
  }

  swipeBackward() {

}


//We render our card and put in a cardText 
  renderCard = cardLabel => {
    return (
      <View style={styles.card}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          position: 'absolute',
        }}
        source={require('./pictures/stickman.png')}
      >
     
      </Image>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
    
        <Swiper
          style={styles.swiper}
          ref={swiper => {
            this.swiper = swiper;
          }}
          onSwiped={(cardIndex) => {console.log(cardIndex)}}
          cards={this.state.cards}
          cardVerticalMargin={10}
        
          cardIndex={this.state.cardIndex}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          showSecondCard={false}

          animateOverlayLabelsOpacity
          animateCardOpacity

        >

        </Swiper>
   


      </View >
      
   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    color: "D4D4D4",
    flex: 5,
    backgroundColor: "#D4D4D4",

  },
  swiper: {
    backgroundColor: "#D4D4D4",

  },

  card: {
    flex: 1,
  
    borderColor: "#D4D4D4",
    justifyContent: "center",
    backgroundColor: "#D4D4D4",

  },


});

module.exports = DeckSwiper; 

