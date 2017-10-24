import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Button } from "react-native";
import Swiper from 'react-native-deck-swiper';
import { Constants } from 'expo';


class DeckSwiper extends Component {

    constructor(props) {
    super(props);
    this.state = {
      cards: ["1", "2", "3"],
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
        <Text style={styles.text}>{cardLabel}</Text> 
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
    flex: 2,
    backgroundColor: "#F5FCFF",
    height: 50
  },

  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    height: 20
  },

  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
});

module.exports = DeckSwiper; 

