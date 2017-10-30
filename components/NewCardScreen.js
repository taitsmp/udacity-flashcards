import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import { addNewCard } from '../actions/decks'
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import * as Utils from '../utils/utils'


class NewCardScreen extends Component {
  static defaultProps = {
    question: undefined,
    answer: undefined,
    answerMissing: false,
    questionMissing: false
  }

  handleSubmit() {
    let newState = {}
    const { deckIndex } = this.props
    const { question, answer } = this.state

    if (answer == null) {
      newState.answerMissing = true
    }
    if (question == null) {
      newState.questionMissing = true
    }

    if (Utils.isEmpty(newState)) {

      const card = {
        question,
        answer
      }

       this.props.addNewCard(deckIndex, card)
    }

  }

  handleTextChange(type, input) {
    this.setState({
      [type]: input
    })
  }

  render() {
    return (
      <View>
        <FormLabel>Question</FormLabel>
        <FormInput onChangeText={text => this.handleTextChange('question', text)} />
        if (this.state.QuestionMissing)
        {<FormValidationMessage>Please enter a question.</FormValidationMessage>}
        <FormLabel>Answer</FormLabel>
        <FormInput onChangeText={text => this.handleTextChange('answer', text)} />
        if (this.state.AnswerMissing)
        {<FormValidationMessage>Please enter an answer.</FormValidationMessage>}
        <Button title="Submit" onPress={() => this.handleSubmit()} />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addNewCard: (deckIndex, card) => dispatch(addNewCard(deckIndex, card))
  }
}

export default connect(() => {}, mapDispatchToProps)(NewCardScreen)
