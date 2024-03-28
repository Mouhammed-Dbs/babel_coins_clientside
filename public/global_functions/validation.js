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

const validateLogin = async (data) => {
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password should has minimum 8 characters in length,at least one uppercase character, one lowercase character,one digit and one special character0"
      ),
  });

  try {
    await loginSchema.validate(data, { abortEarly: false });
    return true;
  } catch (error) {
    throw error.errors;
  }
};
const validatePasswordAndSecretCode = async (data) => {
  const passwordAndSecretCodeSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .matches(/^.{8,}$/, "Password should has minimum 8 characters")
      .matches(
        /(?=.*[a-z].*[a-z].*[a-z])/,
        "Password should has 3 lowercase letters"
      )
      .matches(/(?=.*[A-Z].*[A-Z])/, "Password should has 2 uppercase letters")
      .matches(/(?=.*[!@#$&*])/, "Password should has one special case letter")
      .matches(/(?=.*[0-9].*[0-9])/, "Password should has two digits"),
    secretCode: yup
      .string()
      .required("Password is required")
      .matches(/^\d{6}$/, "Secret code must be a 6-digit number"),
  });

  try {
    await passwordAndSecretCodeSchema.validate(data, { abortEarly: false });
    return true;
  } catch (error) {
    throw error.errors;
  }
};

const validateFirstAndLastName = async (data) => {
  const firstAndLastNameSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required")
      .matches(
        /^[A-Za-z.\s_-]{3,}$/,
        "First name must be a uppercase or lowercase character!"
      ),
    lastName: yup
      .string()
      .required("Last name is required")
      .matches(
        /^[A-Za-z.\s_-]{3,}$/,
        "Last name must be a uppercase or lowercase character!"
      ),
  });

  try {
    await firstAndLastNameSchema.validate(data, { abortEarly: false });
    return true;
  } catch (error) {
    throw error.errors;
  }
};

const validateContacts = async (data) => {
  const contactsSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required")
      .matches(
        /^[A-Za-z.\s_-]{3,}$/,
        "First name must be a uppercase or lowercase character!"
      ),
    lastName: yup
      .string()
      .required("Last name is required")
      .matches(
        /^[A-Za-z.\s_-]{3,}$/,
        "Last name must be a uppercase or lowercase character!"
      ),
    message: yup.string().required("Message is required"),
  });

  try {
    await contactsSchema.validate(data, { abortEarly: false });
    return true;
  } catch (error) {
    throw error.errors;
  }
};
export {
  validateEmail,
  validateCode,
  validateLogin,
  validateFirstAndLastName,
  validatePasswordAndSecretCode,
};
