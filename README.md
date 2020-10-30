# Transparent

This is a sample webapp called transparent that is losely based on pet adoption services.

![Transparent](https://github.com/charakajg/transparent-demo/blob/main/Transparent.png?raw=true)

## Features

It merely has following functions:

* Anyone can register and become a user
* Any user can list his/her pet to be temporily adopted by other users
* Any user can adopt pets of other users (except the ones that are already adopted by another user)
* The owners can not take back adopted pets unless the adopter return it
* The adopter can return their adopted pets
* No payments involved! This service merely records who has adopted which pet.

## Folder structure
This repository contains or will have following folders:

Folder | Description | Status
-------| ------------|-------
*transparent-api* | This is the API server written in nodejs. It has a GraphQL end point. | Working
*transparent-web-client* | This folder contains a react web app. | Working
*transparent-mobile-client* | This folder contains a ReactNative mobile app. | Working

Note: Needs to add test files and seed data

## How to run

`git clone https://github.com/charakajg/transparent-demo`

### Starting the nodejs server with graphql end point @ port 5000
`cd transparent-demo/transparent-api`

`npm i`

`npm start`

### Starting the react web app @ port 3000
`cd transparent-demo/transparent-web-client`

`npm i`

`npm start`
`

### Starting the react native mobile app
`cd transparent-demo/transparent-mobile-client`

`npm i`

`npm start`

`npx react-native start` (to run metro)

`npx react-native run-android` (use a different terminal tab)

### Note:
If you have trouble connecting to graphql server running on localhost in your android emulator or device, (or if you are running the graphql sever elsewhere), you might need to change **src/config.js** and put the correct hostname/ip under **graphql_config** { host: 'IP_GOES_HERE' }.