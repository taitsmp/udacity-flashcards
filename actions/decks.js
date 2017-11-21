import * as StorageAPI from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const NEW_DECK = 'NEW_DECK'
export const NEW_CARD = 'NEW_CARD'


export const newDeck = deck => ({
  type: NEW_DECK,
  deck
})

export const newCard = (deckIndex, card) => ({
    type: NEW_CARD,
    deckIndex,
    card
  })

export const receiveDecks = decks => ({
  type: RECEIVE_DECKS,
  decks
})

export const fetchDecks = () => dispatch =>
  StorageAPI.fetchDecks().then(decks => {
    dispatch(receiveDecks(decks))
  })

export const addNewDeck = deck => dispatch =>
  StorageAPI.addNewDeck(deck).then(allDecks => dispatch(newDeck(deck)))

export const addNewCard = (di, card) => dispatch =>
  StorageAPI.addNewCard(di, card).then(allDecks => dispatch(newCard(di, card)))