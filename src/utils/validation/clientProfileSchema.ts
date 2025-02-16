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
        .min(10, "Establishment Year must be valid(after 1990)")
        .max(1500, "Establishment Year must be valid(before 2025)")
        .required("Establishment Year is required"),

});




export const clientProfileEditSchema = yup.object().shape({
    companyName: yup
        .string()
        .trim()
        .min(3, "Must be atleast 10 characters")
        .max(20, "Must be under 30 characters"),


    location: yup
        .string()
        .trim()
        .min(4, "Must be atleast 4 characters")
        .max(20, "Must be under 20 characters"),


    description: yup
        .string()
        .trim()
        .min(20, "Description must be atleast 20 characters")
        .max(100, "Description must be under 100 characters"),


    numberOfEmployees: yup
        .number()
        .min(10, "Total Employees must be at least 10")
        .max(2000, "Total Employees must be at most 2000"),


    since: yup
        .number()
        .min(10, "Establishment Year must be valid(after 1990)")
        .max(1500, "Establishment Year must be valid(before 2025)"),
});




