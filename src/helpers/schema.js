import * as yup from 'yup';

const schema = yup.object().shape({
  userName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'Incorrect format')
    .required("This field is required"),
  password: yup
    .string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref('password')], "Passwords don't match"),
  checkTerms: yup
    .boolean()
    .oneOf([true], 'Please accept the terms and conditions to continue'),
});

export default schema;