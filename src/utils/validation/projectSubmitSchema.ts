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

// {
//     error?.some((err: any) => err.includes("Description is required")) ? (
//       error.map((err: any, index: number) => {
//         if (
//           err.includes("Description is required")
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
//           err.includes("Description is required") ||
//           err.includes("Description should have atleast 20 200 characters") ||
//           err.includes("Maximum characters are 200")
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
 