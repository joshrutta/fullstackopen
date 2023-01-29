import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> calls event handler with correct arguments", async () => {
  const createNewBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createNewBlog={createNewBlog} />);

  const [titleInput, authorInput, urlInput] = screen.getAllByRole("textbox");

  const submitButton = screen.getByText("create");

  await user.type(titleInput, "test title");
  await user.type(authorInput, "test author");
  await user.type(urlInput, "test url");

  await user.click(submitButton);
  expect(createNewBlog.mock.calls).toHaveLength(1);

  const eventHandlerArguments = createNewBlog.mock.calls[0][0];

  expect(eventHandlerArguments.title).toBe("test title");
  expect(eventHandlerArguments.author).toBe("test author");
  expect(eventHandlerArguments.url).toBe("test url");
});
