import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// create .env on the root folder and fill with your firebase credential
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	//measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// if (!firebase.apps.length) {
// 	firebase.initializeApp({});
//  }else {
// 	firebase.app(); // if already initialized, use that one
//  }

// let app
// if (!firebase.apps.length) {
//     app = firebase.initializeApp({});
// }

export const auth = getAuth(app);

