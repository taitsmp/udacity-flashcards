import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
//import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'

const white = '#fff'

class CardControls extends Component {
  render() {
    const { forceSwipe } = this.props
    return (
      <View style={[styles.container]}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red', marginRight: 4 }]}
          onPress={() => forceSwipe('left')}
        >
          <Entypo name="cross" size={30} color={white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'green', marginLeft: 4 }]}
          onPress={() => forceSwipe('right')}
        >
          <Entypo name="check" size={30} color={white} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center', //b/c buttons are flexed to take up all the space this is not needed.
    /*justifyContent: 'space-around',*/ 
    //borderColor: 'blue',
    //borderWidth: 4
  },
  button: {
    flex: 1,
    marginTop: 4,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    /*borderWidth: 4,*/
    borderRadius: 3
  }
})

export default CardControls
