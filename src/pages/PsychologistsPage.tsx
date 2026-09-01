import PsychologistsList from "../components/PsychologistsList/PsychologistsList";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPsychologists } from "../services/psychologistsServise";
import style from "../components/PsyhologistPage.module.css";
import Button from "../components/Button/Button";
import FilterBar from "../components/FilterBar/FilterBar";
import Modal from "../components/Modal/Modal";
import AppointmentForm from "../components/AppointmentForm/AppointmentForm";
import useAppointmentModal from "../hooks/useAppointmentModal";
import { Loader } from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { usePsychologistLoad } from "../hooks/usePsychologistLoad";

export default function PsychologistsPage() {
  const { filter, visibleCount, handleFilterChange, handleLoadMore } =
    usePsychologistLoad();
  const {
    isModalOpen,
    openAppointmentModal,
    closeModal,
    selectedPsychologist,
  } = useAppointmentModal();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["psychologists", filter.sortBy],
    queryFn: () => getPsychologists(filter),
    placeholderData: keepPreviousData,
  });

  const allPsychologists = data ?? [];
  const visiblePsychologists = allPsychologists.slice(0, visibleCount);

  if (isLoading) {
    return (
      <section className={`container ${style.psychologistsPage}`}>
        <Loader />
      </section>
    );
  }

  if (isError) {
    return (
      <section className={`container ${style.psychologistsPage}`}>
        <ErrorMessage
          title="Unable to load psychologists"
          description="Please refresh the page."
        />
      </section>
    );
  }

  return (
    <section className={`container ${style.psychologistsPage}`}>
      <FilterBar value={filter.sortBy} onChange={handleFilterChange} />

      <div className={style.listWrapper}>
        <PsychologistsList
          psychologists={visiblePsychologists}
          onAppointment={openAppointmentModal}
        />

        {isFetching && allPsychologists.length > 0 && (
          <div className={style.overlay}>
            <Loader />
          </div>
        )}
      </div>

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
          <AppointmentForm
            psychologist={selectedPsychologist}
            onSuccess={closeModal}
          />
        </Modal>
      )}
    </section>
  );
}
