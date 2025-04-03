
import * as yup from 'yup';
 

export const transferMoneySchema = yup.object().shape({ 
    paymentScreenshot: yup.string()
    .min(1,'paymentScreenshot is required'),

    amount: yup.number()
    .min(1, 'the amount need to be valid')
    .max(yup.ref('requestedAmount'),'amount should be under requestd amount')
    .required('amount is required'),

    upiId: yup.string()
    .min(7, 'upi id need to be atlest 7 digits')
    .max(15, 'upi id need to be between 7 - 15 digits')
    .required('upi id required..')
});