import * as yup from 'yup';


export const proposalSchema = yup.object().shape({
    bidAmount: yup
        .number()
        .transform((originalValue) => (originalValue && !isNaN(originalValue) ? Number(originalValue) : NaN))
        .typeError("Bid Amount is required")
        .required("Bid Amount is required")
        .when("paymentType", {
            is: "hourly",
            then: (schema) =>
                schema.min(100, "Bid Amount must be at least 100rs")
                    .max(1500, "Bid Amount must be at most 1500rs"),
            otherwise: (schema) =>
                schema.min(2000, "Bid Amount must be at least 2000rs")
                    .max(70000, "Bid Amount must be at most 70000rs"),
        }),


    bidDeadline: yup
        .number()
        .transform((originalValue) => (originalValue && !isNaN(originalValue) ? Number(originalValue) : NaN))
        .typeError("Bid Deadline is required")
        .required("Bid Deadline is required")
        .when("paymentType", {
            is: "hourly",
            then: (schema) =>
                schema.min(5, "Estimate deadline must be at least 5hr")
                    .max(48, "Estimate deadline must be at most 48hrs"),
            otherwise: (schema) =>
                schema.min(10, "Estimate deadline must be at least 10hr")
                    .max(120, "Estimate deadline must be at most 120hrs"),
        }),


    description: yup
        .string()
        .trim()
        .min(20, "Description should have atleast 20 200 characters")
        .max(200, "Maximum characters are 200")
        .required("Description is required"),

});

