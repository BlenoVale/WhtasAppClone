import { signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { authentication, db } from './firebaseConfig';
import { addDoc, arrayUnion, collection, deleteDoc, doc, documentId, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";

export default {
    fbPopup: async () => {
        const provider = new FacebookAuthProvider();
        let result = await signInWithPopup(authentication, provider);
        return result;
    },
    addUser: async (u) => {
        try {
            const userRef = doc(collection(db, 'users'), u.id);
            await setDoc(userRef, {
                name: u.name,
                avatar: u.avatar
            });
        } catch (e) {
            console.error("Erro: ", e);
        }
    },
    deleteUser: async (u) => {
        try {
            const useRef = doc(collection(db, 'users'), u.id);
            await deleteDoc(useRef);
        } catch (e) {
            console.error("Erro: ", e);
        }
    },
    editUser: async (u) => {
        try {
            const useRef = doc(collection(db, 'users'), u.id);
            await updateDoc(useRef, u)
        } catch (e) {
            console.error("Erro: ", e);
        }
    },
    getContactList: async (userId) => {
        try {
            const userRef = collection(db, 'users');
            const q = query(userRef, where(documentId(), '!=', userId));

            let list = [];
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    name: doc.data().name,
                    avatar: doc.data().avatar
                })
            });

            return list;
        } catch (e) {
            console.error("Erro: ", e);
        }
    },
    addNewChat: async (user, chatUser) => {
        try {
            let newChat = await addDoc(collection(db, 'chats'), {
                message: [],
                users: [user.id, chatUser.id]
            });

            const userRef = doc(db, 'users', user.id);
            await updateDoc(userRef, {
                chats: arrayUnion({
                    chatId: newChat.id,
                    title: chatUser.name,
                    image: chatUser.avatar,
                    with: chatUser.id
                })
            });

            const chatUserRef = doc(db, 'users', chatUser.id);
            await updateDoc(chatUserRef, {
                chats: arrayUnion({
                    chatId: newChat.id,
                    title: user.name,
                    image: user.avatar,
                    with: user.id
                })
            });
        } catch (e) {
            console.error("Erro: ", e);
        }

    },
    onChatList: (userID, setChatList) => {
        const unsub = onSnapshot(doc(db, "users", userID), (doc) => {
            if (doc.exists) {
                let data = doc.data();
                if (data.chats) {
                    setChatList(data.chats);
                }
            }
        });
    }
}