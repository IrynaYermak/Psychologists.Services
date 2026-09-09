import style from "./EyeButton.module.css";

interface EyeButtonProps {
  showPassword: boolean;
  onToggle: () => void;
}

export default function EyeButton({ showPassword, onToggle }: EyeButtonProps) {
  return (
    <button
      className={style.eyeButton}
      type="button"
      onClick={onToggle}
      aria-label={showPassword ? "Show password" : "Hide password"}
    >
      <svg width={20} height={20} className={style.eye}>
        <use
          href={
            showPassword
              ? "/icons/sprite.svg#icon-eye"
              : "/icons/sprite.svg#icon-eye-off"
          }
        />
      </svg>
    </button>
  );
}
