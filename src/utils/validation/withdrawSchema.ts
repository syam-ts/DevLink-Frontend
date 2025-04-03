
import * as yup from 'yup';

export const withdrasSchema = yup.object().shape({
    accountNumber: yup.string()
    .min(13, 'The account number need to be minimum 13 digits')
    .max(14, 'The account number need to be maximum of 14 digits')
    .required('account number is required...'),
    amount: yup.number()
    .min(1, 'Amount need to valid')
    .max(yup.ref('balance'),'Amount should be below the existing balance')
    .required('amount is required')
});