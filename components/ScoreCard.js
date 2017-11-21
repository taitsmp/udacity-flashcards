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
    clearDailyReminders().then(createDailyReminderNotifications)
  }
  render() {
    const { resetQuiz, navigation, correct, deck, deckIndex } = this.props
    const numQuestions = deck.questions.length
    const scoreMsg = `You got ${correct} of ${numQuestions} questions correct.`

    return (
      <View style={{ flex: 1, margin: 10, backgroundColor: 'white' }}>
        <View style={styles.msgContainer}>
          <Text style={styles.messageText}>{scoreMsg}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={{ marginBottom: 5 }}
            title="Retake Quiz"
            onPress={() => resetQuiz()}
          />
          <Button
            buttonStyle={{ marginBottom: 10 }}
            title="Go to the front of the Deck"
            onPress={() => navigation.goBack(null)}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  msgContainer: {
    flex: 2,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  messageText: {
    fontSize: 30
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10
  }
})

ScoreCardScreen.propTypes = {
  resetQuiz: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
  correct: PropTypes.number.isRequired,
  deckIndex: PropTypes.number.isRequired
}

export default ScoreCardScreen
