import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Card, Button } from 'react-native-elements'

class DeckScreen extends Component {
  onPressStartQuiz() {
    Alert.alert("You're starting a quiz.")
  }

  onPressAddNewCard() {
    //LEFT OFF HERE: add navigation code to go to NewCardScreen
    Alert.alert("You're adding a card.")
  }

  render() {
    const { deck } = this.props
    const numCardsMsg = `${deck.questions.length} Cards`

    return (
      <Card title={deck.title} wrapperStyle={styles.container}>
        <View>
          <Text>{numCardsMsg}</Text>

          <Button title="Start Quiz" onPress={() => this.onPressStartQuiz()} />
          <Button title="Add New Card" onPress={this.onPressAddNewCard} />
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
  let { deck } = ownProps

  if (deck === undefined && ownProps.navigation !== undefined) {
    deck = ownProps.navigation.state.params.deck
  }

  return {
    deck
  }
}

export default connect(mapStateToProps)(DeckScreen)
