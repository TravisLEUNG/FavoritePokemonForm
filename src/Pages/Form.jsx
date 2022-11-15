import { useState } from "react";
import _ from "lodash";
import formImage from "../Assets/form-image.jpg";

import FormContent from "../Layouts/FormContent";
import FormImage from "../Layouts/FormImage";
import FormReview from "../Layouts/FormReview";

export default function Form(props) {
  const [formContent, setFormContent] = useState("Content");

  const handleViewChange = (formContentName) => {
    setFormContent(_.isEqual(formContentName, "Review") ? "Review" : "Content");
  };
  return (
    <section className="form">
      <FormImage formImage={formImage} />
      {_.isEqual(formContent, "Review") ? (
        <FormReview
          data={props.data}
          handleSubmit={props.clickAction}
          handleViewChange={handleViewChange}
        />
      ) : (
        <FormContent
          data={props.data}
          onDataChange={props.onDataChange}
          handleViewChange={handleViewChange}
        />
      )}
    </section>
  );
}
