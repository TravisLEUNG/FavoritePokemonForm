import { useState, useEffect } from "react";
import { _hyphen2Label, _camel2Label } from "../Tools/StringCaseTransformation";
import _ from "lodash";
import Alert from "react-bootstrap/Alert";

import FormTextField from "../Components/FormTextField";
import FormSelectionField from "../Components/FormSelectionField";
import ButtonField from "../Components/ButtonField";
import TableView from "../Components/TableView";

import { contentData } from "../Data/FormContentData";

const validation = (format, value) => (!_.isEmpty(value) && format.test(value));
const objectValueUpdate = (prevObj, index, value) => ({
  ...prevObj,
  [index]: value,
});

export default function FormContent(props) {
  const [pokemonList, setPokemonList] = useState([]);
  const [fieldInputs, setFieldInputs] = useState(
    () =>
      props.data || {
        FirstName: "",
        LastName: "",
        PhoneNumber: "+",
        EmailAddress: "",
        FavoritePokemon: {},
      }
  );
  const [pokemonDetails, setPokemonDetails] = useState({
    name: "",
    abilities: [],
    height: "0",
    weight: "0",
    types: [],
  });
  const [hasAlert, setHasAlert] = useState(false);
  const [fieldErrorMsg, setFieldErrorMsg] = useState({});
  useEffect(() => {
    async function getPokemon() {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154"
      );
      const data = await res.json();
      setPokemonList(
        data.results.map((item) => ({
          label: _hyphen2Label(item.name),
          value: item.name,
          url: item.url,
        }))
      );
    }
    getPokemon();
  }, []);

  useEffect(() => {
    props.onDataChange(fieldInputs);

    async function getPokemonDetail() {
      const res = await fetch(fieldInputs["FavoritePokemon"].url);
      const { name, abilities, height, weight, types } = await res.json();
      setPokemonDetails({ name, abilities, height, weight, types });
    }
    getPokemonDetail();
  }, [props, fieldInputs]);

  /* Supporting Func */
  const validInput = (field, value) => {
    setFieldInputs((prevFieldInputs) =>
      objectValueUpdate(prevFieldInputs, field, value)
    );
    setFieldErrorMsg((prevFieldErrorMsg) =>
      objectValueUpdate(prevFieldErrorMsg, field, "")
    );
  };
  const invalidInput = (field, errorMsg) => {
    setFieldErrorMsg((prevFieldErrorMsg) =>
      objectValueUpdate(prevFieldErrorMsg, field, errorMsg)
    );
  };

  /* Event Func */
  const onChange = ({ field, value }) => {
    if (validation(contentData[field].format, value)) {
      validInput(field, value);
    } else {
      invalidInput(field, contentData[field].errorMsg);
    }
  };

  const onSelect = ({ field, option }) => {
    if (validation(contentData[field].format, option.value)) {
      validInput(field, option);
    } else {
      invalidInput(field, contentData[field].errorMsg);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    for (const [field, value] of Object.entries(fieldInputs)) {
      const checkingValue = _.isEqual(field, "FavoritePokemon")
        ? value.value
        : value;
      if (
        _.isEmpty(checkingValue) ||
        !validation(contentData[field].format, checkingValue)
      ) {
        setHasAlert(true);
        setTimeout(() => {
          setHasAlert(false);
        }, 2000);
        return false;
      }
    }
    props.handleViewChange("Review");
  }

  /* Data formatting */
  const propsList = Object.keys(contentData).reduce((obj, field) => {
    obj[field + "Props"] = {
      ...contentData[field],
      label: _camel2Label(contentData[field].fieldId),
      handleChange: onChange,
      msg: fieldErrorMsg[field],
      value: fieldInputs[field],
    };
    return obj;
  }, {});
  const pokemonDetailRows = [
    { header: "Pokemon", data: _hyphen2Label(pokemonDetails.name) },
    {
      header: "Abilities",
      data: pokemonDetails.abilities
        .map((a) => _hyphen2Label(a.ability.name))
        .join(", "),
    },
    { header: "Height", data: `${pokemonDetails.height} m` },
    { header: "Weight", data: `${pokemonDetails.weight} kg` },
    {
      header: "Types",
      data: pokemonDetails.types
        .map((t) => _hyphen2Label(t.type.name))
        .join(", "),
    },
  ];

  return (
    <form
      className="form-content"
    >
      <Alert
        className="form-content_alert"
        key="FormIncomplete"
        variant="danger"
        show={hasAlert}
      >
        Form is not completed yet!
      </Alert>

      <h3>Let us know your Favorite Pokemon !</h3>
      <p>Fill in the form and share you pokemon preferences.</p>

      <div className="form-content_input">
        {/* Name input field */}
        <FormTextField {...propsList["FirstNameProps"]} />
        <FormTextField {...propsList["LastNameProps"]} />
        {/* Phone number input field */}
        <FormTextField {...propsList["PhoneNumberProps"]} />
        {/* Email address input field */}
        <FormTextField {...propsList["EmailAddressProps"]} />
        {/* Favorite Pokemon selection field */}
        <FormSelectionField
          {...propsList["FavoritePokemonProps"]}
          optionList={pokemonList}
          handleChange={onSelect}
        />
        <TableView rowList={pokemonDetailRows} />
      </div>

      <div className="d-grid gap-3 form-content_button">
        <ButtonField
          label="Next"
          isSubmit
          handleClick={onSubmit}
        />
      </div>
    </form>
  );
}
