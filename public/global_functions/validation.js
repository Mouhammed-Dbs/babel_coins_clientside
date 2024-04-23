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

const validateCode = (code) => {
  const newValue = code.replace(/[^0-9]/g, "").slice(0, 4);
  return newValue;
};

const validatePassword = async (password) => {
  const passwordSchema = yup.object().shape({
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
    await passwordSchema.validate(password, { abortEarly: false });
    return true;
  } catch (error) {
    throw error.errors;
  }
};

const validateSecretCode = async (secretCode) => {
  const secretCodeSchema = yup.object().shape({
    secretCode: yup
      .string()
      .required("Secret code is required")
      .matches(/^\d{6}$/, "Secret code must be a 6-digit number"),
  });

  try {
    await secretCodeSchema.validate(secretCode, { abortEarly: false });
    return true;
  } catch (error) {
    throw error.errors;
  }
};

const validateName = async (name) => {
  const nameSchema = yup.object().shape({
    name: yup
      .string()
      .required("First name is required")
      .matches(
        /^[A-Za-z.\s_-]{3,}$/,
        "Name must be a uppercase or lowercase character!"
      ),
  });

  try {
    await nameSchema.validate(name, { abortEarly: false });
    return true;
  } catch (error) {
    throw error.errors;
  }
};

const validateMessage = async (message) => {
  const msgSchema = yup.object().shape({
    message: yup
      .string()
      .required("Message is required")
      .matches(/^.{20,}$/, "Message must be at least 20 characters!"),
  });

  try {
    await msgSchema.validate(
      { message: message.message.trim().replace(/\s+/g, "") },
      { abortEarly: false }
    );
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
  validatePassword,
  validateSecretCode,
  validateName,
  validateMessage,
  validateAmount,
};
