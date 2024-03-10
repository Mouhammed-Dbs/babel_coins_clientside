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

const getFeesByCoinNameAndNetwork = async (currencyName, network) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.get(
        `${process.env.BASE_API_URL}/transfer-fees/fee-by-currency-and-network-name?currencyName=${currencyName}&network=${network}`
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
};
