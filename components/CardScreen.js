import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'

class CardScreen extends Component {
    render() {
        return (
            <View>
              <Text>Card Screen</Text>
            </View>
        )
    }
}

export default connect()(CardScreen)