import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import DeckListView from './components/DeckListView'
import NewDeckScreen from './components/NewDeckScreen'
import QuizScreen from './components/QuizScreen'
import NewCardScreen from './components/NewCardScreen'
import DeckScreen from './components/DeckScreen'
import FlashStatusBar from './components/FlashStatusBar'
import { testFun, createDailyReminderNotifications } from './utils/utils'

/*
TODO: 

* animation when going to a deck from the deck list view
* on individual cards show how many questions are remaining
* clean up styling
* routing to 'go back and start a quiz' the back button should work correctly if you take the quiz over and over. 
* work on README
* ensure a simple install and use of yarn works. 
* Test in android
*/

export default class App extends React.Component {
  async componentDidMount() {
    createDailyReminderNotifications()
  }

  render() {
    const store = configureStore()
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashStatusBar barStyle="dark-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

//left off here.  Starting with navigation.
const Tabs = TabNavigator({
  DeckListView: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons name="cards-outline" size={30} color={tintColor} />
      )
    }
  },
  NewDeckView: {
    screen: NewDeckScreen,
    navigationOptions: {
      title: 'New Deck',
      tabBarLabel: '',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus" size={30} color={tintColor} />
    }
  }
})
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  QuizScreen: {
    screen: QuizScreen,
    navigationOptions: {
      /*
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },*/
    }
  },
  DeckScreen: {
    screen: DeckScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.deck.title}`
      /*
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },*/
    })
  },
  NewCardScreen: {
    screen: NewCardScreen,
    navigationOptions: {
      title: 'New Card'
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
