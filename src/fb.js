import * as firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCrYjo5j1py-gIpZe6YRKkyFra3ri_IZls",
    authDomain: "vuetify-1ae10.firebaseapp.com",
    databaseURL: "https://vuetify-1ae10.firebaseio.com",
    projectId: "vuetify-1ae10",
    storageBucket: "vuetify-1ae10.appspot.com",
    messagingSenderId: "180826507913",
    appId: "1:180826507913:web:ffefb1c09c085faaf05458"
};

firebase.initializeApp(firebaseConfig);

const db =firebase.firestore();

export default db;