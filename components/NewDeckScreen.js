import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import { addNewDeck } from '../actions/decks'
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import * as Utils from '../utils/utils'

//TODO: what feedback do I give the user once a deck is created?
//should I navigate them to the new deck?

class NewDeckScreen extends Component {
  state = {
    input: undefined,
    missingInput: false
  }
  handleSubmit() {
    if (this.state.input == undefined) {
      this.setState({ missingInput: true })
    } else {
      let deck = {
        title: this.state.input,
        questions: []
      }

      this.props.addNewDeck(deck)

      Keyboard.dismiss()

      this.setState({
        input: undefined,
        missingInput: false
      })
    }
  }

  handleTextChange(input) {
    this.setState({
      input
    })
  }

  render() {
    const { inputMissing } = this.state

    return (
      <KeyboardAvoidingView behavior="padding">
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={text => this.handleTextChange(text)} value={this.state.input} />
        {inputMissing === true && (
          <FormValidationMessage>Please enter a title.</FormValidationMessage>
        )}
        <Button title="Submit" onPress={() => this.handleSubmit()} />
      </KeyboardAvoidingView>
    )
  }
  renderOld() {
    return (
      <View>
        <Text>What is the Title of your new Deck?</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.handleTextChange(text)}
          value={this.state.input}
        />

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
