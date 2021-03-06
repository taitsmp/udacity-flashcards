# Flashcards

A simple native flashcards app that supports creating multiple flashcard decks.   

# Installation

```
git clone git@github.com:taitsmp/udacity-flashcards.git
cd flashcards
yarn install
```

# Running Flashcards

Ensure you are in the `flashcards` directory. 

```
yarn start
```

Open up the Expo App on your phone and scan the QR code.  The app should start immediately. 

# Troubleshooting

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
yarn start -- --reset-cache
```

# Platforms Tested

This App has been tested on

* iOS 11, iPhone 6 Plus
* iOS 11, iPhone X simulator
* Nexus 5X, Android Studio Simulator

# Known Issues

* On the "ScoreCard" view Android and iOS are not consistently displaying the margin of the message text.

# Credit

Inspiration for this code was taken from the following repos.  

* https://github.com/udacity/reactnd-UdaciFitness-complete/tree/app-prep
* https://github.com/reactjs/redux/blob/master/examples/real-world
* https://github.com/StephenGrider/AdvancedReactNative/tree/master/swipe
* https://github.com/react-native-training/react-native-elements
