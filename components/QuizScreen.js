import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
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

  renderCard() {
    const { deck, cardIndex } = this.props
    if (deck.questions.length >= cardIndex) this.renderScore()
    else this.renderCard()
  }

  renderScore() {
    return <ScoreCard />
  }

  render() {
    const { cardIndex, correct } = this.state
    const { deck, deckIndex, navigation } = this.props
    return deck.questions.length <= cardIndex ? (
      <ScoreCard deck={deck} correct={correct} deckIndex={deckIndex} navigation={navigation} />
    ) : (
      <CardView deck={deck} cardIndex={cardIndex} handleGrade={this.handleGrade} />
    )
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

QuizScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired,
    deckIndex: PropTypes.number.isRequired
  }


export default connect(mapStateToProps)(QuizScreen)
