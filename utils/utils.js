import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const DAILY_REMINDER_KEY = 'Flashcards:notifications'

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
export function checkDailyRemindersExists() {
  return AsyncStorage.getItem(DAILY_REMINDER_KEY)
    .then(JSON.parse)
    .then(data => data !== null)
}

function recordCreatedDailyReminders() {
  AsyncStorage.setItem(DAILY_REMINDER_KEY, JSON.stringify(true))
}

function createDailyReminder() {
  return {
    title: 'Practice your flashcards!',
    body: "👋 don't forget to practice today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function clearDailyReminders() {
  return AsyncStorage.removeItem(DAILY_REMINDER_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  )
}

/*
* functionality
  * notifications exist in the next 24 hours
  * if you've done any quizes, clear notifications for today (and set for tomorrow)
*/

//sets local notifications for the next day if no notifications exist.
export function createDailyReminderNotifications() {
  console.log('inside create reminder')
  checkDailyRemindersExists().then(exists => {
    console.log('inside exists then')
    console.log(exists)
    if (!exists) {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        console.log(`status is ${status}`)
        if (status === 'granted') {
          console.log('creating new local notifications')
          //I don't think think is needed but I guess you could have crashed before
          //recording that you saved created reminders
          Notifications.cancelAllScheduledNotificationsAsync()

          Notifications.scheduleLocalNotificationAsync(createDailyReminder(), {
            time: getTomorrowNotificationTime(),
            repeat: 'day'
          })
          recordCreatedDailyReminders()
        }
      })
    }
  })
}

function getTomorrowNotificationTime() {
  let tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(20)
  tomorrow.setMintutes(0)
  return tomorrow
}
