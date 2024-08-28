import axios from "axios";

const getInitialTrageOrders = async (
  firstCurrencyName = "",
  secondCurrencyName = ""
) => {
  try {
    const res = await axios.get(
      `${process.env.BASE_API_URL}/trade-orders/initial-trade-page-orders?firstCurrencyName=${firstCurrencyName}&secondCurrencyName=${secondCurrencyName}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getOrders = async () => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.get(
        `${process.env.BASE_API_URL}/trade-orders/all-orders-inside-the-page`,
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

const addMarketOrder = async (
  firstCurrencyName,
  secondCurrencyName,
  amount,
  orderAction
) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.post(
        `${process.env.BASE_API_URL}/trade-orders/add-new-market-order`,
        { firstCurrencyName, secondCurrencyName, amount, orderAction },
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

const addLimitOrder = async (
  firstCurrencyName,
  secondCurrencyName,
  amount,
  price,
  orderType,
  orderAction,
  stopPrice = undefined
) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const q = {
        firstCurrencyName,
        secondCurrencyName,
        amount,
        price,
        orderType,
        orderAction,
      };
      const body = orderType != "stop-limit" ? q : { ...q, stopPrice };
      const res = await axios.post(
        `${process.env.BASE_API_URL}/trade-orders/add-new-order`,
        body,
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

export { getOrders, getInitialTrageOrders, addMarketOrder, addLimitOrder };
