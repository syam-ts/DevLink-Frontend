import * as yup from "yup";

const validFileExtensions: any = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

function isValidFileType(fileName: any, fileType: any) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

const MAX_FILE_SIZE = 102400;
 

export const userProfileVerifySchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .min(3, "Must be atleast 3 characters")
        .max(20, "Must be under 20 characters")
        .required("FullName is required"),


    budget: yup
        .number()
        .required("Budget is required")
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
    // profilePicture: yup 
    // .mixed()
    // .required("Required")
    // .test("is-valid-type", "Not a valid image type",
    //   value => isValidFileType(value && value.name.toLowerCase(), "image"))
    // .test("is-valid-size", "Max allowed size is 100KB",
    //   value => value && value.size <= MAX_FILE_SIZE) 
    //     .required("ProfilePicture  is required"),


    domain: yup
        .string()
        .trim()
        .min(10, "Domain must be atleast 10 characters")
        .max(20, "Domain must be under 20 characters")
        .required("Domain is required"),


    // CHECKS IF HTTP OR NOT
    githubLink: yup
        .string()
        .trim()
        .matches(
            /((https?):\/\/)?$/,
            'Enter correct url!'
        )
        .min(10, "GithubLink must be atleast 10 characters")
        .max(30, "GithubLink must be under 30 characters")
        .required("github link is required"),


    description: yup
        .string()
        .trim()
        .min(20, "Description must be atleast 20 characters")
        .max(100, "Description must be under 100 characters")
        .required("Description is required"),


    whyHireMe: yup
        .string()
        .trim()
        .min(20, "Hire me filed must be atleast 20 characters")
        .max(60, "Hire me filed must be under 60 characters")
        .required("Hire me field is required"),


    experience: yup
        .string()
        .trim()
        .min(20, "Experience must be atleast 20 characters")
        .max(60, "Experience must be under 60 characters")
        .required("Experiences are required"),


    education: yup
        .array()
        .min(2, "Minimum 2 eduction information needed")
        .max(6, "Maximum 6 eduction information allowed")
        .required("Eduction informations are required"),  

});


// {
//     error?.some((err: any) => err.includes("Budget is required")) ? (
//       error.map((err: any, index: number) => {
//         if (
//           err.includes("Budget is required")
//         ) {
//           return (
//             <div key={index} className="text-start">
//               <span className="text-red-400 text-sm">{err}</span>
//             </div>
//           );
//         }
//         return null;
//       })
//     ) : (
//       error.map((err: any, index: number) => {
//         if (
//           err.includes("Budget is required") ||
//           err.includes("Hourly rate must be at least 100rs") ||
//           err.includes("Hourly rate must be at most 1500rs")
//         ) {
//           return (
//             <div key={index} className="text-start">
//               <span className="text-red-400 text-sm">{err}</span>
//             </div>
//           );
//         }
//         return null;
//       })
//     )
//   } 


export const userProfileEditSchema = yup.object().shape({
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




