
import * as yup from 'yup';

const MAX_FILE_SIZE = 2 * 1024 * 1024; //max size is 2mb
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const isValidFileType = (fileType) => SUPPORTED_FORMATS.includes(fileType);

export const transferMoneySchema = yup.object().shape({
    successScreenshot: yup.mixed()
    .required("Screenshot is required")
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
    amount: yup.number()
    .min(3, 'i')
    .max(4,'ji')
    .required('amount is required'),
    upiId: yup.number()
    .min(3, 'j')
    .max(12, 'j')
    .required('upi id required..')
});