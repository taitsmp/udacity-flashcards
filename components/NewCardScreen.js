import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Alert, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { addNewCard } from '../actions/decks'
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import * as Utils from '../utils/utils'

class NewCardScreen extends Component {
  state = {
    question: undefined,
    answer: undefined,
    answerMissing: false,
    questionMissing: false
  }

  handleSubmit() {
    let answerMissing, questionMissing
    const { deckIndex } = this.props
    const { question, answer } = this.state

    answerMissing = !answer
    questionMissing = !question

    console.log(answerMissing)
    console.log(questionMissing)
    if (!answerMissing && !questionMissing) {
      const card = {
        question,
        answer
      }

      console.log('about to add a new card')
      this.props.addNewCard(deckIndex, card)

      //should we dismiss the keyboard if there's an error too?
      Keyboard.dismiss()

      this.setState({
        question: undefined,
        answer: undefined
      })
    }

    this.setState({
      answerMissing,
      questionMissing
    })
  }

  handleTextChange(type, input) {
    this.setState({
      [type]: input
    })
  }

  render() {
    const { questionMissing, answerMissing } = this.state
    return (
      <View>
        <FormLabel>Question</FormLabel>
        <FormInput
          onChangeText={text => this.handleTextChange('question', text)}
          value={this.state.question}
        />
        {questionMissing && <FormValidationMessage>Please enter a question.</FormValidationMessage>}
        <FormLabel>Answer</FormLabel>
        <FormInput
          onChangeText={text => this.handleTextChange('answer', text)}
          value={this.state.answer}
        />
        {answerMissing && <FormValidationMessage>Please enter an answer.</FormValidationMessage>}
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

function mapStateToProps(state, ownProps) {
  return Utils.getProps(state, ownProps, ['deckIndex'])
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCardScreen)
