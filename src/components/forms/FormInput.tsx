"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";

interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
}

const FormInput = ({
  name,
  type,
  size = "large",
  value,
  id,
  placeholder,
  validation,
  label,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          ) : (
            <Input
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          )
        }
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInput;

/*
***************************START*****************************
 const {
    control,
    formState: { errors },
  } = useFormContext();

  useFormContext: This is a hook provided by react-hook-form. It allows components nested within a form created using FormProvider to access the form state and control methods.

  control: This is a function used to register form fields, handle validation, and perform other form-related operations. It's essential for connecting your input component to the form state.

  formState: { errors }: This is a nested destructuring to access a specific property (errors) within the formState object. The errors property holds an object where keys are field names and values are error messages (if any) associated with those fields.




  In summary, this code snippet conditionally renders either a password or a regular input field based on the type prop. It connects the input to the form state using Controller and allows for overriding the initial value with a custom value prop. Finally, it displays any associated error message below the input field.


  </> control: Object
This object contains methods for registering components into React Hook Form.


***************************END*****************************

*/
