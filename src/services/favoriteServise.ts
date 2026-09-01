import { ref, get, update } from "firebase/database";
import database from "../firebase/database";
import { getPsychologists } from "./psychologistsServise";
import type { Filter } from "../types/filter";

export const getFavorites = async (userId: string, filter?: Filter) => {
  if (!userId) return [];
  const favoritesRef = ref(database, `users/${userId}/favorites`);
  const snapshot = await get(favoritesRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    const favoritesIds = Array.isArray(data) ? data : Object.values(data);
    const allPsychologists = await getPsychologists(filter || { sortBy: "" });
    return allPsychologists.filter((psychologist) =>
      favoritesIds.includes(psychologist.id)
    );
  } else {
    return [];
  }
};

export const updateFavorites = async (uid: string, favorites: string[]) => {
  await update(ref(database, `users/${uid}`), { favorites });
  return favorites;
};
