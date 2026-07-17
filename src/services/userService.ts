import type UserData from "../types/userData";
import database from "../firebase/database";
import { ref, set, get, update } from "firebase/database";

export const saveUser = async (user: UserData) => {
  await set(ref(database, `users/${user.uid}`), user);
};

export const getUser = async (uid: string): Promise<UserData | null> => {
  const pers = await get(ref(database, `users/${uid}`));

  if (!pers.exists()) {
    return null;
  }

  return pers.val() as UserData;
};

export const updateFavorites = async (uid: string, favorites: string[]) => {
  await update(ref(database, `users/${uid}`), { favorites });
};
