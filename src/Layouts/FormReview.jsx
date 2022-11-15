import _ from "lodash";
import { _hyphen2Label, _camel2Label } from "../Tools/StringCaseTransformation";
import Table from "react-bootstrap/Table";
import ButtonField from "../Components/ButtonField";

export default function FormReview(props) {
  let tableRow = [];
  for (const [field, value] of Object.entries(props.data)) {
    if (_.isObject(value)) {
      tableRow.push(
        <tr key={field}>
          <th>{_camel2Label(field)}</th>
          <td data-testid={`data-${field}`}>{_hyphen2Label(value.value || "")}</td>
        </tr>
      );
    } else {
      tableRow.push(
        <tr key={field}>
          <th>{_camel2Label(field)}</th>
          <td data-testid={`data-${field}`}>{value || ""}</td>
        </tr>
      );
    }
  }
  return (
    <div className="form-review">
      <h3>Review</h3>
      <p>Please double check the information.</p>
      <Table className="form-review_content">
        <tbody>{tableRow}</tbody>
      </Table>
      <div className="d-grid gap-3 form-review_button">
        <ButtonField
          label="Back"
          handleClick={() => props.handleViewChange("Content")}
          isOutline
        />
        <ButtonField isSubmit label="Submit" handleClick={() => props.handleSubmit("Success")}/>
      </div>
    </div>
  );
}
