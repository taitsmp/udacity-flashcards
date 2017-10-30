import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import { addNewDeck } from '../actions/decks'
import { Button } from 'react-native-elements'

//TODO: what feedback do I give the user once a deck is created?  
//should I navigate them to the new deck? 

class NewDeckScreen extends Component {
  handleSubmit() {
    if (this.state.input == null) {
      Alert.alert('Please enter a title for your deck.')
    }

    let deck = {
      title: this.state.input,
      questions: []
    }

    this.props.addNewDeck(deck)
  }

  handleTextChange(input) {
    this.setState({
      input
    })
  }

  render() {
    return (
      <View>
        <Text>What is the Title of your new Deck?</Text>
        <TextInput onChangeText={text => this.handleTextChange(text)} />
        <Button title="Submit" onPress={() => this.handleSubmit()} />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addNewDeck: deck => dispatch(addNewDeck(deck))
  }
}

export default connect(() => {}, mapDispatchToProps)(NewDeckScreen)
