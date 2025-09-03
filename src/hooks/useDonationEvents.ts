// src/hooks/useDonationEvents.ts
import { useWatchContractEvent } from "wagmi";
import { contracts, DONATION_MANAGER_ADDRESS } from "@/lib/contracts";

export function useDonationEvents() {
  useWatchContractEvent({
    address: DONATION_MANAGER_ADDRESS,
    abi: contracts.donations.abi,
    eventName: "DonationReceived",
    onLogs: (logs) => {
      console.log("📡 Evento DonationReceived detectado:", logs);
    },
  });
}
