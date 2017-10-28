import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Card } from 'react-native-elements'

class CardScreen extends Component {
    render() {
        const { deck, cardIndex } = this.props
        const question = deck.questions[cardIndex].question
        return (
            <Card title={deck.title} wrapperStyle={styles.container}>
                <View>
                    <Text>Body of card</Text>
                </View>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 20
    }
})

function mapStateToProps(state, ownProps) {
    const { navigation } = ownProps
    let { deck, cardIndex } = ownProps

    if (deck === undefined && navigation !== undefined) {
        deck = navigation.state.params.deck
        cardIndex = navigation.state.params.cardIndex
    }

    return {
        deck,
        cardIndex
    }
}

export default connect(mapStateToProps)(CardScreen)
