import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

test("can receive a new user and show it on a list", async () => {
  render(<App />);

  const emailInput = screen.getByRole("textbox", { name: /enter email/i });
  const nameInput = screen.getByRole("textbox", { name: /name/i });

  const button = screen.getByRole("button");

  await user.click(nameInput);
  await user.keyboard("gabi");
  await user.click(emailInput);
  await user.keyboard("gabi@gmail.com");

  await user.click(button);

  //screen.debug();
  const name = screen.getByRole('row', {name: /gabi/i})
  const email = screen.getByRole('row', {name: /gabi@gmail.com/i})

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument()
});
