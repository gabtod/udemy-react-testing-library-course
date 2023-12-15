import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";
import { SWRConfig } from "swr";

async function renderComponent() {
  render(
    <SWRConfig value={{provider: () => new Map()}}>
    <MemoryRouter>
      <AuthButtons />
    </MemoryRouter>

    </SWRConfig>
  );
  await screen.findAllByRole("link");
}

describe("when user is not signed in", () => {
  //createServer -> GET /api/user -> {user: null}

  createServer([
    {
      path: "/api/user",
      res: () => {
        console.log('NOT LOGGED IN RESPONSE')
        return { user: null };
      },
    },
  ]);

  test("sign in and sign up are visible", async () => {
      //debugger;
    await renderComponent();

    const signInBtn = screen.getByRole("link", { name: /sign in/i });
    const signUpBtn = screen.getByRole("link", { name: /sign up/i });
    // screen.debug()
    // await pause();
    // screen.debug()

    expect(signInBtn).toBeInTheDocument();
    expect(signInBtn).toHaveAttribute("href", "/signin");
    expect(signUpBtn).toBeInTheDocument();
    expect(signUpBtn).toHaveAttribute("href", "/signup");
  });

  test("sign out is not visible", async () => {
      //debugger;
    await renderComponent();
    const signOutBtn = screen.queryByRole("link", { name: /sign-out/i });

    expect(signOutBtn).not.toBeInTheDocument()
  });
});

const pause = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 100);
  });

describe("when user is signed in", () => {
  //createServer -> GET api/user -> {user: {id: 1, email: 'test@test.com'}}
  createServer([
    {
      path: "/api/user",
      res: () => {
        console.log('LOGGED IN RESPONSE')
        return { user: { id: 1, email: "test@test.com" } };
      },
    },
  ]);

  test("sign in and sign up are not visible", async () => {
    await renderComponent();

    const signInBtn = screen.queryByRole('link', {name: /sign in/i})
    const signUpBtn = screen.queryByRole('link', {name: /sign up/i})

    expect(signInBtn).not.toBeInTheDocument()
    expect(signUpBtn).not.toBeInTheDocument()
  });

  test("sign out is visible", async () => {
    await renderComponent();

    const signOutBtn = screen.getByRole("link", { name: /sign out/i });

    expect(signOutBtn).toBeInTheDocument()
    expect(signOutBtn).toHaveAttribute('href', '/signout')
  });
});
