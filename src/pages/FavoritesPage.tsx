import FilterBar from "../components/FilterBar/FilterBar";
import PsychologistsList from "../components/PsychologistsList/PsychologistsList";
import AppointmentForm from "../components/AppointmentForm/AppointmentForm";
import Modal from "../components/Modal/Modal";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getFavorites } from "../services/favoriteServise";
import { Loader } from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Button from "../components/Button/Button";
import style from "../components/PsyhologistPage.module.css";
import useAppointmentModal from "../hooks/useAppointmentModal";
import { useAuthStore } from "../store/authStore";
import { usePsychologistLoad } from "../hooks/usePsychologistLoad";

export default function FavoritesPage() {
  const { user } = useAuthStore();
  const { filter, visibleCount, handleFilterChange, handleLoadMore } =
    usePsychologistLoad();
  const {
    isModalOpen,
    openAppointmentModal,
    closeModal,
    selectedPsychologist,
  } = useAppointmentModal();

  const {
    data: favoritePsychologists = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["favorites", user?.uid, filter?.sortBy],
    queryFn: () => getFavorites(user?.uid, filter),
    placeholderData: keepPreviousData,
    enabled: !!user?.uid,
    // запит виконується тільки коли юзер авторизований
  });

  const visiblePsychologists = favoritePsychologists.slice(0, visibleCount);

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
      </div>

      {visibleCount < favoritePsychologists.length && (
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
