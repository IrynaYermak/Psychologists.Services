import style from "./RegisterForm.module.css";
import type authData from "../../types/authData";

interface RegisterFormProps {
  onRegister: (data: authData) => void;
}

export default function RegisterForm({ onRegister }: RegisterFormProps) {
  const handleSubmit = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    onRegister({ name, email, password });
  };
  return (
    <form className={style.form} action={handleSubmit}>
      <div className={style.inputGroup}>
        <input
          className={style.input}
          type="text"
          placeholder="Name"
          name="name"
        />
        <input
          className={style.input}
          type="email"
          placeholder="Email"
          name="email"
        />
        <input
          className={style.input}
          type="password"
          placeholder="Password"
          name="password"
        />
      </div>
      {/* <svg width={20} height={20} fill="var(--text)">
          <use href="/icons/sprite.svg#icon-eye" />
        </svg>
        <svg width={20} height={20} fill="var(--text)">
          <use href="/icons/sprite.svg#icon-eye-off" />
        </svg> */}
    </form>
  );
}
