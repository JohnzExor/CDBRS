import { Firebase } from "@/lib/types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { create } from "zustand";
import { auth, db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "@/components/ui/use-toast";

export const useFirebaseServices = create<Firebase>((set) => ({
  userData: [],
  driverData: [],
  currentDriverUid: "",

  signIn: async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((e) => console.log(e))
      .catch((e) => console.error(e));
  },

  signUp: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const uid = userCredentials.user.uid;
        setDoc(doc(db, "users", uid), {
          uid: uid,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        });
        console.log(userCredentials);
      })
      .catch((e) => console.error(e));
  },

  signOut: async () => {
    signOut(auth);
  },

  driverRegistration: async (
    fullName: string,
    licenseNo: string,
    plateNo: string,
    uid: string
  ) => {
    await setDoc(doc(db, "drivers", uid), {
      behavioralScore: "5000",
      fullName: fullName,
      email: auth.currentUser?.email,
      licenseNo: licenseNo,
      plateNo: plateNo,
      uid: uid,
      reportTimes: "0",
      violations: "0",
      accidents: "0",
    }).then(() =>
      updateDoc(doc(db, "users", uid), {
        status: "driver",
      }).then(() => toast({ description: "You are now a driver!" }))
    );
  },

  getUserData: async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      if (postData.uid === auth.currentUser?.uid) {
        set({ userData: postData });
      }
    });
  },
  getDriverData: async (uid: string) => {
    const querySnapshot = await getDocs(collection(db, "drivers"));

    querySnapshot.forEach((doc) => {
      const postData = doc.data();
      if (postData.uid === uid) {
        set({ driverData: postData });
      }
    });
  },

  setCurrentDriverUid: (uid: string) => {
    set({ currentDriverUid: uid });
  },
}));
