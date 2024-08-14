import React from "react";
import { Controller, FieldError, useForm } from "react-hook-form";
import { getErrorMessage, LoginInputFields } from "./utils";
import { inputprops } from "../Components/Textfield/Textfield";
import Button from "../Components/Button/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/auth";
import notify from "../Components/Notify/Notify";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {
  handleAuthForm: (data: boolean) => void;
}

const LoginPage = ({ handleAuthForm }: LoginPageProps) => {
  const { control, getValues, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    notify({ text: "Checking credentials please wait!" });
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        getValues("email"),
        getValues("password")
      );
      localStorage.setItem("uid", response?.user?.uid);
      notify({ text: "User logged in", type: "success" });
      navigate("/");
    } catch (err: any) {
      notify({ text: getErrorMessage(err["code"]), type: "error" });
    }
  };

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <div className="w-[300px] h-[60%] bg-[#f2f2f2] p-10 rounded-[14px] md:w-[30vw]">
        <p className="flex justify-center text-[18px] font-medium">Login</p>
        <div className="w-[100%] flex flex-col mt-6">
          <form onSubmit={handleSubmit(handleLogin)}>
            {LoginInputFields?.map((input: inputprops) => {
              return (
                <Controller
                  name={input?.name}
                  control={control}
                  rules={input?.rules}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <div className="mb-4 !w-[100%]">
                        <input
                          className={`w-full !rounded-[6px] px-3 py-2 ${
                            error?.message
                              ? "border-solid border-red border border-[1px]"
                              : "light-border"
                          }`}
                          {...field}
                          placeholder={input?.placeholder}
                          // onFocus={() => clearErrors()}
                        />
                        <p className="p-1 text-red text-[12px] leading-3">
                          {error?.message}
                        </p>{" "}
                      </div>
                    );
                  }}
                />
              );
            })}
            <Button type="submit" className="!w-full">
              Login
            </Button>
          </form>
          <p
            onClick={() => handleAuthForm(false)}
            className="cursor-pointer flex justify-center text-[16px] underline font-medium mr-2 mt-2"
          >
            Register
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
