import firebase from 'firebase/app';
import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { authentication } from './firebaseConfig';

//const db = firebaseApp.firestore();

export default {
    fbPopup: async () => {
        const provider = new FacebookAuthProvider();
        let result = await signInWithPopup(authentication, provider);
        return result;

        /*await signInWithPopup(authentication, provider)
            .then((res) => {
                result = res;
            })
            .catch((err) => {
                console.log(err.message);
            })
        return result;*/
    }
}