import { describe, expect, it, vi } from "vitest";
import { StateForm as Form } from "./StateForm";
// import { RefForm as Form } from "./StateForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Form component", () => {
  it("should call onSubmit when the form is valid with the correct data", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<Form onSubmit={onSubmit} />);
    const email = "test@webdevsimplified.com"; // valid
    const password = "Password123"; // valid

    await user.type(screen.getByLabelText("Email"), email);
    await user.type(screen.getByLabelText("Password"), password);
    await user.click(screen.getByText("Submit"));

    expect(screen.queryByTestId("email-error-msg")).not.toBeInTheDocument();
    expect(screen.queryByTestId("password-error-msg")).not.toBeInTheDocument();

    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledWith({ email, password });
  });

  it("should show the email error when the email is invalid", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<Form onSubmit={onSubmit} />);
    const email = "test@test.com"; // invalid
    const password = "Password123"; // valid

    await user.type(screen.getByLabelText("Email"), email);
    await user.type(screen.getByLabelText("Password"), password);
    await user.click(screen.getByText("Submit"));

    expect(screen.getByTestId("email-error-msg")).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalledOnce();
  });

  it("should show the password error when the password is invalid", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<Form onSubmit={onSubmit} />);
    const email = "test@webdevsimplified.com"; // valid
    const password = "1234"; // invalid

    await user.type(screen.getByLabelText("Email"), email);
    await user.type(screen.getByLabelText("Password"), password);
    await user.click(screen.getByText("Submit"));

    expect(screen.getByTestId("password-error-msg")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalledOnce();
  });

  it("should update the error massage while typing after the first submit", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<Form onSubmit={onSubmit} />);
    const email = "test@webdevsimplified.com"; // valid

    const passwordInput = screen.getByLabelText("Password");

    await user.type(screen.getByLabelText("Email"), email);
    await user.type(passwordInput, "1234");
    await user.click(screen.getByText("Submit"));

    const passwordErrorMsg = screen.getByTestId("password-error-msg");

    expect(passwordErrorMsg).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalledOnce();

    await user.clear(passwordInput);
    await user.type(passwordInput, "Password1234");
    expect(passwordErrorMsg).not.toBeInTheDocument();
  });
});
