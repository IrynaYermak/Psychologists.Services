import { register, login } from "../../services/authServices";
import AuthContent from "../AuthContent/AuthContent";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import type { AuthMode } from "../../types/authMode";
import style from "./Auth.module.css";

interface AuthProps {
  mode: AuthMode;
  onClose: () => void;
}

export default function Auth({ mode, onClose }: AuthProps) {
  return (
    <div className={style.formContainer}>
      <AuthContent mode={mode} />
      {mode === "login" ? (
        <LoginForm onLogin={login} onSuccess={onClose} />
      ) : (
        <RegisterForm onRegister={register} onSuccess={onClose} />
      )}
    </div>
  );
}
