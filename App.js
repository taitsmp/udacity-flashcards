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

* layout card better.  
  + stop using 'Card' for now. 
  + consider breaking it down into two different components (answer + question)
  + "answer" and "question" both should have three sections.  try flex:4 for the center section. Answer's botton section is empty.
  + read up on jsx conditional flow - https://reactjs.org/docs/conditional-rendering.html
  + you could mess with styling in a new project.

* animation when going to a deck from the deck list view
* on individual cards show how many questions are remaining
* clean up styling
* routing to 'go back and start a quiz' the back button should work correctly if you take the quiz over and over.
* - the goback() functionality  in screen navigation prop of react-navigation likely fixes this. 
*    + didn't work as expected. can't pass it params
*    + I got one of these routes working better by just reseting the state.  The other one is still busted.  
* work on README
* ensure a simple install and use of yarn works. 
* Test in android

STRETCH GOALS
--------------
* pan responder
* look like amazon kindle flash cards
* use async / await not promises. 
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
