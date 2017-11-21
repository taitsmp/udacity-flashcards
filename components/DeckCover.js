import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
//import { connect } from 'react-redux'
import { Card } from 'react-native-elements'

class DeckCover extends Component {
  render() {
    const { deck, deckIndex, onPressDC } = this.props
    const subtitle = `${deck.questions.length} Cards`

    return (
      <TouchableOpacity onPress={() => onPressDC(deckIndex)}>
        <Card title={deck.title} wrapperStyle={styles.container}>
          <View style={{ alignItems: 'center'  }}>
            <Text>{subtitle}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    marginBottom: 30
  }
})

export default DeckCover
