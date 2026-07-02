import style from "./LoginForm.module.css";
import type AuthData from "../../types/authData";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button/Button";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

type FormFields = z.infer<typeof schema>;

interface LoginFormProps {
  onLogin: (data: AuthData) => void;
  onSuccess: () => void;
}

export default function LoginForm({ onLogin, onSuccess }: LoginFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await onLogin(data);
      toast.success("Welcome back!");
      console.log(data);
      reset();
      onSuccess();
    } catch {
      setError("root", { message: "Wrong credentials" });
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.inputGroup}>
        <input
          {...register("email")}
          className={style.input}
          type="email"
          placeholder="Email"
        />
        {errors.email && <div>{errors.email.message}</div>}
        <input
          {...register("password")}
          className={style.input}
          type="password"
          placeholder="Password"
        />
        {errors.password && <div>{errors.password.message}</div>}
      </div>

      <Button
        disabled={isSubmitting}
        className={style.submitButton}
        type="submit"
        text={isSubmitting ? "Loading..." : "Log In"}
      />
      {errors.root && <div>{errors.root.message}</div>}
      {/* <svg width={20} height={20} fill="var(--text)">
          <use href="/icons/sprite.svg#icon-eye" />
        </svg>
        <svg width={20} height={20} fill="var(--text)">
          <use href="/icons/sprite.svg#icon-eye-off" />
        </svg> */}
    </form>
  );
}
