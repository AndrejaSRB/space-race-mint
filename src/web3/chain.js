import { mainnet, sepolia } from 'wagmi/chains';

export const chain = (() => {
  if (process.env.NEXT_PUBLIC_CHAIN === 'sepolia') {
    return sepolia;
  }

  return mainnet;
})();
