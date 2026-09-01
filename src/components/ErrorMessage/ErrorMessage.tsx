interface ErrorMessageProps {
  title: string;
  description?: string;
}

export default function ErrorMessage({
  title,
  description,
}: ErrorMessageProps) {
  return (
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
