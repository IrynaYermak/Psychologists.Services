import "./App.css";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./Header/Header";
import Modal from "./Modal/Modal";
import Auth from "./Auth/Auth";
import type { AuthMode } from "../types/authMode";
import { useAuthStore } from "../store/authStore";

function App() {
  useAuth();
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  console.log("user", user);
  const [authMode, setAuthMode] = useState<AuthMode>(null);

  return (
    <>
      {loading && <div className="loading">Loading...</div>}

      <Header onOpen={setAuthMode} />
      <main>
        <Outlet />
        <Toaster />
      </main>
      {authMode && (
        <Modal onClose={() => setAuthMode(null)}>
          <Auth mode={authMode} onClose={() => setAuthMode(null)} />
        </Modal>
      )}
    </>
  );
}

export default App;
