import Button from "react-bootstrap/Button";

export default function ButtonField({
  label,
  handleClick = () => {},
  className = "",
  isSubmit = false,
  isOutline = false,
}) {
  return (
    <Button
      type={isSubmit? "submit" : "button"}
      className={className}
      variant={`${isOutline ? "outline-" : ""}primary`}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
}
