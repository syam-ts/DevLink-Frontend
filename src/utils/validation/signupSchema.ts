import * as yup from "yup";

export const signupSchemaUser = yup.object().shape({
    name: yup.string()
        .trim()
        .min(5, "Invalid name (minimum 5 characters)")
        .max(20, "Invalid name (maximum 20 characters)")
        .required("Name is required"),

    mobile: yup
        .string()
        .trim()
        .required("Mobile Number is required")
        .test("is-positive", "Invalid Number (must be positive)", (val) => !val.startsWith("-"))
        .test("is-10-digits", "Invalid Number (must be exactly 10 digits)", (val) => {
            if (val.startsWith("-")) return true;
            return /^\d{10}$/.test(val);
        }),


    email: yup.string()
        .trim()
        .email("Email is invalid")
        .required("Email is required"),

    password: yup.string()
        .trim()
        .min(8, "Incorrect (minimum 8 characters)")
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, "Password must include at least one number, lowercase letter, uppercase letter")
        .required("Password is required")
});



export const signupSchemaClient = yup.object().shape({
    name: yup.string()
    .trim()
    .min(5, "Invalid name (minimum 5 characters)")
    .max(20, "Invalid name (maximum 20 characters)")
    .required("Name is required"),

    email: yup.string()
    .trim()
    .email("Email is invalid")
    .required("Email is required"),

    password: yup.string()
    .trim()
    .min(8, "Incorrect (minimum 8 characters)")
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, "Password must include at least one number, lowercase letter, uppercase letter")
    .required("Password is required")
});





