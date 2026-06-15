import { createPortal } from "react-dom";
import style from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {
  return createPortal(
    <div className={style.backdrop}>
      <div className={style.modal}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className={style.closeButton}
        >
          <svg width={32} height={32} fill="var(--text)">
            <use href="/icons/sprite.svg#icon-close" />
          </svg>
        </button>
        <h1>Modal</h1>
      </div>
    </div>,
    document.body
  );
}

// className={style.backdrop}
