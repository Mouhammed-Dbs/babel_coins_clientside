'use client'
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const BalanceContext = createContext();

export const MyCoins = ({ children }) => {
  const [coins, setCoins] = useState([1]);
  const getCoins = async () => {
    try {
      const res = await axios.get(
        `${process.env.BASE_API_URL}/users/all-accounts/${localStorage.getItem(
          "babel-coins-user-id"
        )}`
      );
      const result = res.data;
      if (!result.error) {
        setCoins(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCoins();
  }, []);
  return (
    <BalanceContext.Provider value={{ coins, setCoins}}>
      {children}
    </BalanceContext.Provider>
  );
};