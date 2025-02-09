import * as yup from "yup";

export const signupSchemaUser = yup.object().shape({
    name: yup.string()
        .min(5, "Name should be at least 5 characters")
        .max(20, "Name should be at most 20 characters")
        .required("Name is required"),

    mobile: yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number should be exactly 10 digits")
        .required("Mobile Number is required"),

    email: yup.string()
        .email("Email is invalid")
        .required("Email is required"),

    password: yup.string()
        .min(8, "Minimum 8 characters needed")
        .required("Password is required")
});


export const signupSchemaClient = yup.object().shape({
    name: yup.string()
        .min(5, "Name should be at least 5 characters")
        .max(20, "Name should be at most 20 characters")
        .required("Name is required"),

    email: yup.string()
        .email("Email is invalid")
        .required("Email is required"),

    password: yup.string()
        .min(8, "Minimum 8 characters needed")
        .required("Password is required")
});





