import { inputprops } from "../Components/Textfield/Textfield";

export const LoginInputFields: Array<inputprops> = [
  {
    name: "email",
    placeholder: "E-mail",
    value: "email",
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    },
  },
  {
    name: "password",
    placeholder: "Password",
    value: "password",
    rules: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password can't be less than 8 characters",
      },
    },
  },
];

export const SignupInputFields: Array<inputprops> = [
  {
    name: "name",
    placeholder: "Name",
    rules: {
      required: "Name is required",
    },
    value: "name",
  },
  {
    name: "email",
    placeholder: "E-mail",
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    },
    value: "email",
  },
  {
    name: "password",
    placeholder: "Password",
    rules: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password can't be less than 8 characters",
      },
    },
    value: "password",
  },
];

export const getErrorMessage = (errorType?: string) => {
  switch (errorType) {
    case "auth/email-already-in-use":
      return "This email is already in use!";
    case "auth/invalid-email":
      return "Invalid email Id";
    case "auth/invalid-credential":
      return "Email or password is incorrect";
    default:
      return "Something went wrong!";
  }
};
