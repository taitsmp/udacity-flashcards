import React, { Component } from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions/decks'

//use FlatList
//https://www.youtube.com/watch?time_continue=2&v=6JgdIxDn8H4
class DeckListView extends Component {
    componentDidMount() {
        AsyncStorage.getItem('flashcards:deck').then((res) => console.log(res)) 
        this.props.fetchDecks()
    }

    render() {
        return (
            <View>
                <Text>Deck List View 2</Text>
                <Text>{JSON.stringify(this.props)}</Text>
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
    return {
        decks
     } 
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)
