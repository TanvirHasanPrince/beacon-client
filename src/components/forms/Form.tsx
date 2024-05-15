"use client";
import React, { ReactElement, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

type FormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type FormProps = {
  children: ReactElement | React.ReactNode;
  submitHandler: SubmitHandler<any>;
} & FormConfig;

const Form = ({
  children,
  submitHandler,
  defaultValues,
  resolver,
}: FormProps) => {
  const formConfig: FormConfig = {};

  if (!!defaultValues) formConfig["defaultValues"] = defaultValues;
  if (!!resolver) formConfig["resolver"] = resolver;

  const methods = useForm<FormProps>(formConfig);
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: any) => {
    submitHandler(data);
    reset();
  };

  useEffect(() => reset(defaultValues), [defaultValues, reset, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;

/*
Explanation of the code

Lets start with: 
type FormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
-- This type defines the structure of the object that holds the Form configuration details
defaultValues?: Record<string, any>--- This means my defaultValues, will have "key" as string and the value canbe of any type. 

resolver?: any;-- This is for type checking. I may use Yup here for validation. 

So, in short, type FormConfig is giving me 2 values: 1. Initial values and custom validation logic (resolver)


****************************************************************
type FormProps = {
  children: ReactElement | React.ReactNode;
  submitHandler: SubmitHandler<any>;
} & FormConfig;

Now, in this form, I may send props. This FormProps type says what kind of props I may expect. 
It will have children: ReactElement | React.ReactNode type

Also, I will send  submitHandler, which can be of any type so: SubmitHandler<any>;
and also I have default values and validation as props. So using this: & FormConfig

******************************************************************

*****************************START*************************************
 if (!!defaultValues) formConfig["defaultValues"] = defaultValues;
  if (!!resolver) formConfig["resolver"] = resolver;

  This code ensures that the formConfig object only includes properties for defaultValues and resolver if they are explicitly provided as props to the Form component. 

*****************************END*************************************


*****************************START*************************************

  const methods = useForm<FormProps>(formConfig);
  const { handleSubmit, reset } = methods;

After calling useForm, the code retrieves specific properties from the returned value (methods) using object destructuring.


handleSubmit: This is a function provided by react-hook-form that handles form submission. It takes a callback function (often named onSubmit) as an argument. When the form is submitted, handleSubmit calls the provided callback function with the form data as an argument.


reset: This is another function provided by react-hook-form that allows you to reset the form state to its initial values or a specific state.


Summary: The code essentially retrieves the functionalities needed to manage form submission and state from the useForm hook. handleSubmit is used to connect form submission to your defined submit handler function, while reset allows you to clear the form data if needed.


  *****************************END*************************************


  *****************************START*************************************
  const onSubmit = (data: any) => {
    submitHandler(data);
    reset();
  };

  The onSubmit function acts as a bridge between the form submission and the user-defined submission logic. It retrieves the form data, calls the user's submit handler function with that data, and then resets the form for a clean slate after successful submission

  


    *****************************END*************************************

  *****************************START*************************************

     useEffect(() => reset(defaultValues), [defaultValues, reset, methods]);

This useEffect hook ensures that whenever the initial values (defaultValues) or the form reset functionality (reset) changes, the form is reset to its initial state. 

   *****************************END*************************************


     *****************************START*************************************

         <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>

This code snippet deals with rendering the form and its children using the methods and context provided by react-hook-form. 

<FormProvider {...methods}>: This line renders a FormProvider component from react-hook-form. It takes all the properties from the methods object (obtained from useForm) and spreads them as props to the FormProvider component.
The FormProvider component acts as a context provider, making the form state and functionalities accessible to child components within the form.



This code renders the form itself using a standard HTML form element. It connects the form submission to the handleSubmit function, which in turn calls the user-defined onSubmit function for custom logic. The FormProvider ensures that child components within the form (like form fields) have access to the form state and functionalities provided by react-hook-form.

        *****************************END*************************************

*/
