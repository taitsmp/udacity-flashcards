import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions/decks'

function decksAndCards(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS: {
      return action.decks //TODO: we can change this later if needed.  If we have one reducer we should leave as is.  If we have multiple reducers they'll separate this for us by key.
    }
    case ADD_DECK: {
      return state.push(action.decks)
    }
    case ADD_CARD: {
      console.log('adding card to reducer state')
      const { deckIndex, card } = action

      let decks = state.slice() //makes a copy
      let deck = decks[deckIndex].slice()
      let questions = deck.questions.slice()
      questions.push(card)

      deck.questions = questions
      decks[deckIndex] = deck
      return decks
    }
    default:
      return state
  }
}

export default decksAndCards
