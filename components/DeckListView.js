import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'

//use FlatList
//https://www.youtube.com/watch?time_continue=2&v=6JgdIxDn8H4
class DeckListView extends Component {
    render() {
        return (
            <View>
              <Text>Deck List View</Text>
            </View>
        )
    }
}

export default connect()(DeckListView)
