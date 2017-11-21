import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Card, Button } from 'react-native-elements'
import * as Utils from '../utils/utils'

class DeckScreen extends Component {
  onPressStartQuiz() {
    let { navigation, deck, deckIndex } = this.props
    navigation.navigate('QuizScreen', { deck, deckIndex })
  }

  onPressAddNewCard() {
    let { navigation, deckIndex } = this.props
    navigation.navigate('NewCardScreen', { deckIndex })
  }

  render() {
    const { deck } = this.props
    const numCardsMsg = `${deck.questions.length} Cards`
    const startDisabled = !deck.questions.length

    return (
      <Card title={deck.title}>
        <View style={styles.container}>
          <View>
            <View style={styles.cardCountMsg}>
              <Text>{numCardsMsg}</Text>
            </View>

            <Button
              title="Start Quiz"
              disabled={startDisabled}
              buttonStyle={{ marginBottom: 5 }}
              onPress={() => this.onPressStartQuiz()}
            />
            <Button title="Add New Card" onPress={() => this.onPressAddNewCard()} />
          </View>
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: 20
  },
  cardCountMsg: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 30
  }
})

function mapStateToProps(state, ownProps) {
  const { navigation } = ownProps
  const props = Utils.getProps(state, ownProps, ['deckIndex'])
  const deck = state[props.deckIndex]
  const out = {
    navigation,
    ...props,
    deck
  }
  return out
}

export default connect(mapStateToProps)(DeckScreen)
