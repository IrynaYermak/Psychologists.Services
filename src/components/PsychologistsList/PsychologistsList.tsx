import type Psychologist from "../../types/psychologist";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import style from "./PsychologistsList.module.css";

interface PsychologistsListProps {
  psychologists: Psychologist[];
  onAppointment: (psychologist: Psychologist) => void;
}

export default function PsychologistsList({
  psychologists,
  onAppointment,
}: PsychologistsListProps) {
  return (
    <ul className={style.psychologistsList}>
      {psychologists.map((psychologist) => (
        <PsychologistCard
          key={psychologist.name}
          psychologist={psychologist}
          onAppointment={onAppointment}
        />
      ))}
    </ul>
  );
}
