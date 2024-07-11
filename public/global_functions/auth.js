import { data } from "autoprefixer";
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
    throw error;
  }
};
const getConfirmCode = async (email) => {
  try {
    const res = await axios.post(
      `${process.env.BASE_API_URL}/users/send-account-verification-code?email=${email}`
    );
    return res.data;
  } catch (error) {
    throw error;
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

// SETTING PAGE //

const changePassword = async (currentPassword, newPassword) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.put(
        `${process.env.BASE_API_URL}/users/change-password?password=${currentPassword}&newPassword=${newPassword}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.error) return null;
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  return null;
};

const getForRecoveryPassword = async (email, secretCode) => {
  try {
    const res = await axios.get(
      `${process.env.BASE_API_URL}/users/forget-password?email=${email}&secretCode=${secretCode}`
    );
    if (res.error) return null;
    return res.data;
  } catch (error) {
    throw error;
  }
};

const recoveryPassword = async (email, code, newPassword) => {
  try {
    const res = await axios.put(
      `${process.env.BASE_API_URL}/users/reset-password?email=${email}&code=${code}&newPassword=${newPassword}`
    );
    if (res.error) return null;
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getSecurityOrNotificationsSettings = async (settingsType) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.get(
        `${process.env.BASE_API_URL}/users/settings-info?settingsType=${settingsType}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.error) return null;
      return res.data;
    } catch (error) {
      throw error;
    }
  }
};

const changeSecuritySettings = async (
  whenSendVerificationCode2FA,
  methodOfSendingCode2FA,
  methodOfSendingCodeRestorePass,
  isEnabledMasterKey
) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.put(
        `${process.env.BASE_API_URL}/users/change-security-settings`,
        {
          authenticationBy2FA: {
            whenSendVerificationCode: whenSendVerificationCode2FA,
            methodOfSendingCode: methodOfSendingCode2FA,
          },
          restorePasswords: {
            methodOfSendingCode: methodOfSendingCodeRestorePass,
          },
          isEnabledMasterKey,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.error) {
        return null;
      }
      return res.data;
    } catch (error) {
      return error.response?.data;
    }
  }
  return { error: true, msg: "Unauthorized Error", data: {} };
};

const changeNotificationsSettings = async (
  isSendingMsgOnSuccessfulAuthorization,
  methodOfSendingNotificationOnIncomingPayment,
  minimumAmountForSendingNotification,
  isEnabledMasterKey
) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.put(
        `${process.env.BASE_API_URL}/users/change-notifications-settings`,
        {
          authentication: {
            isSendingMsgOnSuccessfulAuthorization,
          },
          internalTransfers: {
            methodOfSendingNotificationOnIncomingPayment,
            minimumAmountForSendingNotification,
          },
          isEnabledMasterKey,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.error) return null;
      return res.data;
    } catch (error) {
      throw error;
    }
  }
};

export {
  isUserLogged,
  loginUser,
  getConfirmCode,
  registerUser,
  updateUserInfo,
  changePassword,
  getForRecoveryPassword,
  recoveryPassword,
  changeSecuritySettings,
  getSecurityOrNotificationsSettings,
  changeNotificationsSettings,
};
