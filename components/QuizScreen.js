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
const SWIPE_THRESHOLD = SCREEN_WIDTH * .25

class QuizScreen extends Component {
  state = {
    cardIndex: 0,
    correct: 0
  }
  forceSwipe(direction) {
    const x_dist = direction == 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
    Animated.timing(this._position, {
      duration: SWIPE_DURATION,
      toValue: {x: x_dist, y: 0}
    }).start(() => this.onSwipeComplete(direction))

  }

  onSwipeComplete(direction) {
    //call handleGrade
    //handleGrade will update the state correctly. 
    //maybe don't need this function?
    this._postition.setValue({x:0, y:0}) //do this in handleGrade?
  }

  //style is used to tell the Animated View where it moves to.
  //LEFT OFF HERE: set the rotation and grab elements from position.getLayout.  
  getCardStyle() {
    return {
      //this._position.getLayout()
      
    }
  }

  componentWillMount() {
    let position = Animated.ValueXY() // starts at 0,0?
    let panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {  
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
       },
      onPanResponderMove: (event, gesture) => {
        position.setValue({x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (event, gesture) => {
        //detect change then forceSwipe() 
      }

  
    })
    this._position = position  //the position of the movable card.  Gets applied to different cards (depends which is on top)
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
    const { cardIndex, correct } = this.state
    const { deck, deckIndex, navigation } = this.props

    if (cardIndex >= deck.length) return this.renderNoMoreCards()

    return deck.map((c, i) => {
      if (i < cardIndex) return null

      if (i === cardIndex) {
        return (
          <Animated.View
            style={[this.getCardStyle(), styles.cardContainer, { zIndex: 99 }]}
            {...this._panResponder.panHandlers}
          >
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
