import { RECEIVE_DECKS, NEW_DECK, NEW_CARD } from '../actions/decks'

function decksAndCards(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS: {
      return action.decks //TODO: we can change this later if needed.  If we have one reducer we should leave as is.  If we have multiple reducers they'll separate this for us by key.
    }
    case NEW_DECK: {
      return [ ...state, action.deck]
    }
    case NEW_CARD: {
      //console.log('adding card to reducer state')
      const { deckIndex, card } = action

      //console.log("deckIndex is " + deckIndex)
      let decks = state.slice() //makes a copy
      let deck = { ...decks[deckIndex] }
      let questions = deck.questions.slice()
      questions.push(card)

      deck.questions = questions
      decks[deckIndex] = deck

    /* this should work too.
    let questions = decks[deckIndex].questions.slice()
    questions.push(card)
    [...state.slice(0, deckIndex), { ...state[deckIndex], questions }, ...state.slice(deckIndex)]
    */
      return decks
    }
    default:
      return state
  }
}

export default decksAndCards
