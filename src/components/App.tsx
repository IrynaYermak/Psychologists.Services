import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Modal from "./Modal/Modal";

import { useState } from "react";
import Auth from "./Auth/Auth";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header onLoginClick={openModal} />
      <main>
        <Outlet />
      </main>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <Auth />
        </Modal>
      )}
    </>
  );
}

export default App;
