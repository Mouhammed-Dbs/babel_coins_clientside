import axios from "axios";

const isUserLogged = async () => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.get(
        `${process.env.BASE_API_URL}/users/user-info`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (error) {
      if (error?.response.data.msg === "Unauthorized Error")
        localStorage.removeItem("babel-coins-user-token");
      throw error;
    }
  }
  return { error: true };
};
const loginUser = async (email, password) => {
  try {
    const res = await axios.get(
      `${process.env.BASE_API_URL}/users/login?email=${email}&password=${password}`
    );
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
const getConfirmCode = async (email) => {
  try {
    const res = await axios.post(
      `${process.env.BASE_API_URL}/users/send-account-verification-code?email=${email}`
    );
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
const registerUser = async (email, code) => {
  try {
    const res = await axios.post(
      `${process.env.BASE_API_URL}/users/create-new-account?code=${code}`,
      { email }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
const updateUserInfo = async (
  password,
  secretCode,
  firstName,
  lastName,
  country
) => {
  let token = localStorage.getItem("babel-coins-user-token");
  try {
    const res = await axios.put(
      `${process.env.BASE_API_URL}/users/update-user-info`,
      {
        password,
        secretCode,
        firstName,
        lastName,
        country,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
export {
  isUserLogged,
  loginUser,
  getConfirmCode,
  registerUser,
  updateUserInfo,
};
