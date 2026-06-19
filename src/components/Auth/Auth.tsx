// import useState from "react";
import AuthContent from "../AuthContent/AuthContent";
import style from "./Auth.module.css";
import Button from "../Button/Button";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

export default function Auth() {
  //   const [isRegister, setIsRegister] = useState(false);

  //   const formType = isRegister ? "login" : "register";
  const isRegister = true;
  const formType = "login";

  const register = async ({ email, password, name }: authData) => {
    console.log("name:", name, "email:", email, "password:", password);
  };
  const login = async ({ email, password }: authData) => {
    console.log("email:", email, "password:", password);
  };

  return (
    <div className={style.formContainer}>
      <AuthContent formType={formType} />
      {isRegister ? (
        <LoginForm onLogin={login} />
      ) : (
        <RegisterForm onRegister={register} />
      )}

      <Button
        className={style.submitButton}
        type="submit"
        text={isRegister ? "Log In" : "Register"}
      />
    </div>
  );
}
