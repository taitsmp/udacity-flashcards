import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, setDummyData } from './_deck'

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    if (results === null) results = setDummyData()
    else results = JSON.parse(results)

    return results.decks
  })
}

export function addNewDeck(deck) {
  return fetchDecks().then(decks => {
      decks.push(deck)
      return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ decks }))
  })
}

export function addNewCard(deckPosition, card) {
  return fetchDecks().then(decks => {
    decks[deckPosition].questions.push(card)
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ decks }))
  })
}
