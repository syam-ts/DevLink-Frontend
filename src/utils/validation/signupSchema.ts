import * as yup from "yup";

export const signupSchemaUser = yup.object().shape({
    name: yup.string()
        .min(5, "Invalid name (minimum 5 characters)")
        .max(20, "Invalid name (maximum 20 characters)")
        .required("Name is required"),

    mobile: yup.string()
        .matches(/^[0-9]{10}$/, "Invalid Number (10 digits)")
        .required("Mobile Number is required"),

    email: yup.string()
        .email("Email is invalid")
        .required("Email is required"),

    password: yup.string()
        .min(8, "Incorrect (minimum 8 characters)")
        .required("Password is required")
});


export const signupSchemaClient = yup.object().shape({
    name: yup.string()
    .min(5, "Invalid name (minimum 5 characters)")
    .max(20, "Invalid name (maximus 20 characters)")
        .required("Name is required"),

    email: yup.string()
        .email("Email is invalid")
        .required("Email is required"),

    password: yup.string()
    .min(8, "Incorrect (minimum 8 characters)")
        .required("Password is required")
});





