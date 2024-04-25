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
    return [];
  } catch (error) {
    return error.errors;
  }
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
      .matches(/(?=.*[!@$&*-_])/, "Password should has one special case letter")
      .matches(/(?=.*[0-9].*[0-9])/, "Password should has two digits"),
  });

  try {
    await passwordSchema.validate(password, { abortEarly: false });
    return [];
  } catch (error) {
    return error.errors;
  }
};

const validateReapeatPassword = async ({ password, repeatPassword }) => {
  const passwordSchema = yup.object().shape({
    repeatPassword: yup
      .string()
      .required("Repeat password is required")
      .oneOf([password], "Passwords must match"),
  });

  try {
    await passwordSchema.validate({ repeatPassword }, { abortEarly: false });
    return [];
  } catch (error) {
    return error.errors;
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
    return [];
  } catch (error) {
    return error.errors;
  }
};

const validateName = async (name) => {
  const nameSchema = yup.object().shape({
    name: yup
      .string()
      .required("First name is required")
      .matches(
        /^[A-Za-z.\s_-]{3,}$/,
        "Name must be at least 3 uppercase or lowercase character!"
      ),
  });

  try {
    await nameSchema.validate(name, { abortEarly: false });
    return [];
  } catch (error) {
    return error.errors;
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
    return [];
  } catch (error) {
    return error.errors;
  }
};

const validateCode = (code) => {
  const newValue = code.replace(/[^0-9]/g, "").slice(0, 4);
  return newValue;
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

//[{ name: "myemail",typeValidate:"email", data: { password: "", repeatPassword: "" } }]
const validateInputs = async (inputs) => {
  inputs.sort((a, b) => a.sort - b.sort);
  const errors = await Promise.all(
    inputs.map(async (input) => {
      if (input.typeValidate === "email") {
        const err = await validateEmail(input.data);
        return { name: input.name, errors: err };
      }
      if (input.typeValidate === "secretCode") {
        const err = await validateSecretCode(input.data);
        return { name: input.name, errors: err };
      }
      if (input.typeValidate === "password") {
        const err = await validatePassword(input.data);
        return { name: input.name, errors: err };
      }
      if (input.typeValidate === "name") {
        const err = await validateName(input.data);
        return { name: input.name, errors: err };
      }
      if (input.typeValidate === "message") {
        const err = await validateMessage(input.data);
        return { name: input.name, errors: err };
      }
      if (input.typeValidate === "repeatPassword") {
        const err = await validateReapeatPassword(input.data);
        return { name: input.name, errors: err };
      }
    })
  );
  const lens = await Promise.all(errors.map((input) => input.errors.length));
  const totalErrors = lens.reduce((acc, curr) => acc + curr, 0);

  if (totalErrors > 0)
    for (let i = 0; i < errors.length; i++) {
      if (errors[i].errors.length > 0) {
        return {
          error: true,
          message: errors[i].errors[0] + " in " + errors[i].name,
        };
      }
    }
  return { error: false, message: "" };
};

export {
  validateInputs,
  validateEmail,
  validateCode,
  validatePassword,
  validateSecretCode,
  validateName,
  validateMessage,
  validateAmount,
  validateReapeatPassword,
};
