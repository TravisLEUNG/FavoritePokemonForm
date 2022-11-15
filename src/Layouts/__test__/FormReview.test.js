import { render, screen, cleanup } from "@testing-library/react";
import user from "@testing-library/user-event"
import renderer from "react-test-renderer";
import { _hyphen2Label } from "../../Tools/StringCaseTransformation";

import FormReview from "../FormReview";

const fakeData = {
  FirstName: "",
  LastName: "",
  PhoneNumber: "",
  EmailAddress: "",
  FavoritePokemon: {},
};
const fakeCompletedData = {
  FirstName: "Ultimate",
  LastName: "Hokon",
  PhoneNumber: "+19876543210",
  EmailAddress: "ultimate.hokon@gmail.com",
  FavoritePokemon: {
    label: "Venusaur",
    url: "https://pokeapi.co/api/v2/pokemon/3/",
    value: "venusaur",
  },
};
const fakeEvent = () => {};

describe("FormContent", () => {
  const onViewChange = jest.fn();
  const onSubmit = jest.fn();

  afterEach(() => {
    cleanup();
  });

  it("should render non-completed form data", () => {
    render(<FormReview data={fakeData} handleViewChange={fakeEvent} handleSubmit={fakeEvent}/>);

    for (const field in fakeData) {
      const fieldElement = screen.getByTestId(`data-${field}`);
      expect(fieldElement).toBeInTheDocument();
      expect(fieldElement).toBeEmptyDOMElement();
    }
  });

  it("should render completed form data", () => {
    const expectedValue = {
      ...fakeCompletedData,
      FavoritePokemon: _hyphen2Label(
        fakeCompletedData["FavoritePokemon"].value
      ),
    };

    render(
      <FormReview data={fakeCompletedData} handleViewChange={fakeEvent} handleSubmit={fakeEvent}/>
    );
    for (const field in expectedValue) {
      const fieldElement = screen.queryByTestId(`data-${field}`);
      expect(fieldElement).toBeInTheDocument();
      expect(fieldElement).toHaveTextContent(expectedValue[field]);
    }
  });

  it("Submit when click button", () => {
    render(<FormReview data={fakeData} handleViewChange={onViewChange} handleSubmit={onSubmit}/>);
    clickSubmitButton();
    expect(onViewChange).toHaveBeenCalledTimes(0);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("Back when click button", () => {
    render(<FormReview data={fakeData} handleViewChange={onViewChange}  handleSubmit={onSubmit}/>);
    clickBackButton();
    expect(onViewChange).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  test("Match snapshot", () => {
    const tree = renderer
      .create(<FormReview data={fakeCompletedData} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

function clickBackButton() {
  return user.click(screen.getByRole('button', { name: /Back/i }));
}
function clickSubmitButton() {
  return user.click(screen.getByRole('button', { name: /Submit/i }));
}