import { render, screen, within } from "@testing-library/react";
import UserList from "./UserList";

const renderComponent = () => {
  const users = [
    { name: "gabi", email: "gabi@gmail.com" },
    { name: "maria", email: "maria@gmail.com" },
  ];

  const { container } = render(<UserList users={users} />);

  return {
    container,
    users,
  };
};

test("render one row per user", () => {
  //render the component
  const {container} = renderComponent();

  //find all the rows in the table

  //screen.logTestingPlaygroundURL();
  //const rows = screen.getAllByRole('row');
  //const rows = within(screen.getByTestId("users")).getAllByRole("row");

  //eslint-disable-next-line
  const rows = container.querySelectorAll("tbody tr");
  //assertion - correct number of row in the table
  expect(rows).toHaveLength(2);
});

test("render the email and name of each user", () => {
  //render the component
  const { users } = renderComponent();

  //screen.logTestingPlaygroundURL();
  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", { name: user.email });
    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
