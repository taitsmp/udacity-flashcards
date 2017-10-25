import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'

class NewDeckView extends Component {

    render() {
        return (
            <View>
              <Text>New Deck View</Text>
            </View>
        )
    }
}

export default connect()(NewDeckView)