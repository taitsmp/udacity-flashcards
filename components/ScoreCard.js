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

    //          onPress={() => navigation.navigate('QuizScreen', { deck, deckIndex })}

    //getStateForAction might be the right thing to do - https://github.com/react-community/react-navigation/issues/288pAction = NavigationActions.setParams({
    //reset would also be a simple solution.  You just rebuild the entire navigation stack.  Should just be two things.
    //https://github.com/react-community/react-navigation/issues/288
    //goback(null) seems to work..
    return (
      <View>
        <Text>{scoreMsg}</Text>
        <Button
          title="Retake Quiz"
          onPress={() => resetQuiz()}
        />
        <Button
          title="Go to the front of the Deck"
          onPress={() => navigation.goBack(null)}
          
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
