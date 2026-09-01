import { useState } from "react";
import type Psychologist from "../types/psychologist";
import useModal from "./useModal";

export default function useAppointmentModal() {
  const { isModalOpen, openModal, closeModal } = useModal();

  const [selectedPsychologist, setSelectedPsychologist] =
    useState<Psychologist | null>(null);

  const openAppointmentModal = (psychologist: Psychologist) => {
    setSelectedPsychologist(psychologist);
    openModal();
  };

  return {
    isModalOpen,
    openAppointmentModal,
    closeModal,
    selectedPsychologist,
  };
}
