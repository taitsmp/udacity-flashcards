import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY } from './_deck'

export function fetchDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(results => {
        return results === null ? setDummyData() : results.decks
    })
}

export function AddNewDeck (deck) {

    let decks = fetchDecks().push(deck)
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({decks}))
}

export function AddNewCard ({deckPosition, card}) {

  let decks = fetchDecks()
  decks[deckPosition].questions.push(card)
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({decks}))
}