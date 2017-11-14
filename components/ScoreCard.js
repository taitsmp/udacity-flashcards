import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
//import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'react-native-elements'
//import { fetchDecks } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { clearDailyReminders, createDailyReminderNotifications } from '../utils/utils'

class ScoreCardScreen extends Component {
  componentDidMount() {
    console.log('inside scorecard')
    clearDailyReminders()
      .then(createDailyReminderNotifications)
  }
  render() {
    
    const { resetQuiz, navigation, correct, deck, deckIndex } = this.props
    const numQuestions = deck.questions.length
    const scoreMsg = `You got ${correct} of ${numQuestions} questions correct.`

    //TODO: either remove me or figure out how to use this to prevent adding something new to the top of the nav stack. 
    const spAction = NavigationActions.setParams({
      key: 'QuizScreen',
      params: {deckIndex }
    })
    return (
      <View>
        <Text>{scoreMsg}</Text>
        <Button
          title="Retake Quiz"
          onPress={() => resetQuiz()}
        />
        <Button
          title="Go to the front of the Deck"
          onPress={() => navigation.navigate('QuizScreen', { deck, deckIndex })}
        />
      </View>
    )
  }
}

ScoreCardScreen.propTypes = {
  resetQuiz: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
  correct: PropTypes.number.isRequired,
  deckIndex: PropTypes.number.isRequired
}

export default ScoreCardScreen
