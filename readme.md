# Welcome

This is the repo for the iOS App, Convos. You can find it on the app store
[here](https://itunes.apple.com/us/app/find-convos/id1161973068?ls=1&mt=8). The android version is not finished.

## About the app
This app is written using React Native and utilizes [DeployHub](https://deploy.apphub.io/) to push out updates without
having to go through the AppStore review process. The backend uses [Firebase](https://firebase.google.com/) in order to
speed up time to market and utilize their suite of features including push notifications.

## Installing Pods

This app uses cocoa pods for some dependencies. Before you can build the app in xcode, run `pod install` from the `ios`
directory. This should install all of the pods for you. If you need to install cocoa pods you can learn more
[here](https://cocoapods.org/).

## Getting Started

Due to the nature of mobile development, getting started is much more complicated than a comparable web app. You can
read up on getting started with React Native [here](https://facebook.github.io/react-native/docs/getting-started.html).
You may also run into issues getting xCode to work with the js part of the app.

Clone this repo

### `git clone https://github.com/sipplified/campfire.git`

Install npm dependencies

### `npm install`

Run the dev environment

### `react-native run-ios`
