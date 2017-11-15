import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { Card, Button } from 'react-native-elements'

class CardView extends Component {
  state = {
    showAnswer: false
  }

  flipCard() {
    let { showAnswer } = this.state

    showAnswer = !showAnswer
    this.setState({
      showAnswer
    })
  }

 
  render() {
    const { deck, cardIndex, handleGrade } = this.props
    console.log(deck)
    const { question, answer } = deck.questions[cardIndex]
    const progress = `${cardIndex + 1} / ${deck.questions.length}`
    const { showAnswer } = this.state
    return (
      <Card title={deck.title} wrapperStyle={styles.container}>
      <View>
        <View><Text>{progress}</Text></View>
        {showAnswer ? (
          <View>
            <Text>{answer}</Text>
            <View>
              <TouchableHighlight onPress={() => this.flipCard()}>
                <Text>Question</Text>
              </TouchableHighlight>
            </View>
          </View>
        ) : (
          <View>
            <Text>{question}</Text>
            <View>
              <TouchableHighlight onPress={() => this.flipCard()}>
                <Text>Answer</Text>
              </TouchableHighlight>
            </View>

            <Button title="Correct" onPress={() => handleGrade(true)} />
            <Button title="Incorrect" onPress={() => handleGrade(false)} />
          </View>
        )}
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    marginBottom: 20
  }
})

export default CardView
