import auth from "../firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import type authData from "../types/authData";
import { saveUser, getUser } from "./userService";

export const register = async ({ email, password, name }: authData) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  if (result.user) {
    await updateProfile(result.user, {
      displayName: name,
    });
  }
  const user = result.user;

  await saveUser({
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    favorites: [],
  });

  return user;
};

export const login = async ({ email, password }: authData) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const user = result.user;

  await getUser(user.uid);

  return user;
};

export const logout = async () => {
  await signOut(auth);
};
