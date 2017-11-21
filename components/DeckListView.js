import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, AsyncStorage, Alert } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions/decks'
import DeckCover from './DeckCover'

class DeckListView extends Component {
  componentDidMount() {
    this.props.fetchDecks()
  }
  onPressDC = deckIndex => {
    const {  navigation, decks } = this.props
    const deck = decks[deckIndex]

    navigation.navigate('DeckScreen', { deck, deckIndex })
  }

  renderDeckCover = ({ item, index, separator }) => {
    let deck = item
    return <DeckCover deck={deck} deckIndex={deck.key} onPressDC={this.onPressDC} />
  }

  render() {
    //TODO: does this update the redux state by accident?
    const decks = this.props.decks.map((d, i) => {
      d.key = i
      return d
    })

    return (
      <View style={{ flex: 1  }}>
        <FlatList data={decks} renderItem={this.renderDeckCover} />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchDecks: () => dispatch(fetchDecks())
  }
}

const mapStateToProps = (decks, ownProps) => {
  if (decks == null || !Array.isArray(decks)) decks = [] //TODO: better check here. decks is {}
  return {
    decks
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)
