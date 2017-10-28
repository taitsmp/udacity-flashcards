import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'

class CardScreen extends Component {
    render() {

        const { deck, cardIndex } = this.props
        const question = deck.questions[cardIndex].question
        return (
            <View>
              <Text>{question}</Text>
            </View>
        )
    }
}

export default connect()(CardScreen)