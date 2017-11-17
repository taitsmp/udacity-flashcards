import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
//import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'react-native-elements'
//import { fetchDecks } from '../utils/api'
import { clearDailyReminders, createDailyReminderNotifications } from '../utils/utils'

class ScoreCardScreen extends Component {
  componentDidMount() {
    console.log('inside scorecard')
    clearDailyReminders()
      .then(createDailyReminderNotifications)
  }
  render() {
    const { navigation, correct, deck, deckIndex } = this.props
    const numQuestions = deck.questions.length
    const scoreMsg = `You got ${correct} of ${numQuestions} questions correct.`

    return (
      <View style={{flex:1}}>
        <Text>{scoreMsg}</Text>
        <Button
          title="Retake Quiz"
          onPress={() => navigation.navigate('QuizScreen', { deckIndex })}
        />
        <Button
          title="Go to the front of the Deck"
          onPress={() => navigation.navigate('DeckScreen', { deck, deckIndex })}
        />
      </View>
    )
  }
}

ScoreCardScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
  correct: PropTypes.number.isRequired,
  deckIndex: PropTypes.number.isRequired
}

export default ScoreCardScreen
