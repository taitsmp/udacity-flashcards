import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import { addNewDeck } from '../actions/decks'
import { Button } from 'react-native-elements'

//TODO: what feedback do I give the user once a deck is created?  
//should I navigate them to the new deck? 

class NewDeckScreen extends Component {
  state = {
    input:undefined
  }
  handleSubmit() {
    if (this.state.input == undefined) {
      Alert.alert('Please enter a title for your deck.')
    }

    let deck = {
      title: this.state.input,
      questions: []
    }

    this.props.addNewDeck(deck)

    this.setState({
      input:undefined
    })
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
        <TextInput 
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => this.handleTextChange(text)}
        value={this.state.input} />
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

function mapStateToProps(state, ownProps) {
  return {} 
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckScreen)
