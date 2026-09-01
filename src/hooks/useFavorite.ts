import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFavorites } from "../services/favoriteServise";
import { useAuthStore } from "../store/authStore";
import type Psychologist from "../types/psychologist";
import toast from "react-hot-toast";

export const useFavorite = () => {
  const { user, setUser } = useAuthStore();
  const queryClient = useQueryClient();

  const { mutate: mutateFavorites, isPending } = useMutation({
    mutationFn: ({ uid, favorites }: { uid: string; favorites: string[] }) =>
      updateFavorites(uid, favorites),

    onSuccess: (_, variables) => {
      if (!user) return;

      setUser({
        ...user,
        favorites: variables.favorites,
      });

      queryClient.invalidateQueries({
        queryKey: ["favorites", user.uid],
      });
    },
  });

  const handleFavorite = (psychologist: Psychologist) => {
    if (!user) {
      toast.error("Please log in first");
      return;
    }

    const favorites = user.favorites ?? [];

    const isFavorite = favorites.includes(psychologist.id);

    const newFavorites = isFavorite
      ? favorites.filter((id) => id !== psychologist.id)
      : [...favorites, psychologist.id];

    mutateFavorites({
      uid: user.uid,
      favorites: newFavorites,
    });
  };

  return {
    handleFavorite,
    isPending,
  };
};
