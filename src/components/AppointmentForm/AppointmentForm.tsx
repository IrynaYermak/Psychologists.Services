import type Psychologist from "../../types/psychologist";
import Button from "../Button/Button";
import style from "./AppointmentForm.module.css";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface AppointmentFormProp {
  psychologist: Psychologist;
}

const schema = z.object({
  name: z
    .string("Name is required!")
    .trim()
    .min(1, "Please enter your name.")
    .min(2, "Name must contain at least 2 characters.")
    .max(30, "Name must be no longer than 30 characters."),
  number: z
    .string()
    .trim()
    .min(1, "Please enter your phone number.")
    .regex(
      /^\+\d{10,15}$/,
      "Phone number must start with + and contain 10–15 digits."
    ),
  time: z
    .string()
    .min(1, "Please select an appointment time.")
    .refine((time) => time >= "09:00" && time <= "18:00", {
      message: "Please choose a time between 09:00 and 18:00.",
    }),
  email: z
    .email("Please enter a valid email address.")
    .trim()
    .min(1, "Please enter your email."),
  comment: z
    .string()
    .trim()
    .min(1, "Please tell us what you'd like to discuss.")
    .max(300, "Comment cannot exceed 300 characters."),
});

type FormFields = z.infer<typeof schema>;

export default function AppointmentForm({ psychologist }: AppointmentFormProp) {
  const { avatar_url, name } = psychologist;
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      number: "",
      time: "",
      email: "",
      comment: "",
    },
    resolver: zodResolver(schema),
  });
  return (
    <section className={style.appointmentForm}>
      <div className={style.titleBlock}>
        <h2 className={style.title}>
          Make an appointment
          <br /> with a psychologists
        </h2>
        <p>
          You are on the verge of changing your life for the better. Fill
          <br />
          out the short form below to book your personal appointment
          <br /> with a professional psychologist. We guarantee confidentiality
          <br />
          and respect for your privacy.
        </p>
      </div>
      <div className={style.doctorInfoBlock}>
        <div className={style.photoBox}>
          <img
            src={avatar_url}
            alt="Psychologist photo"
            className={style.photo}
          />
        </div>
        <div className={style.nameBlock}>
          <p className={style.sign}>Your psychologists</p>
          <p className={style.name}>{name}</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
        className={style.form}
      >
        <input {...register("name")} type="text" placeholder="Name" />
        {errors.name && <div>{errors.name.message}</div>}
        <div className={style.formGroup}>
          <input
            {...register("number")}
            className={style.smallInput}
            type="tel"
            placeholder="+380"
          />

          <input
            {...register("time")}
            className={style.smallInput}
            type="time"
            min="09:00"
            max="18:00"
            step={1800}
          />
        </div>

        <input {...register("email")} type="email" placeholder="Email" />
        {errors.email && <div>{errors.email.message}</div>}
        <textarea
          {...register("comment")}
          className={style.input}
          placeholder="Comment"
          rows={4}
          cols={40}
        />
        {errors.comment && <div>{errors.comment.message}</div>}
        <Button disabled={isSubmitting} type="submit" text="Send" />
      </form>
    </section>
  );
}
