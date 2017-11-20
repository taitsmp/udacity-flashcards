import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, Button } from 'react-native-elements'
import colors from '../utils/colors'

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

  renderQA(text, flipText) {
    return (
      <View style={{flex:1}}>
        <View style={styles.msgContainer} >
        <Text style={styles.msgText}>{text}</Text>
        </View>
        <View style={styles.flipContainer}>
          <TouchableOpacity onPress={() => this.flipCard()}>
            <Text style={styles.flipText}>{flipText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderProgress(ind, total) {
    const progressText = `${ind} of ${total}`
    return (
      <View>
        <Text>{progressText}</Text>
      </View>
    )
  }
  render() {
    const { deck, cardIndex, forceSwipe } = this.props
    console.log(deck)
    const { question, answer } = deck.questions[cardIndex]
    const { showAnswer } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.progressBar}>
          {this.renderProgress(cardIndex + 1, deck.questions.length)}
        </View>
        
          {showAnswer ? this.renderQA(answer, 'Question') : this.renderQA(question, 'Answer')}
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //margin: 50,
    borderRadius: 1,
    backgroundColor: 'white',
   
  },
  progressBar: {
    height: 15,
    flexDirection: 'row',
    flex: 1
  }, 
  msgContainer: {
    flex:2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  msgText: {
    fontSize: 30,
  },
  flipContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flipText: {
    fontSize: 25,
    color: 'blue'
  }
})

export default CardView
