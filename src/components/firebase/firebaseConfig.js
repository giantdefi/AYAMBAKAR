import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// create .env on the root folder and fill with your firebase credential
// const firebaseConfig = {
// 	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
// 	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
// 	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
// 	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
// 	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// 	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// const firebaseConfig = {

// 	apiKey: "AIzaSyCnYx9H1yBdnl1_yHDVeH3NWEEzRhZonVY",
  
// 	authDomain: "sate-patriot.firebaseapp.com",
  
// 	projectId: "sate-patriot",
  
// 	storageBucket: "sate-patriot.appspot.com",
  
// 	messagingSenderId: "485248563641",
  
// 	appId: "1:485248563641:web:62b7418cd111c3895ede68"
  
//   };



// const firebaseConfig = {

// 	apiKey: "AIzaSyBLLVVNmlLK46naxl_iseyb0vg6kwmPlvQ",
  
// 	authDomain: "my-project-a2813.firebaseapp.com",
  
// 	projectId: "my-project-a2813",
  
// 	storageBucket: "my-project-a2813.appspot.com",
  
// 	messagingSenderId: "865489891577",
  
// 	appId: "1:865489891577:web:2345d786f39b737e717228",
  
// 	measurementId: "G-FXBSP0KFDL"
  
//   };

  
// const firebaseConfig = {

// 	apiKey: "AIzaSyA28nkM7rQkK43RqGyq5fkhlAgaiBHwals",
  
// 	authDomain: "patriot-234b6.firebaseapp.com",
  
// 	projectId: "patriot-234b6",
  
// 	storageBucket: "patriot-234b6.appspot.com",
  
// 	messagingSenderId: "363032461235",
  
// 	appId: "1:363032461235:web:3e33dd01594081f56255c6"
  
//   };

// const firebaseConfig = {

// 	apiKey: "AIzaSyA28nkM7rQkK43RqGyq5fkhlAgaiBHwals",
  
// 	authDomain: "patriot-234b6.firebaseapp.com",
  
// 	projectId: "patriot-234b6",
  
// 	storageBucket: "patriot-234b6.appspot.com",
  
// 	messagingSenderId: "363032461235",
  
// 	appId: "1:363032461235:web:32b87f4ba6756d266255c6"
  
//   };

const firebaseConfig = {

	apiKey: "AIzaSyAhULBwh7GkUPfnh2JWXv98RtPDpASXXQw",
  
	authDomain: "ayam-bakar-patriot-6c6a1.firebaseapp.com",
  
	projectId: "ayam-bakar-patriot-6c6a1",
  
	storageBucket: "ayam-bakar-patriot-6c6a1.appspot.com",
  
	messagingSenderId: "24946305029",
  
	appId: "1:24946305029:web:b0282bc78a35a14183946c"
  
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

