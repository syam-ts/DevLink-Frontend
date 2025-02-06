import * as yup from 'yup';

export const jobPostSchema = yup.object().shape({
    title: yup.string().min(10, "Title should have atleast 10 characters").required("Title is required"),
    payment: yup.string().min(100, "100rs is the minimum").required("Payment is required"),
    description: yup.string().min(20, "Description should have atleast 20 characters").required("Description is required"),
    keyResponsiblities: yup.string().min(20, "KeyResponsiblities should have atleast 20 characters").required("KeyResponsiblities is required"),
    requiredSkills: yup.array().min(2, "Minimum 2 skills are mandatory").required("Skills are required"),
    maxProposals: yup.string().min(3, "Add number more than 3").max(10, "Add number less than 10").required("Max proposal is required"),
    paymentType: yup.string().required("Choose one payment Mehtod"),
    estimateTime: yup.string().required("Choose an estimate time"),
    location: yup.string().min(3, "Location need to be valid").required("Location is required"),

  
})