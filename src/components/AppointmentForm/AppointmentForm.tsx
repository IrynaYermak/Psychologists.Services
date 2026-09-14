import type Psychologist from "../../types/psychologist";
import Button from "../Button/Button";
import style from "./AppointmentForm.module.css";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css";
import { registerLocale } from "react-datepicker";
import { enGB } from "date-fns/locale/en-GB";
import toast from "react-hot-toast";

registerLocale("en-GB", enGB);

interface AppointmentFormProp {
  psychologist: Psychologist;
  onSuccess: () => void;
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
    .date()
    .min(1, "Please select an appointment time.")
    .refine(
      (time) => {
        const hours = time.getHours();
        return hours >= 9 && hours < 18;
      },
      {
        message: "Please choose a time between 09:00 and 18:00.",
      }
    ),
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

export default function AppointmentForm({
  psychologist,
  onSuccess,
}: AppointmentFormProp) {
  const { avatar_url, name } = psychologist;
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      number: "",
      time: null,
      email: "",
      comment: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
      toast.success("Appointment booked successfully!");

      reset();
      onSuccess();
    } catch {
      toast.error("Something went wrong.");
    }
  };
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
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          autoComplete="name"
        />
        {errors.name && <p className={style.error}>{errors.name.message}</p>}
        <div className={style.formGroup}>
          <div className={style.wrapBlock}>
            <input
              {...register("number")}
              className={style.smallInput}
              type="tel"
              autoComplete="tel"
              placeholder="+380"
            />
            {errors.number && (
              <p className={style.error}>{errors.number.message}</p>
            )}
          </div>

          <div className={style.wrapBlock}>
            <div className={style.timeInputBox}>
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    showPopperArrow={false}
                    timeCaption="Meeting time"
                    dateFormat="HH:mm"
                    minTime={new Date().setHours(9, 0)} // 09:00
                    maxTime={new Date().setHours(18, 0)} // 18:00
                    className={style.smallInput}
                    placeholderText="00:00"
                    locale="en-GB"
                  />
                )}
              />
              <svg className={style.clockIcon} aria-hidden="true">
                <use href="/icons/sprite.svg#icon-clock" />
              </svg>
            </div>
            {errors.time && (
              <p className={style.error}>{errors.time.message}</p>
            )}
          </div>
        </div>

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          autoComplete="email"
        />
        {errors.email && <p className={style.error}>{errors.email.message}</p>}
        <textarea
          {...register("comment")}
          className={style.input}
          placeholder="Comment"
          rows={4}
          cols={40}
        />
        {errors.comment && (
          <p className={style.error}>{errors.comment.message}</p>
        )}
        <Button disabled={isSubmitting} type="submit" text="Send" />
      </form>
    </section>
  );
}
