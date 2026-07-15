import PsyhologistsList from "../components/PsyhologistsList/PsyhologistsList";
import { useQuery } from "@tanstack/react-query";
import { getPsychologists } from "../services/psyhologistsServise";
import style from "../components/PsyhologistPage.module.css";
import Button from "../components/Button/Button";
import FilterBar from "../components/FilterBar/FilterBar";

export default function PsychologistsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["psychologists"],
    queryFn: getPsychologists,
  });
  const psychologists = data || [];
  console.log(psychologists);
  return (
    <section className={`container ${style.psychologistsPage}`}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading psychologists</p>}
      <FilterBar />
      <PsyhologistsList psyhologists={psychologists} />
      <Button
        text="Load more"
        size="medium"
        variant="primary"
        aria-label="Load more psychologists"
        onClick={() => console.log("Load more clicked")}
      />
    </section>
  );
}
