import * as StorageAPI from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export const receiveDecks = decks => ({
    type: RECEIVE_DECKS,
    decks
})

export const fetchDecks = () => dispatch =>
    StorageAPI.fetchDecks().then(decks => {
        console.log(decks)
        dispatch(receiveDecks(decks))
    })
