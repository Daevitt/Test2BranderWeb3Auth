// src/lib/contracts.ts
export const DONATION_MANAGER_ADDRESS = "0x742d35cc6644c0532925a3b8d1c1a1e228b68b88"; // Cambia por tu dirección real

export const contracts = {
  donationManager: {
    address: DONATION_MANAGER_ADDRESS,
    abi: [
      // ABI básico - reemplaza con tu ABI real
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "donor",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "string",
            "name": "message",
            "type": "string"
          }
        ],
        "name": "DonationMade",
        "type": "event"
      }
    ]
  }
} as const;

export type ContractName = keyof typeof contracts;
