import style from "./LoginForm.module.css";
import type authData from "../../types/authData";

interface LoginFormProps {
  onLogin: (data: authData) => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const handleSubmit = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    onLogin({ email, password });
  };
  return (
    <form className={style.form} action={handleSubmit}>
      <div className={style.inputGroup}>
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
