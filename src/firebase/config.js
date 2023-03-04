import firebase from "firebase/app"
import "firebase/firestore"


// vygenerováno ve firebase to je pokaždé jiné
const firebaseConfig = {
    apiKey: "AIzaSyCHh4lwletzU7pHb0MFLiGNGj4Y9ncmRio",
    authDomain: "movies-project-7caa4.firebaseapp.com",
    projectId: "movies-project-7caa4",
    storageBucket: "movies-project-7caa4.appspot.com",
    messagingSenderId: "325369364084",
    appId: "1:325369364084:web:176ee4da830bcc71805b21"
  };

//   ˇpočáteční nastavení firebase (init) to je napojení na aplikaci
firebase.initializeApp(firebaseConfig)

// počáteční nastavení služeb (services)
const projectFirestore = firebase.firestore()

export { projectFirestore }