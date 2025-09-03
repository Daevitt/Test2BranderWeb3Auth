// src/lib/contracts.ts

import donationAbi from "@/lib/contracts";
import erc20Abi from "@/lib/contracts";

//
// Define las cadenas soportadas
//
export type SupportedChainId = 1 | 8453; // 1 = Ethereum mainnet, 8453 = Base. Agrega más si necesitas

//
// Tipado de dirección estricta
//
export type Address = `0x${string}`;

//
// Contrato genérico
//
export interface ContractConfig {
  address: Address;
  abi: typeof donationAbi | typeof erc20Abi;
  chainId: SupportedChainId;
}

//
// Aquí centralizas todos tus contratos
//
export const contracts = {
  donation: {
    address: "0x0000000000000000000000000000000000000000" as Address, // 👈 pon tu dirección real
    abi: donationAbi,
    chainId: 8453, // Base mainnet (puedes cambiar a 1 si es Ethereum)
  },
  erc20: {
    address: "0x0000000000000000000000000000000000000000" as Address, // 👈 pon tu dirección real
    abi: erc20Abi,
    chainId: 8453,
  },
} satisfies Record<string, ContractConfig>;

//
// Helper: array de contratos si lo necesitas para iterar
//
export const contractsArray = Object.values(contracts);
