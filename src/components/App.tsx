import "./App.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "./Header/Header";
import Modal from "./Modal/Modal";
import Auth from "./Auth/Auth";
import type { AuthMode } from "../types/authMode";

function App() {
  const [authMode, setAuthMode] = useState<AuthMode>(null);

  return (
    <>
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
