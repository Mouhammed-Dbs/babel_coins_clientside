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
      .matches(/^.{8,}$/, "Password should has minimum 8 characters")
      .matches(
        /(?=.*[a-z].*[a-z].*[a-z])/,
        "Password should has 3 lowercase letters"
      )
      .matches(/(?=.*[A-Z].*[A-Z])/, "Password should has 2 uppercase letters")
      .matches(/(?=.*[!@#$&*])/, "Password should has one special case letter")
      .matches(/(?=.*[0-9].*[0-9])/, "Password should has two digits"),
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
    name: yup
      .string()
      .required("Name is required")
      .matches(
        /^[A-Za-z.\s_-]{3,}$/,
        "Name must be a uppercase or lowercase character!"
      ),
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email address"),
    message: yup
      .string()
      .required("Message is required")
      .matches(/^.{20,}$/, "Message must be at least 20 characters!"),
  });

  try {
    await contactsSchema.validate(data, { abortEarly: false });
    return true;
  } catch (error) {
    throw error.errors;
  }
};

const validateAmount = (text) => {
  let value = text.replace(/[^\d\.]/g, "");
  let p1 = /^\d+\.\d+$/;
  let p3 = /^\d+$/;

  if (!p1.test(text)) {
    if (value.split(".").length - 1 > 1) {
      value = value.split(".")[0] + "." + value.split(".")[1];
      return value;
    }
  }
  if (p3.test(text)) return text;
  return value;
};
export {
  validateEmail,
  validateCode,
  validateLogin,
  validateFirstAndLastName,
  validatePasswordAndSecretCode,
  validateContacts,
  validateAmount,
};
