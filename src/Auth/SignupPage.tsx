import React from "react";
import { inputprops } from "../Components/Textfield/Textfield";
import { Controller, useForm } from "react-hook-form";
import Button from "../Components/Button/Button";
import { SignupInputFields } from "./utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/auth";
import notify from "../Components/Notify/Notify";
import { useNavigate } from "react-router-dom";

interface SignupPageProps {
  handleAuthForm: (data: boolean) => void;
}

const SignupPage = ({ handleAuthForm }: SignupPageProps) => {
  const { control, getValues, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        getValues("email"),
        getValues("password")
      );
      if (response?.user?.uid) {
        localStorage.setItem("uid", response?.user?.uid);
        notify({
          text: "User registerd successfully",
          type: "success",
        });
        navigate("/");
      }
    } catch (error) {
      notify({ text: "User registeration unsuccessful", type: "error" });
    }
  };

  return (
    <div className="flex h-[100vh] justify-center items-center">
      <div className="w-[30%] h-[64%] bg-[#f2f2f2] p-10 rounded-[14px]">
        <p className="flex justify-center text-[18px] font-medium">Register</p>
        <div className="w-[100%] flex flex-col mt-6">
          <form onSubmit={handleSubmit(handleSignup)}>
            {SignupInputFields?.map((input: inputprops) => {
              return (
                <Controller
                  name={input?.name}
                  control={control}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <>
                        <input
                          className="w-full border-solid border-[1px] border-lightgrey rounded-[6px] px-3 py-2 mt-4"
                          {...field}
                          placeholder={input?.placeholder}
                        />
                        <p className="p-1 text-red text-[12px] leading-3">
                          {error?.message}
                        </p>{" "}
                      </>
                    );
                  }}
                  rules={input?.rules}
                />
              );
            })}
            <Button className="w-full mt-4" type="submit">
              Sign Up
            </Button>
          </form>
          <p className="m-auto mt-4">
            Already a user?{" "}
            <span
              onClick={() => handleAuthForm(true)}
              className="underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
