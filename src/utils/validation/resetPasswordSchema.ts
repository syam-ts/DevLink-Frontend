import * as yup from "yup";

export const resetPasswordSchema = yup.object().shape({ 

    password: yup.string()
        .trim()
        .min(8, "Incorrect (minimum 8 characters)")
        .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/, "Include at least one number, uppercase letter")
        .required("Password is required")
});

 





