import PsychologistsList from "../components/PsychologistsList/PsychologistsList";
import { useQuery } from "@tanstack/react-query";
import { getPsychologists } from "../services/psychologistsServise";
import style from "../components/PsyhologistPage.module.css";
import Button from "../components/Button/Button";
import FilterBar from "../components/FilterBar/FilterBar";
import { useState } from "react";
import type { Filter } from "../types/filter";
import type { SortType } from "../types/filter";
import type Psychologist from "../types/psychologist";
import Modal from "../components/Modal/Modal";
import AppointmentForm from "../components/AppointmentForm/AppointmentForm";
import useModal from "../hooks/useModal";

export default function PsychologistsPage() {
  const [filter, setFilter] = useState<Filter>({
    sortBy: "",
  });
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const { isModalOpen, closeModal, openModal } = useModal();
  const handleFilterChange = (value: SortType) => {
    setFilter({ sortBy: value });
    setVisibleCount(3);
  };
  const [selectedPsychologist, setSelectedPsychologist] =
    useState<Psychologist | null>(null);

  const openAppointmentModal = (psychologist: Psychologist) => {
    setSelectedPsychologist(psychologist);
    openModal();
  };
  console.log("selected", selectedPsychologist);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["psychologists", filter.sortBy],
    queryFn: () => getPsychologists(filter),
  });
  const allPsychologists = data || [];
  const visiblePsychologists = allPsychologists.slice(0, visibleCount);
  console.log(allPsychologists);
  return (
    <section className={`container ${style.psychologistsPage}`}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading psychologists</p>}
      <FilterBar value={filter.sortBy} onChange={handleFilterChange} />
      <PsychologistsList
        psychologists={visiblePsychologists}
        onAppointment={openAppointmentModal}
      />
      {visibleCount < allPsychologists.length && (
        <Button
          text="Load more"
          size="medium"
          variant="primary"
          aria-label="Load more psychologists"
          onClick={handleLoadMore}
        />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <AppointmentForm psychologist={selectedPsychologist} />
        </Modal>
      )}
    </section>
  );
}
