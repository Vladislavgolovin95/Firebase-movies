import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, setDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy, updateDoc, } from "firebase/firestore"; 

export class Firebase {
  constructor() {
    this.firebaseConfig = {
      apiKey: "AIzaSyAPp44x2oUMzBzXB85z-LOGrxosd-I5R30",
      authDomain: "movisapp-908fe.firebaseapp.com",
      projectId: "movisapp-908fe",
      storageBucket: "movisapp-908fe.appspot.com",
      messagingSenderId: "358984601710",
      appId: "1:358984601710:web:940baa24f8d4178cad967f"
    };
    this.key = "movies";
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async push(movie) {
    try {
      await setDoc(doc(this.db, this.key, movie.id), {
        title: movie.title,
        viewed: movie.viewed,
        id: movie.id,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async pull() {
    const ref = collection(this.db, this.key);
    const q = query(ref, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const movies = [];
    querySnapshot.forEach((doc) => {
      movies.push({
        title: doc.data().title,
        viewed: doc.data().viewed,
        id: doc.data().id,
      });
    });
    return movies;
  }

  async delete(id) {
    await deleteDoc(doc(this.db, this.key, id));
  }

  async update(id, statusMovie) {
    const ref = doc(this.db, this.key, id);

    await updateDoc(ref, {
      viewed: statusMovie,
    });
  }
}