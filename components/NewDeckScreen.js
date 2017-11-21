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


class NewDeckScreen extends Component {
  state = {
    input: undefined,
    missingInput: false,
    cancelDisabled: true
  }
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.keyboardDidShow())
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.keyboardDidHide())
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardDidShow() {
    this.setState({
      cancelDisabled: false
    })
  }

  keyboardDidHide() {
    this.setState({
      cancelDisabled: true
    })

  }

  async handleSubmit() {
    let { navigation, decks } = this.props

    if (this.state.input == undefined) {
      this.setState({ missingInput: true })
    } else {
      let deck = {
        title: this.state.input,
        questions: []
      }

      Keyboard.dismiss() //needed this in Android (not iOS)
      await this.props.addNewDeck(deck)
      navigation.navigate('DeckScreen', { deck, deckIndex: decks.length })
      
      this.setState({
        input: undefined,
        missingInput: false
      })
    }
  }
  handleCancel() {
      Keyboard.dismiss()

  }

  handleTextChange(input) {
    this.setState({
      input
    })
  }

  render() {
    const { missingInput, cancelDisabled } = this.state

    return (
      <KeyboardAvoidingView behavior="padding">
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={text => this.handleTextChange(text)} value={this.state.input} />
        {missingInput === true && (
          <FormValidationMessage>Please enter a title.</FormValidationMessage>
        )}
        <Button title="Submit" buttonStyle={[ {marginBottom: 5}]} onPress={() => this.handleSubmit()} />
        <Button title="Cancel" disabled={cancelDisabled} onPress={() => this.handleCancel()} />

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

function mapStateToProps(decks, ownProps) {
  
  return {
    decks
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckScreen)
