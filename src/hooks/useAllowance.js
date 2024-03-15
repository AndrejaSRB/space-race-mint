import { useReadContract, useAccount } from "wagmi";
import { getMerkleProof } from "@/web3/merkle/merkle";
import AbiObject from "../../abi2";

const useAllownace = () => {
  const { address } = useAccount();

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT;


  const { data, refetch, loading, error } = useReadContract({
    abi: AbiObject.abi,
    address: process.env.NEXT_PUBLIC_ERC20_ADDRESS,
    functionName: 'allowance',
    args: [address, contractAddress],
  });

  const convertedData = Number(data);
  return { data: Boolean(convertedData), refetch, loading };
};

export default useAllownace;
