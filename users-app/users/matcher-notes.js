[{"content":"import { screen, render, within } from '@testing-library/react';\n\nfunction FormData() {\n  return (\n    <div>\n    <button>Go Back</button>\n    <form aria-label=\"form\">\n      <button>Submit</button>\n      <button>Cancel</button>\n    </form>\n    </div>\n  );\n}\n\nrender(<FormData />);","type":"code","id":"m6vzf"},{"content":"function toContainRole(container, role, quantity = 1) {\r\n  const elements = within(container).queryAllByRole(role);\r\n  if(elements.length=== quantity) {\r\n    return {\r\n      pass: true\r\n    }\r\n  }\r\n\r\n  return {\r\n    pass: false,\r\n    message: ()=>`the container did not contain ${quantity} ${role} elements.Found ${elements.length}`\r\n  }\r\n}\r\n\r\nexpect.extend({toContainRole})","type":"code","id":"eph3b"},{"content":"test('the form displays 2 buttons', () => {\n  render(<FormData />);\n\n  const form = screen.getByRole('form');\n  // const buttons = within(form).getAllByRole('button');\n\n  // expect(buttons).toHaveLength(2);\n\n  expect(form).toContainRole('button', 2)\n});","type":"code","id":"475tg"}]