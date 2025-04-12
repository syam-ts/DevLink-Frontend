import * as yup from "yup";


const MAX_FILE_SIZE = 2 * 1024 * 1024; //max size is 2mb
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const isValidFileType = (fileType) => SUPPORTED_FORMATS.includes(fileType);

export const imageValidationSchema = yup.object().shape({
  profilePicture: yup
    .mixed()
    .required("Profile Picture is required")
    .test(
      "is-valid-type",
      "Not a valid image type. Only JPG, JPEG, and PNG are allowed",
      (value: { type: string }) => value && isValidFileType(value.type)
    )
    .test(
      "is-valid-size",
      "Max allowed size is 2mb",
      (value: { size: number }) => value && value.size <= MAX_FILE_SIZE
    ),
});
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
    .matches(/((https?):\/\/)?$/, "Enter correct url!")
    .min(10, "GithubLink must be atleast 10 characters")
    .max(30, "GithubLink must be under 30 characters")
    .required("github link is required"),

  description: yup
    .string()
    .trim()
    .min(20, "Description must be atleast 20 characters")
    .max(200, "Description must be under 200 characters")
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

export const userProfileEditSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .test(
      "name-validation",
      "Must be at least 3 characters and under 20 characters",
      (value: string) => {
        if (value?.trim().length > 0) {
          return value.length >= 3 && value.length <= 20;
        }
        return true;
      }
    ),

  budget: yup
    .number()
    .test(
      "budget-validation",
      "Hourly rate must be at least 100rs - 1500rs characters",
      (value: number) => {
        if (value > 0) {
          return value >= 100 && value <= 1500;
        }
        return true;
      }
    ),

  mobile: yup
    .number()
    .test(
      "mobile-validation",
      "Need valid number (10 digits only)",
      (value: number) => {
        if (value > 0) {
          const numStr = value.toString();
          return numStr.length === 10;
        }
        return true;
      }
    ),

  skills: yup
    .array()
    .test(
      "skills-validation",
      "Skill Filed must be at least 2 - 6 data",
      (value: string[]) => {
        if (value.length > 0) {
          return value.length >= 2 && value.length <= 6;
        }
        return true;
      }
    ),

  location: yup
    .string()
    .trim()
    .test(
      "location-validation",
      "Must be at least 4 characters and under 20 characters",
      (value: string) => {
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
      "Domain name must be at least 10 -  20 characters",
      (value: string) => {
        if (value?.trim().length > 0) {
          return value.length >= 10 && value.length <= 20;
        }
        return true;
      }
    ),

  githubLink: yup
    .string()
    .trim()
    .test(
      "github-validation",
      "Github link must be at least 10 - 30 characters",
      (value: string) => {
        if (value?.trim().length > 0) {
          return value.length >= 10 && value.length <= 30;
        }
        return true;
      }
    ),

  description: yup
    .string()
    .trim()
    .test(
      "description-validation",
      "Descripton must be at least 20 - 200 characters",
      (value: string) => {
        if (value?.trim().length > 0) {
          return value.length >= 20 && value.length <= 200;
        }
        return true;
      }
    ),

  whyHireMe: yup
    .string()
    .trim()
    .test(
      "whyHireMe-validation",
      "Hire me Filed must be at least 20 - 60 characters",
      (value: string) => {
        if (value?.trim().length > 0) {
          return value.length >= 20 && value.length <= 60;
        }
        return true;
      }
    ),

  experience: yup
    .string()
    .trim()
    .test(
      "experience-validation",
      "Experience Filed must be at least 20 - 60 characters",
      (value: string) => {
        if (value?.trim().length > 0) {
          return value.length >= 20 && value.length <= 60;
        }
        return true;
      }
    ),

  education: yup
    .array()
    .test(
      "education-validation",
      "Education Filed must be at least 2 - 6 data",
      (value: string[]) => {
        if (value.length > 0) {
          return value.length >= 2 && value.length <= 6;
        }
        return true;
      }
    ),
});


