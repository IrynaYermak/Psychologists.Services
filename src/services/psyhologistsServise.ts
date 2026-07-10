import database from "../firebase/database";
import { ref, get } from "firebase/database";

export const getPsychologists = async () => {
  const snapshot = await get(ref(database, "psychologists"));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return [];
  }
};
