import { screen, render, act } from "@testing-library/react";

import { MemoryRouter } from "react-router";
import RepositoriesListItem from "./RepositoriesListItem";
import { async } from "validate.js";

//act is implemented by React DOM, but RTL makes a really 
//small change and it returns it

//solution 2 for act(...) warning
//skipping over the component that causes the issue
// jest.mock("../tree/FileIcon", () => {
//   //contenets of FileIcon.js
//   return () => {
//     return "File Icon Components";
//   };
// });

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "Javascript",
    description: "A js library",
    owner: {
      login: 'facebook'
    },
    name: "react",
    html_url: "https://github.com/facebook/react",
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return {repository};
}

test("shows a link to the github homepage for this repository", async () => {
  const {repository } = renderComponent();

  // screen.debug();
  // await pause();
  // screen.debug();

  //solution 1 for act(...) warning
  await screen.findByRole('img', {name: 'Javascript'})

  const link = screen.getByRole('link', {name: /github repository/i});
  expect(link).toHaveAttribute('href', repository.html_url)
  //solution 3
  //worst solution, use it as last resource  
  // await act(async()=>{
  //   await pause();
  // })
});

const pause = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
};

test('shows a fileicon with the approriate icon', async()=>{

  renderComponent();

  const icon = await screen.findByRole('img', {name: 'Javascript'})
  expect(icon).toHaveClass('js-icon')
})

test('shows a link to the code editor page', async()=>{
  const {repository} = renderComponent();

  await screen.findByRole('img', {name: 'Javascript'})

  const link = await screen.findByRole('link', {name: new RegExp(repository.owner.login)})

  expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`)
})