// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAi8Rs0iqgPNOe2ixJOzcAb3z0ESroOIQ8',
  authDomain: 'studenthousing-c91c3.firebaseapp.com',
  projectId: 'studenthousing-c91c3',
  storageBucket: 'studenthousing-c91c3.appspot.com',
  messagingSenderId: '67359368799',
  appId: '1:67359368799:web:5b807d884b2de585341dea',
  measurementId: 'G-D8H0EJGS46',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)
export default app
export { db }
