import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './routes/login'
import SignUp from './routes/signup.jsx'
/*
import firebaseConfig from './firebaseConfig'
import { initializeApp } from 'firebase/app'

const firebaseApp = initializeApp(firebaseConfig)

const firebaseAppAuth = firebaseApp.auth()

const FirebaseSignUp = createComponentWithAuth(SignUp)
const FirebaseLogin = createComponentWithAuth(Login)
*/

const root = ReactDOM.createRoot(document.getElementById('root'))

const FirebaseSignUp = SignUp
const FirebaseLogin = Login

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="signup" element={<FirebaseSignUp />} />
        <Route path="login" element={<FirebaseLogin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
