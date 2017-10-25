import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import DeckListView from './components/DeckListView'
import NewDeckView from './components/NewDeckView'
import QuizView from './components/QuizView'
import CardScreen from './components/CardScreen'
import FlashStatusBar from './components/FlashStatusBar'



export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <FlashStatusBar barStyle="dark-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

//left off here.  Starting with navigation.
const Tabs = TabNavigator({
  DeckListView: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    },
  },
  NewDeckView: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: '',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus' size={30} color={tintColor} />
    },
  }
})
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      /*
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },*/
    },
  },
  CardScreen: {
    screen: CardScreen,
    navigationOptions: {
      /*
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      },*/
    },
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
