# email-avail
This project is to make it super easy to select time blocks to copy paste in an email for meeting availability.

# Running
`yarn start`

# UI
Drag select available times and click enter to save to clipboard

# TODO
## web-app-bootstrap
- install MUI
- Get login / create account pages displaying
- Hook up to FB Auth


0. Buy domain and setup Firebase project with that domain
1. Get non-logged in page hosted on Google
1.5 Change timezone
1.6 Request Feature Popup
1.7 Request Feature Lambda
2. Get /create-account w/firebase working
3. Get /login w/firebase working
3.5 /logout
4. Do all tasks for web-app-bootstrap
5. Google Calendar oauth
6. get-events + display events
6.1 /home for displaying default calendar's first 3 weeks if user is logged in
6.5 preloading logic for +3 weeks of events
7. Change calendar drop down
## web-app-bootstrap
- /frontend
  - react
  - firebase auth out of the box with customizeable login / create account pages. Logout link component
  - tabbed settings page with "profile" as one tab, "account" as [email / pw] 
  - react ui library
  - google fonts
  - typescript
  - empty home page that says "App Home Page Goes Here"
- /backend
  - create-acccount api call that creates a user in Firestore
  - typescript
  - secrets in lambda with how to in readme https://firebase.google.com/docs/functions/config-env#:~:text=Secret%20Manager%20allows%206%20active,new%20version%20of%20the%20secret.
  - lambda setup to connect to firebase
- ops
  - husky react-ts-eslint on commit using community standared / prettier
  - deploy frontend and lambda's with github actions on push to /dev, /staging/, /prd
  - create script that creates firebase project and connects it to firestore

# V2
- Gmail browser extension with [gmail.js](https://github.com/KartikTalwar/gmail.js/tree/master#gmailtoolsadd_compose_buttoncompose_ref-content_html-onclick_action-custom_style_class)

# Promote
## People who might like this lifehack
https://chromeunboxed.com/create-custom-shortcuts-in-chrome-for-any-website/
Indie Hackers
