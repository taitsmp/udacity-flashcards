import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'Flashcards:notifications'


//check if an object is empty
//taken from: https://coderwall.com/p/_g3x9q/how-to-check-if-javascript-object-is-empty
export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false
  }
  return true
}

export function getProps(state, ownProps, names) {
  if (!Array.isArray(names)) {
    names = Array(names)
  }

  return names.reduce((acc, name) => {
    let prop = ownProps[name]
    if (prop === undefined && ownProps.navigation !== undefined) {
      prop = ownProps.navigation.state.params[name]
    } else if (state[name] != null) {
      prop = state[name]
    }

    return {
      [name]: prop,
      ...acc
    }
  }, {})
}

//could be ...checkAskedForNotifications() or askedFor...
// * then() always returns another Promise
// * however, if you return a new Promise from a "then" function the following things happen
//   + the new Promise executes asynchronously (this is always the case)
//   + the promise chain waits (i.e. is suspended) until the new Promise executes.
// https://javascript.info/promise-chaining#returning-promises
export function notifcationsExist() {
  return AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => data !== null)
}

//probably won't use this. Need to remove from App.js? 
export function getiOSNotificationPermission() {
  return Permissions.getAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
    if (status !== 'granted') {
      return Permissions.askAsync(Permissions.NOTIFICATIONS) //returns a Promise. just asks again...
    }
  })
}

function createNotification () {
  return {
    title: 'Practice your flashcards!',
    body: "👋 don't forget to practice today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  notifcationsExist().then(existing => {
    if (!existing) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({ status }) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync()

          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(20)
          tomorrow.setMintutes(0)

          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
              time: tomorrow,
              repeat: 'day',
            }
          )

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }
      })
    }  
  })
}

/*
export async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS)
  }
}*/

/*
  left off here:
  * call this in componentDidMount on App.js
  * see also AddEntry.js
  * get permission first
  * follow example in udacifitness helper.js (but use async)
  * more code here: https://docs.expo.io/versions/latest/sdk/notifications.html
  * learn a bit more about how async and await work.  Can review promises at the same time. 

*/

