import auth from "../firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
// import database from "../firebase/database";
import type authData from "../types/authData";
// import { ref, set } from "firebase/database";
import { saveUser, getUser } from "./userService";
import { FirebaseError } from "firebase/app";

export const register = async ({ email, password, name }: authData) => {
  console.log("REGISTER START");
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (result.user) {
      await updateProfile(result.user, {
        displayName: name,
      });
    }
    const user = result.user;
    // const userRef = ref(database, `users/${user.uid}`);

    // await set(userRef, {
    //   uid: user.uid,
    //   email: user.email,
    //   name: user.displayName,
    //   favorites: [],
    // });

    await saveUser({
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      favorites: [],
    });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const login = async ({ email, password }: authData) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    await getUser(user.uid);

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
