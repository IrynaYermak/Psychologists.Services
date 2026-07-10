import css from "./Button.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";

interface BaseButtonProps {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "" | "medium" | "large";
  text?: string;
  "aria-label"?: string;
  className?: string;
  disabled?: boolean;
}

interface ButtonElementProps extends BaseButtonProps {
  type?: "button" | "submit";
  onClick?: () => void;
  to?: never;
}

interface LinkElementProps extends BaseButtonProps {
  to: string;
  type?: never;
  onClick?: never;
}

type ButtonProps = ButtonElementProps | LinkElementProps;

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "", text } = props;
  const className = clsx(css.button, css[variant], css[size], props.className);

  if ("to" in props) {
    return (
      <Link to={props.to} className={className}>
        {text}
        {props.children}
      </Link>
    );
  }

  return (
    <button type={props.type} className={className} onClick={props.onClick}>
      {text}
      {props.children}
    </button>
  );
}
