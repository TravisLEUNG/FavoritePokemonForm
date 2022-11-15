import { useState, useEffect } from "react";
import _ from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";

import Form from "../Pages/Form";
import Success from "../Pages/Success";

const localStorageKey = "PokemonData";

export default function Main() {
  const [pageContent, setPageContent] = useState("Form");
  const [data, setData] = useState(() =>
    JSON.parse(localStorage.getItem(localStorageKey))
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }, [data]);

  const handlePageChange = (pageName) => {
    setPageContent(_.isEqual(pageName, "Success") ? "Success" : "Form");
  };

  const handleDataChange = (newData) => {
    if (!_.isEqual(newData, data)) setData(newData);
  };

  return (
    <main className="main">
      {_.isEqual(pageContent, "Success") ? (
        <Success data={data} />
      ) : (
        <Form
          data={data}
          clickAction={handlePageChange}
          onDataChange={handleDataChange}
        />
      )}
    </main>
  );
}
