import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Modal from "./Modal";

import { useState } from "react";

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
      <Header />
      <main>
        <Outlet />
      </main>
      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
}

export default App;
