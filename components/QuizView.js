import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'

class QuizView extends Component {

    render() {
        return (
            <View>
              <Text>Quiz View</Text>
            </View>
        )
    }

}

export default connect()(QuizView)
