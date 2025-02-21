import * as yup from "yup";



// {
//     error?.some((err: any) => err.includes("Payment type is required")) ? (
//       error.map((err: any, index: number) => {
//         if (
//           err.includes("Payment type is required")
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
//           err.includes("Payment type is required") ||
//           err.includes("Payment type must be either 'hourly' or 'fixed'")
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

export const clientProfileVerifySchema = yup.object().shape({

    companyName: yup
        .string()
        .trim()
        .min(10, "Must be atleast 10 characters")
        .max(20, "Must be under 30 characters")
        .required("CompanyName is required"),


    location: yup
        .string()
        .trim()
        .min(4, "Must be atleast 4 characters")
        .max(20, "Must be under 20 characters")
        .required("Location is required"),

    domain: yup
        .string()
        .trim()
        .min(10, "Domain must be atleast 10 characters")
        .max(25, "Domain must be under 25 characters")
        .required("Domain is required"),


    description: yup
        .string()
        .trim()
        .min(20, "Description must be atleast 20 characters")
        .max(100, "Description must be under 100 characters")
        .required("Description is required"),


        numberOfEmployees: yup
        .number()
        .min(10, "Total Employees must be at least 10")
        .max(2000, "Total Employees must be at most 2000")
        .required("Total Employees are required"),


    since: yup
        .number()
        .min(1990, "Establishment Year must be valid(after 1990)")
        .max(2025, "Establishment Year must be valid(before 2025)")
        .required("Establishment Year is required"),

});




export const clientProfileEditSchema = yup.object().shape({
    companyName: yup
        .string()
        .trim() 
        .test(
          "companyName-validation",
          "Must be at least 10 characters and under 30 characters",
          (value: any) => {
            if (value?.trim().length > 0) {
                console.log('lenght nam:', value)
              return value.length >= 10 && value.length <= 30;
            }
            return true;
          }
        ), 


    location: yup
        .string()
        .trim() 
        .test(
          "location-validation",
          "Must be valid location (4 - 20)",
          (value: any) => {
            if (value?.trim().length > 0) {
              return value.length >= 4 && value.length <= 20;
            }
            return true;
          }
        ), 

    domain: yup
        .string()
        .trim() 
        .test(
          "domain-validation",
          "Must be at least 10 characters and under 25 characters",
          (value: any) => {
            if (value?.trim().length > 0) {
              return value.length >= 10 && value.length <= 25;
            }
            return true;
          }
        ), 

        description: yup
        .string()
        .trim() 
        .test(
          "description-validation",
          "Must be at least 20 - 100 characters",
          (value: any) => {
            if (value?.trim().length > 0) {
                console.log('length: ', value.length)
              return value.length >= 20 && value.length <= 100;
            }
            return true;
          }
        ), 

        numberOfEmployees: yup
        .number()
        .test(
          "description-validation",
          "Must be at least 10 - 2000 employees",
          (value: any) => {
            if (value> 0) {
              return value >= 10 && value <= 2000;
            }
            return true;
          }
        ), 

        since: yup
        .number()
        .test(
          "description-validation",
          "Establishment Year must be valid(1990 - 2025)",
          (value: any) => {
            if (value> 0) {
              return value >= 1990 && value <= 2025;
            }
            return true;
          }
        ), 

 
});




