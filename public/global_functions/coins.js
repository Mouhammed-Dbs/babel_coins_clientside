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
    if (transferCurrencyType === "crypto") {
      url = `${process.env.BASE_API_URL}/transfer-fees/fee-by-transfer-info?transferType=${transferType}&transferCurrencyType=${transferCurrencyType}&network=${network}&currencyName=${currencyName}`;
    } else {
      url = `${process.env.BASE_API_URL}/transfer-fees/fee-by-transfer-info?transferType=${transferType}&transferCurrencyType=${transferCurrencyType}&currencyName=${currencyName}`;
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
    if (transferCurrencyType === "crypto") {
      url = `${process.env.BASE_API_URL}/transfer-limits/trasfer-limits-by-transfer-info?transferType=${transferType}&transferCurrencyType=${transferCurrencyType}&network=${network}&currencyName=${currencyName}`;
    } else {
      url = `${process.env.BASE_API_URL}/transfer-limits/trasfer-limits-by-transfer-info?transferType=${transferType}&transferCurrencyType=${transferCurrencyType}&currencyName=${currencyName}`;
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
  receiverAddress,
  receiverAccountName,
  amount
) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.post(
        `${process.env.BASE_API_URL}/transfers/send-money`,
        transferCurrencyType === "crypto"
          ? getDataByTransferType({
              transferCurrencyType,
              transferType,
              currencyName,
              receiverAddress,
              receiverAccountName,
              network,
              amount,
            })
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

const getDataByTransferType = (data) => {
  if (data.transferType === "external")
    return {
      transferCurrencyType: data.transferCurrencyType,
      transferType: data.transferType,
      currencyName: data.currencyName,
      receiverAddress: data.receiverAddress,
      network: data.network,
      amount: data.amount,
    };
  return {
    transferCurrencyType: data.transferCurrencyType,
    transferType: data.transferType,
    currencyName: data.currencyName,
    receiverAccountName: data.receiverAccountName,
    network: data.network,
    amount: data.amount,
  };
};

const getOperationsCount = async (operationType, filters) => {
  try {
    const res = await axios.get(
      `${process.env.BASE_API_URL}/${operationType}/${operationType}-count?${
        filters ? filters : ""
      }`
    );
    if (res.error) return null;
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getOperations = async (operationType, pageNumber, pageSize, filters) => {
  try {
    const res = await axios.get(
      `${
        process.env.BASE_API_URL
      }/${operationType}/all-${operationType}-inside-the-page?pageNumber=${pageNumber}&pageSize=${pageSize}&${
        filters ? filters : ""
      }`
    );
    if (res.error) return null;
    return res.data;
  } catch (error) {
    throw error;
  }
};

const exchange = async (
  sellCurrencyName,
  buyCurrencyName,
  sellCurrencyAmount
) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.post(
        `${process.env.BASE_API_URL}/exchanges/add-new-exchange`,
        { sellCurrencyName, buyCurrencyName, sellCurrencyAmount },
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

const getExchangeFee = async (sellCurrencyName, buyCurrencyName) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.get(
        `${process.env.BASE_API_URL}/exchange-fees/fee-by-exchange-info?sellCurrencyName=${sellCurrencyName}&buyCurrencyName=${buyCurrencyName}`,
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

export {
  getBalanceCoins,
  getAddressesByCoinName,
  getNetworksCurrencies,
  getMinimumDepositLimits,
  getFeesByCoinNameAndNetwork,
  getTransferLimitsByCoinNameAndNetwork,
  transferMoney,
  getOperationsCount,
  getOperations,
  exchange,
  getExchangeFee,
};
