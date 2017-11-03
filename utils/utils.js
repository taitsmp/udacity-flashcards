import { Permissions, Notifications } from 'expo'

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

export async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  if (status !== 'granted') {
    await Permissions.askAsync(Permissions.NOTIFICATIONS)
  }
}

/*
  left off here:
  * call this in componentDidMount on App.js
  * see also AddEntry.js
  * get permission first
  * follow example in udacifitness helper.js (but use async)
  * more code here: https://docs.expo.io/versions/latest/sdk/notifications.html
  * learn a bit more about how async and await work.  Can review promises at the same time. 

*/
export function setLocalNotification () {
  // if notification already set, do nothing. (this is what udacifitness does)

  // use function above, getiOSNotificationPermission, to ask for permissions?  Could also just ask before calling this.
  
  // write another function to clear notifications. 

  //
}
