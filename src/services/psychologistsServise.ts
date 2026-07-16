import database from "../firebase/database";
import { ref, get } from "firebase/database";
import type { Filter } from "../types/filter";
import { sortPsychologists } from "./sortPsychologists";
import type Psychologist from "../types/psychologist";

export const getPsychologists = async (filter: Filter) => {
  console.log("FILTER", filter.sortBy);
  const snapshot = await get(ref(database, "psychologists"));
  if (snapshot.exists()) {
    const psychologists = Object.entries(snapshot.val()).map(
      ([id, psychologist]) => ({
        id,
        ...(psychologist as Omit<Psychologist, "id">),
      })
    );
    const sortedPsychologists = sortPsychologists(psychologists, filter.sortBy);

    return sortedPsychologists;
  } else {
    return [];
  }
};
