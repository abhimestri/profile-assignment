import React from "react";
import { Controller, FieldError } from "react-hook-form";

export interface inputprops {
  name?: any;
  placeholder?: string;
  rules?: any;
  value?: any;
}

interface TextfieldProps {
  control?: any;
  inputList: inputprops[];
}

const Textfield = ({ control, inputList }: TextfieldProps) => {
  return (
    <>
      {inputList?.map((input: any) => {
        return (
          <Controller
            name={input?.name}
            control={control}
            render={({ field }) => {
              return (
                <input
                  className="border-solid px-3 py-2 border-[1px] border-darkgrey"
                  {...field}
                  placeholder={
                    input?.placeholder ? input?.placeholder : input?.name
                  }
                />
              );
            }}
          />
        );
      })}
    </>
  );
};

export default Textfield;
