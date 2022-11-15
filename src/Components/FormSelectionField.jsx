import _ from "lodash";
import Form from "react-bootstrap/Form";
import Select from "react-select";

export default function FormSelectionField({
  fieldId,
  label,
  value,
  optionList,
  required = false,
  msg,
  handleChange = () => {},
  handleBlur = () => {},
}) {
  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles) => ({ ...styles, color: "black" }),
  };

  const onChange = (option) => {
    handleChange({field: fieldId, option})
  }

  return (
    <div className="form-selection-field">
      <Form.Label htmlFor={fieldId}>
        {label}
        {required && <sup>*</sup>}
      </Form.Label>
      <Select
        id={fieldId}
        name={fieldId}
        className={`basic-single${msg? " error-input" : ""}`}
        classNamePrefix="select"
        isSearchable
        styles={colorStyles}
        isLoading={_.isEmpty(optionList)}
        options={optionList}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
      />
      <Form.Text id={`${fieldId}HelpBlock`} className="error-msg">
        {msg}
      </Form.Text>
    </div>
  );
}
