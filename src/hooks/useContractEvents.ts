// src/hooks/useContractEvents.ts

import { useContractEvents } from "wagmi";
import { contracts, type ContractConfig } from "@/lib/contracts";

//
// Definición de eventos que quieres escuchar
//
interface EventConfig {
  contract: ContractConfig;
  eventName: string;
}

const eventsToWatch: EventConfig[] = [
  {
    contract: contracts.donation,
    eventName: "DonationReceived", // 👈 cambia al nombre real del evento en tu ABI
  },
  {
    contract: contracts.erc20,
    eventName: "Transfer", // estándar en ERC20
  },
];

//
// Hook centralizado
//
export function useAppContractEvents() {
  const eventResults = eventsToWatch.map((e) =>
    useContractEvents({
      address: e.contract.address,
      abi: e.contract.abi,
      chainId: e.contract.chainId,
      eventName: e.eventName as any, // forzamos a any porque wagmi no infiere bien de arrays dinámicos
      listener: (logs) => {
        console.log(`📡 Evento ${e.eventName} detectado en ${e.contract.address}`);
        console.log("Logs:", logs);
      },
    })
  );

  return eventResults;
}
