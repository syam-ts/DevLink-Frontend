import * as yup from "yup";


export const userProfileVerifySchema = yup.object().shape({
    fullName: yup
        .string()
        .trim()
        .min(3, "Must be atleast 3 characters")
        .max(20, "Must be under 20 characters"),

    budget: yup
        .number()
        .min(100, "Hourly rate must be at least 100rs")
        .max(1500, "Hourly rate must be at most 1500rs"),


    skills: yup
        .array()
        .min(3, "Minimum 3 skills required")
        .max(10, "Maximum 10 skills are allowed"),
    location: yup
        .string()
        .trim()
        .min(4, "Must be atleast 4 characters")
        .max(20, "Must be under 20 characters"),

    // CHEKCK VLID IMAGE (JPG, PNG )
    picture: yup
        .string(),

    domain: yup
        .string()
        .trim()
        .min(10, "Must be atleast 10 characters")
        .max(20, "Must be under 20 characters"),

    // CHECKS IF HTTP OR NOT
    githubLink: yup
        .string()
        .trim()
        .min(10, "Must be atleast 10 characters")
        .max(20, "Must be under 20 characters"),

    description: yup
        .string()
        .trim()
        .min(20, "Must be atleast 20 characters")
        .max(100, "Must be under 100 characters"),

    whyHireMe: yup
        .string()
        .trim()
        .min(20, "Must be atleast 20 characters")
        .max(60, "Must be under 60 characters"),

    experience: yup
        .string()
        .trim()
        .min(20, "Must be atleast 20 characters")
        .max(60, "Must be under 60 characters"),

    education: yup
        .array()
        .min(2, "Minimum 2 eduction information needed")
        .max(2, "Maximum 6 eduction information allowed"),

});




export const userProfileEditSchema = yup.object().shape({
    fullName: yup
        .string()
        .trim()
        .min(3, "Must be atleast 3 characters")
        .max(20, "Must be under 20 characters")
        .required("FullName is required"),


    payment: yup
        .number()
        .required("Payment is required")
        .min(100, "Hourly rate must be at least 100rs")
        .max(1500, "Hourly rate must be at most 1500rs"),


    skills: yup
        .array()
        .min(3, "Minimum 3 skills required")
        .max(10, "Maximum 10 skills are allowed")
        .required("Skills are required"),

    location: yup
        .string()
        .trim()
        .min(4, "Must be atleast 4 characters")
        .max(20, "Must be under 20 characters")
        .required("Location is required"),


    // CHEKCK VLID IMAGE (JPG, PNG )
    picture: yup
        .string()
        .required("ProfilePicture  is required"),


    domain: yup
        .string()
        .trim()
        .min(10, "Must be atleast 10 characters")
        .max(20, "Must be under 20 characters")
        .required("Domain is required"),


    // CHECKS IF HTTP OR NOT
    githubLink: yup
        .string()
        .trim()
        .min(10, "Must be atleast 10 characters")
        .max(20, "Must be under 20 characters")
        .required("github link is required"),


    description: yup
        .string()
        .trim()
        .min(20, "Must be atleast 20 characters")
        .max(100, "Must be under 100 characters")
        .required("Description is required"),


    whyHireMe: yup
        .string()
        .trim()
        .min(20, "Must be atleast 20 characters")
        .max(60, "Must be under 60 characters")
        .required("Hire me field is required"),


    experience: yup
        .string()
        .trim()
        .min(20, "Must be atleast 20 characters")
        .max(60, "Must be under 60 characters")
        .required("Hire me field is required"),


    education: yup
        .array()
        .min(2, "Minimum 2 eduction information needed")
        .max(2, "Maximum 6 eduction information allowed")
        .required("Eduction informations are required"),





});
