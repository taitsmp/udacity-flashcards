import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, AsyncStorage } from 'react-native'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions/decks'
import DeckCover from './DeckCover'

//use FlatList
//https://www.youtube.com/watch?time_continue=2&v=6JgdIxDn8H4
class DeckListView extends Component {
    componentDidMount() {
        AsyncStorage.getItem('flashcards:deck').then(res => console.log(res))
        this.props.fetchDecks()
    }

    renderDeckCover = ({ item, index, separator }) => {
        let deck = item
        return <DeckCover deck={deck} />
    }

    render() {
        let k = 0

        //does this update the redux state by accident?
        const decks = this.props.decks.map(d => {
            d.key = k
            k++
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
