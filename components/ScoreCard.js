import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'

class ScoreCardScreen extends Component {

    render() {
        return (
            <View>
              <Text>You scored 3/10</Text>
              <Text>Retake Quiz</Text>
              <Text>Go to the front of the Deck</Text>
            </View>
        )
    }

}

export default connect()(ScoreCardScreen)