import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Card, Button } from 'react-native-elements'
import * as Utils from '../utils/utils'

class DeckScreen extends Component {
  onPressStartQuiz() {
    
    let { navigation, deckIndex } = this.props
    navigation.navigate('QuizScreen', { deckIndex })
  }

  onPressAddNewCard() {
    let { navigation, deckIndex } = this.props
    navigation.navigate('NewCardScreen', { deckIndex })

  }

  render() {
    const { deck } = this.props
    const numCardsMsg = `${deck.questions.length} Cards`

    return (
      <Card title={deck.title} wrapperStyle={styles.container}>
        <View>
          <Text>{numCardsMsg}</Text>

          <Button title="Start Quiz" onPress={() => this.onPressStartQuiz()} />
          <Button title="Add New Card" onPress={() => this.onPressAddNewCard()} />
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    /*flex: 1,*/
    /*flexDirection: 'row',*/
    alignItems: 'center',
    marginBottom: 20
  }
})

function mapStateToProps(state, ownProps) {
  
  const { navigation } = ownProps
  const props = Utils.getProps(state, ownProps, ['deck', 'deckIndex'])
  const out = {
    navigation,
    ...props
  }
  return out
  
}

export default connect(mapStateToProps)(DeckScreen)
