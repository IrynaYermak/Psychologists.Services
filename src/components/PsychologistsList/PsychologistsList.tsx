import type Psychologist from "../../types/psychologist";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import style from "./PsychologistsList.module.css";

interface PsychologistsListProps {
  psychologists: Psychologist[];
}

export default function PsychologistsList({
  psychologists,
}: PsychologistsListProps) {
  return (
    <ul className={style.psychologistsList}>
      {psychologists.map((psychologist) => (
        <PsychologistCard key={psychologist.name} psychologist={psychologist} />
      ))}
    </ul>
  );
}
