import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/auth";
import { useAuthStore } from "../store/authStore";
import { getUser } from "../services/userService";

export default function useAuth() {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const user = await getUser(firebaseUser.uid);
        setUser(user);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [setUser, setLoading]);
}
