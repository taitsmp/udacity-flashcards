import React, { Component } from 'react'
import { View, Animated, Text, StyleSheet, PanResponder, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import * as Utils from '../utils/utils'
import PropTypes from 'prop-types'
import CardView from './CardView'
import ScoreCard from './ScoreCard'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_DURATION = 250
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25

class QuizScreen extends Component {
  state = {
    cardIndex: 0,
    correct: 0
  }

  forceSwipe = (direction) => {
    const x_dist = direction == 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
    Animated.timing(this._position, {
      duration: SWIPE_DURATION,
      toValue: {  x: x_dist, y: 0  }
    }).start(() => this.onSwipeComplete(direction))
  }

  resetPosition() {
    Animated.spring(this._position, {
      toValue: {  x: 0, y: 0  }
    }).start()
  }

  onSwipeComplete(direction) {
    this._position.setValue({ x: 0, y: 0 })
    this.handleGrade(direction === 'right')
  }

  //style is used to tell the Animated View where it moves to.
  getCardStyle() {
    const position = this._position
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }

  componentWillMount() {
    let position = new Animated.ValueXY() // starts at 0,0?  Relative to it's containing view I would assume.
    let panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (event, gesture) => {
        position.setValue({  x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right')
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left')
        } else {
          this.resetPosition()
        }
      }
    })
    this._position = position //the position of the movable card.  Gets applied to different cards (depends which is on top)
    this._panResponder = panResponder
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

  render() {
    return <View>{this.renderCards()}</View>
  }
  renderCards() {
    const { cardIndex, correct } = this.state
    let { deck, deckIndex, navigation } = this.props

    if (cardIndex >= deck.questions.length) return this.renderNoMoreCards()

    console.log(deck)
    return deck.questions.map((c, i) => {
      if (i < cardIndex) return null

      if (i === cardIndex) {
        return (
          <Animated.View 
            key={i}
            style={[this.getCardStyle(), styles.card, { zIndex: 99 }]}
            {...this._panResponder.panHandlers}
          >
            <CardView deck={deck} cardIndex={cardIndex} forceSwipe={this.forceSwipe} />
          </Animated.View>
        )
      } else {
        return (
          <View key={i} style={[styles.card, { zIndex: 5 }]}>
            <CardView deck={deck} cardIndex={cardIndex} forceSwipe={this.forceSwipe} />
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
  card: {
    position: 'absolute', //position always relative to parent
    flex: 1, //might need to change this.
    width: SCREEN_WIDTH
  }
})

QuizScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  deck: PropTypes.object.isRequired,
  deckIndex: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(QuizScreen)
