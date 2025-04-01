import * as yup from 'yup';


export const projectSubmissionSchema = yup.object().shape({

    description: yup
    .string()
    .trim()
    .min(20, "Description should have atleast 20 - 200 characters")
    .max(200, "Maximum characters are 200")
    .required("Description is required"),


    progress: yup
        .number()
        .min(10, "Progress should atlest 10%")
        .max(100, "Progress need to be under 100%")
        .required("Progress required"),

        attachedFile: yup
        .string()
        .trim()
        .min(10, "Must be at least 10 characters")
        .max(20, "Must be under 20 characters")
        .required("Attachment required") 

});

  