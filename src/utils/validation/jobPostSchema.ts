import * as yup from "yup";


export const jobPostSchema = yup.object().shape({
    title: yup
        .string()
        .trim()
        .min(10, "Must be atleast 10 characters")
        .max(30, "Must be under 30 characters")
        .required("Title is required"),


    keyResponsiblities: yup
        .string()
        .trim()
        .min(20, "KeyResponsiblities must be between (20 to 50 characters)")
        .max(60, "KeyResponsiblities should under 60")
        .required("KeyResponsiblities is required"),


    requiredSkills: yup
        .array()
        .min(3, "Minimum 3 skills required")
        .max(10, "Maximum 10 skills are allowed")
        .required("Skills are required"),


    paymentType: yup
        .string()
        .oneOf(["hourly", "fixed"], "Payment type must be either 'hourly' or 'fixed'")
        .required("Payment type is required"),


    payment: yup
        .number()
        .transform((originalValue) => (originalValue && !isNaN(originalValue) ? Number(originalValue) : NaN))
        .typeError("Payment must be a valid number")
        .required("Payment is required")
        .when("paymentType", {
            is: "hourly",
            then: (schema) => schema.min(100, "Hourly rate must be at least 100rs").max(1500, "Hourly rate must be at most 1500rs"),
            otherwise: (schema) => schema.min(2000, "Fixed price must be at least 2000rs").max(70000, "Fixed price must be at most 70000rs"),
        }),


    maxProposals: yup
        .number()
        .min(3, "Minimum 3 proposals are mandatory")
        .max(10, "Maximum proposals are 10")
        .required("Maximum proposal is required"),


    description: yup
        .string()
        .trim()
        .min(20, "Description should have atleast 20 200 characters")
        .max(200, "Maximum characters are 200")
        .required("Description is required"),


    estimateTime: yup
        .number()
        .transform((originalValue) => (originalValue && !isNaN(originalValue) ? Number(originalValue) : NaN))
        .typeError("Estimate Time must be a valid number")
        .required("Estimate time is required")
        .when("paymentType", {
            is: "hourly",
            then: (schema) => schema.min(5, "Estimate time must be at least 5hr").max(48, "Estimate time must be at most 48hrs"),
            otherwise: (schema) => schema.min(10, "Estimate time must be at least 10hr").max(120, "Estimate time must be at most 120hrs"),
        }),

    location: yup
        .string()
        .trim()
        .min(3, "Location need to be valid(3 characters)")
        .max(25, "Location need to be valid(25 characters maximum)")
        .required("Location is required")
});


 