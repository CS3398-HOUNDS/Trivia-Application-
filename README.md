# CS3398-Klingons-S2020
Texas State University cs3398 Software Engineering course project.

# Trivia Knights
[comment]: <> (Here goes your awesome project description!)
![icon](https://i.imgur.com/Z4GvIx6.png)


## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## Description
1. This project is maintained by Jackson, Aaron, Donevan, Trevor, and Sohail
2. We are creating a Trivia application in order to allow users to play against others or even on their own!
3. We want to provide this application for any and all users that will enjoy it
4. This project is a demonstration of the skills we have acquired and are honing during our college tenure.

## Screenshots
![Example screenshot](https://i.imgur.com/u207NhB.png)

## Technologies
* Python - 3.7.1
* React - 16.13.0
* Django REST framework - 3.11.0
* Django - 2.2.1
* Djoser - 2.0.3

## Setup
To run the backend follow these [instructions](https://github.com/CS3398-HOUNDS/CS3398-Klingons-S2020/tree/master/backend)

For the frontend, from a terminal emulator, be sure that you first have npm installed. Please refer to your package manager of choice. Then, from the frontend directory, run the following:

```
$ npm install
$ npm start
```

## Code Examples
Show examples of usage:
`put-your-code-here`

## Features
List of features ready and TODOs for future development
* Unit testing / Create docs for API (Jackson) [artifact](https://github.com/CS3398-HOUNDS/CS3398-Klingons-S2020/commit/7b4d2e4fe0c6a3a0fed78617ace7313a5cd8ebac) 
* Permissions for authenticated and anonymous users (Aaron)  [artifact](https://github.com/CS3398-HOUNDS/CS3398-Klingons-S2020/commit/1cf92a729f9a7350ddb423abf7de641d5da90ad2) djoser framework uses authorization token allowing access to url endpoints in our REST API and rest framework allows us to add permissions to our viewsets 
* Functional game creation page that generates a an API endpoint URL [artifact](https://github.com/CS3398-HOUNDS/CS3398-Klingons-S2020/commit/6f25fea2705d9183241f1856fdbfafba10e1aa2e) All options have been implemented and are now supported, including question timers that affect score total.
* TriviaGame Component (Donevan) [artifact](https://github.com/CS3398-HOUNDS/CS3398-Klingons-S2020/commit/39f05cda8cd7a55fcf61a063af5a1fd0a0f81566#diff-516ceb2db23f3b682db416eeaed06d85react) Fetches an API, randomizes answer choices, and cycles through questions. 
* React component dynamic rendering (Trevor) [artifact](https://github.com/CS3398-HOUNDS/CS3398-Klingons-S2020/commit/126cde9baa06c02171aaf56051155916b5649857#diff-48bb2e3e3e5708d8083b1cff1fff3949) Rendering of react components in place reduces the need to reload the DOM thus speeding up the application overal.

To-do list:
* Deploy API to server
* Deploy react server
* Intigrate front-end and back-end services.

## Status
[comment]: <> (Project is: _in progress_, _finished_, _no longer continue_ and why?)
Trivia Knights is currently a work in progress and will remain in progress for the time being.
  * Donevan's Next Step: Handle user profiles, edits to the TriviaGame component. 
  * Sohail's Next Step: Separate the game engine from the user experience so that multiple players can be in the same session.
  * Jackson's Next Step: Move towards deploying API on server. - in progress -
  * Aaron's Next Step: Convert database to MySQL in order to accept datatypes from our fixtures.- in progress -
  * Trevor's Next Step: Connect user login and profile components to backend.

## Contact
Created by Texas State University Students contact us at:
* Jackson Ayers: jwa58@txstate.edu
* Aaron Carrasco: adc129@txstate.edu
* Trevor Chaney: t_c296@txstate.edu
* Donevan Gonzales: dlg143@txstate.edu
* Sohail Selky: sds158@txstate.edu
