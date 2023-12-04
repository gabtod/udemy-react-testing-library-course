import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows 2 inputs and a button", () => {
  //render the component
  render(<UserForm />);

  //manipulate the comp or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  //assetion - make sure the comp is doing what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", async () => {
  //not the best implementation'
  //   const argList = [];
  //   const callback = (...args) => {
  //     argList.push(argList);
  //   };

  const mock = jest.fn();
  //render comp
  render(<UserForm onUserAdd={mock} />);
  //find the 2 inputs
  //const [nameInput, emailInput] = screen.getAllByRole("textbox");
  const emailInput = screen.getByLabelText(/enter email/i);
  //recommented by RTL
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  //simulatate typing name
  await user.click(nameInput);
  await user.keyboard("Gabi");

  //simulate typing email
  await user.click(emailInput);
  await user.keyboard("gabi@gmail.com");

  //find the button
  const button = screen.getByRole("button");

  //simulatate clicking on the button
  await user.click(button);

  //assertion - make sure the 'onUserAdd' gets called with email/name
  //   expect(argList).toHaveLength(1);
  //   expect(argList[0][0]).toEqual({ name: "Gabi", email: "gabi@gmail.com" });
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: "Gabi", email: "gabi@gmail.com" });
});

test("it empties the 2 inputs when the form is submitted", async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole('textbox', {name: /name/i})
  const emailInput = screen.getByRole('textbox', {name: /email/i})
  const button = screen.getByRole('button')

  await user.click(nameInput)
  await user.keyboard('gabi')
  await user.click(emailInput)
  await user.keyboard('gabi@mail.com')

  await user.click(button)

  expect(nameInput).toHaveValue('')
  expect(emailInput).toHaveValue('')
});
