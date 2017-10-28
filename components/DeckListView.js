import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, AsyncStorage, Alert } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions/decks'
import DeckCover from './DeckCover'
import CardScreen from './CardScreen'


class DeckListView extends Component {
    componentDidMount() {
        AsyncStorage.getItem('flashcards:deck').then(res => console.log(res))
        this.props.fetchDecks()
    }
    onPressDC = (deckIndex) => {
        //console.log(this.props)
        const {navigation, decks } = this.props
        const deck = decks[deckIndex]

        console.log('some props')
        console.log(deck)
        console.log(deckIndex)
        //grab the right deck.

        //pass deck and question index to the cardscreen.

        //Alert.alert('You tapped the button!')
        //LEFT OFF HERE: this is wrong.  Not how you pass in props.
        //https://reactnavigation.org/docs/navigators/stack
        //https://github.com/react-community/react-navigation/issues/935
        navigation.navigate('CardScreen', { deck, cardIndex:0 })
    }

    renderDeckCover = ({ item, index, separator }) => {
        let deck = item
        return <DeckCover deck={deck} deckIndex={deck.key} onPressDC={this.onPressDC} />
    }

    render() {
        //does this update the redux state by accident?
        const decks = this.props.decks.map( (d,i) => {
            d.key = i
            return d
        })

        return (
            <View style={{flex:1}}>
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
    console.log(decks)
    return {
        decks
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)
