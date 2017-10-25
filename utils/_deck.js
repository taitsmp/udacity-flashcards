import { AsyncStorage } from 'react-native'
const DECK_STORAGE_KEY = 'flashcards:deck'

export const getDummyData = () => {
    return {
        decks: [
            {
                title: 'React',
                questions: [
                    {
                        question: 'What is React?',
                        answer: 'A library for managing user interfaces'
                    },
                    {
                        question: 'Where do you make Ajax requests in React?',
                        answer: 'The componentDidMount lifecycle event'
                    }
                ]
            },
            {
                title: 'JavaScript',
                questions: [
                    {
                        question: 'What is a closure?',
                        answer:
                            'The combination of a function and the lexical environment within which that function was declared.'
                    }
                ]
            }
        ]
    }
}

export const setDummyData = () => {
    const dummyData = getDummyData()

    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData
}
