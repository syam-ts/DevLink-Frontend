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
        .min(3,"Minimum 3 skills required")
        .max(10,"Maximum 10 skills are allowed")
        .required("Skills are required"),

     
 
         
        //FIX: ACCORDING TO PAYMENT TYPE

    // payment: yup
    // .number()
    // .typeError("Payment must be a number")
    // .required("Payment is required")
    // .when("paymentType", {
    //   is: "hourly",
    //   then: yup
    //     .number()
    //     .min(100, "Minimum is 100 for hourly rate")
    //     .max(1500, "Maximum is 1500 for hourly rate"),
    //   otherwise: yup
    //     .number()
    //     .min(1000, "Minimum is 1000 for fixed rate")
    //     .max(70000, "Maximum is 70000 for fixed rate"),
    // }),
 
 

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


        //FIX: ACCORDING TO PAYMENT TYPE
    estimateTime: yup
        .number()
        .min(5, "Minimum 5 hours required")
        .max(48, "Maximum 48 hours")
        .required("Choose an estimate time"),

    location: yup
        .string()
        .trim()
        .min(3, "Location need to be valid(3 characters)")
        .max(25, "Location need to be valid(25 characters maximum)")
        .required("Location is required")
});
