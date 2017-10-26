import { RECEIVE_DECKS } from '../actions/decks'


function decks (state = {}, action) {

    switch(action.type) {

        case RECEIVE_DECKS: {
            return action.decks  //TODO: we can change this later if needed.  If we have one reducer we should leave as is.  If we have multiple reducers they'll separate this for us by key.
        }
        default:
            return state
    }

}

export default decks