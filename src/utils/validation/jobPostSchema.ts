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
        .max(50, "KeyResponsiblities should under 50")
        .required("KeyResponsiblities is required"),

    // skills: yup
    //     .array() 
    //     .required("Skills are required"),

    payment: yup
        .number() 
        .min(100, "100rs is the minimum")
        .max(1500, "1500rs is the maximum")
        .min(1000, "1000rs is the minimum")
        .max(50000, "50000rs is the maximum")
        .required("Payment is required"),

    paymentType: yup
        .string()
        .trim()
        .required("Choose one payment Mehtod"),

    maxProposals: yup
        .number() 
        .min(3, "Minimum 3 proposals are mandatory")
        .max(10, "Maximus is 10")
        .required("Max proposal is required"),

    description: yup
        .string()
        .trim()
        .min(20, "Description should have atleast 20 200 characters")
        .max(200, "Max 200")
        .required("Description is required"),

    estimateTime: yup
    .number() 
    .min(5, "Minimum 5 hours required")
    .max(48, "Maximum 48 hours")
    .required("Choose an estimate time"),

    location: yup
        .string()
        .trim()
        .min(3, "Location need to be valid(3 characters)")
        .required("Location is required"),
});
