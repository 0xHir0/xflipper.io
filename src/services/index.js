import { ethers } from 'ethers';
import { useContractCall } from '@usedapp/core';
import RarityAPI from '../abis/RarityContract.json';
import { rarityContractAddress } from '../contracts';

const rarityContractInterface = new ethers.utils.Interface(RarityAPI);

export const useCount = () => {
  const [count] =
    useContractCall({
      abi: rarityContractInterface,
      address: rarityContractAddress,
      methods: 'count',
      args: [],
    }) ?? [];

  return count;
};

export const useGestationApprove = () => {
  const { state, send } = useContractFunction(
    mongooseContract,
    'gestationApprove',
    {}
  );

  return { state, send };
};

export const useGiveBirth = () => {
  const { state, send } = useContractFunction(
    mongooseContract,
    'giveBirth',
    {}
  );

  return { state, send };
};

export const useSafeMint = (value) => {
  const { state, send } = useContractFunction(mongooseContract, 'safeMint', {
    value: value,
  });

  return { state, send };
};

export const useSafeMintWithSignature = () => {
  const { state, send } = useContractFunction(
    mongooseContract,
    'safeMintWithSignature',
    {}
  );

  return { state, send };
};

export const useTransferOwnership = () => {
  const { state, send } = useContractFunction(
    mongooseContract,
    'transferOwnership',
    {}
  );

  return { state, send };
};
