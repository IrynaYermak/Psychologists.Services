import style from "./AuthContent.module.css";
// import { useState } from "react";

interface AuthContentProps {
  formType: string;
}
export default function AuthContent({ formType }: AuthContentProps) {
  if (formType === "register") {
    return (
      <div>
        <h2 className={style.title}>Registration</h2>
        <p className={style.text}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us <br /> with the following
          information.
        </p>
      </div>
    );
  }
  return (
    <div>
      <h2 className={style.title}>Log In</h2>
      <p className={style.text}>
        Welcome back! Please enter your credentials to access <br /> your
        account and continue your search for a <br /> psychologist.
      </p>
    </div>
  );
}
