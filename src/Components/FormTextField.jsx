import Form from "react-bootstrap/Form";

export default function FormTextField({
  fieldId,
  label,
  value,
  msg,
  required = false,
  handleChange = () => {},
  handleBlur = () => {},
}) {
  const onChange = (event) => {
    const {name, value} = event.target
    handleChange({field: name, value: value})
  }

  return (
    <div className="form-text-field">
      <Form.Label htmlFor={fieldId}>{label}{required && <sup>*</sup>}</Form.Label>
      <Form.Control
        id={fieldId}
        name={fieldId}
        className={msg? " error-input" : ""}
        placeholder={`Enter your ${label.toLowerCase()}`}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        isInvalid={!!msg}
      />
      <Form.Text id={`${fieldId}HelpBlock`} className="error-msg">
        {msg}
      </Form.Text>
    </div>
  );
}
