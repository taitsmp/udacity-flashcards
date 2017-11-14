import React, { Component } from 'react'
import { View, Animated, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import * as Utils from '../utils/utils'
import PropTypes from 'prop-types'
import CardView from './CardView'
import ScoreCard from './ScoreCard'

class QuizScreen extends Component {
  state = {
    cardIndex: 0,
    correct: 0
  }

  handleGrade = answeredCorrectly => {
    let { correct, cardIndex } = this.state
    cardIndex++
    if (answeredCorrectly) correct++
    this.setState({
      correct,
      cardIndex
    })
  }

  renderNoMoreCards() {
    const { correct } = this.state
    const { deck, deckIndex, navigation } = this.props
    return <ScoreCard deck={deck} correct={correct} deckIndex={deckIndex} navigation={navigation} />
  }

  //LEFT OFF HERE.  Rendering all cards that have not been looked at.  Need to hook up PanResponsder.
  render() {
    const { cardIndex, correct } = this.state
    const { deck, deckIndex, navigation } = this.props

    if (cardIndex >= deck.length) return this.renderNoMoreCards()

    return deck.map((c, i) => {
      if (i < cardIndex) return null

      if (i === cardIndex) {
        return (
          <Animated.View style={[styles.cardContainer, { zIndex: 99 }]}>
            <CardView deck={deck} cardIndex={cardIndex} handleGrade={this.handleGrade} />
          </Animated.View>
        )
      } else {
        return (
          <View style={[styles.cardContainer, { zIndex: 5 }]}>
            <CardView deck={deck} cardIndex={cardIndex} handleGrade={this.handleGrade} />
          </View>
        )
      }
    })
  }
}

function mapStateToProps(state, ownProps) {
  const { navigation } = ownProps
  const props = Utils.getProps(state, ownProps, ['deckIndex'])
  const { deckIndex } = props
  console.log(state)
  console.log(props)
  //consle.log()
  const out = {
    navigation,
    ...props,
    deck: state[deckIndex]
  }
  return out
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1
  }
})

QuizScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
  deckIndex: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(QuizScreen)
