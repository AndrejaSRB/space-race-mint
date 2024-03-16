import { useEffect } from 'react';
import {  useBalance } from "wagmi";

const useUserBalance = (address) => {
  const { data, refetch } = useBalance({
    address: address,
  });

  useEffect(() => {
    if(address){
      refetch()
    }
  },[address])

  return {
    data,
    refetch,
    decimals: data?.decimals,
    formatted: data?.formatted,
    bigInt: data?.value,
  };
};

export default useUserBalance;
