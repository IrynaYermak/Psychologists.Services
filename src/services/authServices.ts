import auth from "../firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import type authData from "../types/authData";

export const register = async ({ email, password, name }: authData) => {
  try {
    const resault = await createUserWithEmailAndPassword(auth, email, password);

    if (resault.user) {
      await updateProfile(resault.user, {
        displayName: name,
      });
    }
    const user = resault.user;
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const login = async ({ email, password }: authData) => {
  try {
    const resault = await signInWithEmailAndPassword(auth, email, password);
    const user = resault.user;
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
