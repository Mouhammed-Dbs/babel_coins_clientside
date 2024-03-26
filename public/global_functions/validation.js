import * as yup from "yup";

const validateEmail = async (email) => {
  const emailSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
  });
  try {
    await emailSchema.validate(email, { abortEarly: false });
    return true;
  } catch (error) {
    throw error.errors;
  }
};

const validateCode = async (code) => {
  const codeSchema = yup.object().shape({
    code: yup
      .string()
      .matches(/^\d{4}$/, "Code must be a 4-digit number")
      .required("Code is required"),
  });

  try {
    await codeSchema.validate(code, { abortEarly: false });
    return true;
  } catch (error) {
    throw error.errors;
  }
};

export { validateEmail, validateCode };
