import style from "./RegisterForm.module.css";
import type authData from "../../types/authData";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../Button/Button";
import toast from "react-hot-toast";
import { FirebaseError } from "firebase/app";
import getFirebaseError from "../../helpers/firebaseErrors";

interface RegisterFormProps {
  onRegister: (data: authData) => void;
  onSuccess: () => void;
}

const schema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

type FormFields = z.infer<typeof schema>;

export default function RegisterForm({
  onRegister,
  onSuccess,
}: RegisterFormProps) {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await onRegister(data);
      toast.success("Welcome to our services");
      reset();
      onSuccess();
    } catch (error) {
      const message =
        error instanceof FirebaseError
          ? getFirebaseError(error.code)
          : "Something went wrong!";

      toast.error(message);
      setError("root", { message: message });
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.inputGroup}>
        <input
          {...register("name")}
          className={style.input}
          type="text"
          placeholder="Name"
        />
        {errors.name && <div>{errors.name.message}</div>}
        <input
          {...register("email")}
          className={style.input}
          type="email"
          placeholder="Email"
        />
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
        text={isSubmitting ? "Loading..." : "Register"}
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
