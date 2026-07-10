import type Psyhologist from "../../types/psyhologist";
import PsyhologistCard from "../PsyhologistCard/PsyhologistCard";
import style from "./PsyhologistsList.module.css";

interface PsyhologistsListProps {
  psyhologists: Psyhologist[];
}

export default function PsyhologistsList({
  psyhologists,
}: PsyhologistsListProps) {
  return (
    <ul className={style.psyhologistsList}>
      {psyhologists.map((psyhologist) => (
        <PsyhologistCard key={psyhologist.name} psyhologist={psyhologist} />
      ))}
    </ul>
  );
}
