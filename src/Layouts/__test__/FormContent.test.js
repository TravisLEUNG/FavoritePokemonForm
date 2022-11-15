import { render, screen, cleanup, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event"
import renderer from "react-test-renderer"

import FormContent from "../FormContent";

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
describe('FormContent', () => {
  const onDataChange = jest.fn();
  const onViewChange = jest.fn();

  afterEach(() => {
    cleanup();
  });

  it('Go to Review page when all fields pass validation', async () => {
    render(<FormContent data={{...fakeData, FavoritePokemon: fakeCompletedData["FavoritePokemon"]}} onDataChange={onDataChange} handleViewChange={onViewChange}/>);

    // 1st step
    user.type(getPhoneNumber(), "+1");
    expect(onDataChange).toHaveBeenCalledTimes(3);
    user.type(getFirstName(), fakeCompletedData["FirstName"]);
    expect(onDataChange).toHaveBeenCalledTimes(3+fakeCompletedData["FirstName"].length);
    user.type(getLastName(), "T");
    expect(onDataChange).toHaveBeenCalledTimes(4+fakeCompletedData["FirstName"].length);
    user.type(getEmailAddress(), "T");
    expect(onDataChange).toHaveBeenCalledTimes(5+fakeCompletedData["FirstName"].length);

    // 2nd step
    clickReviewButton();
    expect(onViewChange).toHaveBeenCalledTimes(1);
  });

  it('Has alert when required fields empty', async () => {
    render(<FormContent data={{...fakeData, FavoritePokemon: fakeCompletedData["FavoritePokemon"]}} onDataChange={fakeEvent} handleViewChange={onViewChange}/>);

    clickReviewButton();
    expect(onViewChange).toHaveBeenCalledTimes(0);
    await waitFor(() => {
      expect(getAlertContent()).toBeInTheDocument();
    });
  });

  it('Has error message when fields input wrongly', async () => {
    render(<FormContent data={{...fakeData, FavoritePokemon: fakeCompletedData["FavoritePokemon"]}} onDataChange={fakeEvent} handleViewChange={fakeEvent}/>);

     user.type(getFirstName(), "!");
     user.type(getLastName(), "!");
     user.type(getPhoneNumber(), "!");
     user.type(getEmailAddress(), "!");
    
    expect(screen.getAllByText(/sorry, only letters \(a-z,a-z\) are allowed\./i)).toHaveLength(2);
    expect(screen.getByText(/sorry, only numbers \(0-9\) are allowed and start with sign \(\+\) with country code./i)).toBeInTheDocument();
    expect(screen.getByText(/sorry, only letters \(a\-z\), numbers \(0\-9\), and signs \(\.\-_@\) are allowed\./i)).toBeInTheDocument();
  });
})

test("Match snapshot", () => {
  const tree = renderer
    .create(<FormContent data={{...fakeData, FavoritePokemon: fakeCompletedData["FavoritePokemon"]}} onDataChange={fakeEvent} handleViewChange={fakeEvent}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

function getFirstName () {
  return screen.getByRole('textbox', {
    name: /First Name/i
  });
}
function getLastName () {
  return screen.getByRole('textbox', {
    name: /Last Name/i
  });
}
function getPhoneNumber () {
  return screen.getByRole('textbox', {
    name: /Phone Number/i
  });
}
function getEmailAddress () {
  return screen.getByRole('textbox', {
    name: /Email Address/i
  });
}

function getAlertContent() {
  return screen.getByText(/Form is not completed yet!/i)
}

function clickReviewButton() {
  return user.click(screen.getByRole('button', { name: /Next/i }));
}