import axios from "axios";

const getBalanceCoins = async () => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.get(
        `${process.env.BASE_API_URL}/users/all-balances`,
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
  }
  return null;
};

const getAddressesByCoinName = async (currencyName) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.get(
        `${process.env.BASE_API_URL}/users/addresses-by-currency-name?currencyName=${currencyName}`,
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
  }
  return null;
};

const getMinimumDepositLimits = async (currencyName) => {
  try {
    const res = await axios.get(
      `${process.env.BASE_API_URL}/minimum-deposit-limits/minimum-debosit-limits-by-currency-name?currencyName=${currencyName}`
    );
    if (res.error) return null;
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getNetworksCurrencies = async () => {
  try {
    const res = await axios.get(
      `${process.env.BASE_API_URL}/currencies/all-supported-currencies-by-networks`
    );
    if (res.error) return null;
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getFeesByCoinNameAndNetwork = async (
  transferCurrencyType,
  transferType,
  currencyName,
  network
) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    let url;
    if (type === "crypto") {
      url = `${process.env.BASE_API_URL}/transfer-fees/fee-by-transfer-info?transferType=${transferType}&transferCurrencyType=${transferCurrencyType}&network=${network}&currencyName${currencyName}`;
    } else {
      url = `${process.env.BASE_API_URL}/transfer-fees/fee-by-transfer-info?transferType=${transferType}&transferCurrencyType=${transferCurrencyType}&currencyName${currencyName}`;
    }
    try {
      const res = await axios.get(url);
      if (res.error) return null;
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  return null;
};

const getTransferLimitsByCoinNameAndNetwork = async (
  transferCurrencyType,
  transferType,
  currencyName,
  network
) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    let url;
    if (transferType === "crypto") {
      url = `${process.env.BASE_API_URL}/transfer-limits/trasfer-limits-by-transfer-info?transferType=${transferType}&transferCurrencyType=${transferCurrencyType}&network=${network}&currencyName${currencyName}`;
    } else {
      url = `${process.env.BASE_API_URL}/transfer-limits/trasfer-limits-by-transfer-info?transferType=${transferType}&transferCurrencyType=${transferCurrencyType}&currencyName${currencyName}`;
    }
    try {
      const res = await axios.get(url);
      if (res.error) return null;
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  return null;
};

const transferMoney = async (
  transferCurrencyType,
  transferType,
  currencyName,
  network,
  receipentAddress,
  amount
) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.get(
        `${process.env.BASE_API_URL}/users/send-money`,
        transferCurrencyType === "crypto"
          ? {
              transferCurrencyType,
              transferType,
              currencyName,
              receipentAddress,
              network,
              amount,
            }
          : {},
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

export {
  getBalanceCoins,
  getAddressesByCoinName,
  getNetworksCurrencies,
  getMinimumDepositLimits,
  getFeesByCoinNameAndNetwork,
  getTransferLimitsByCoinNameAndNetwork,
  transferMoney,
};
