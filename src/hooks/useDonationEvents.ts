// src/hooks/useDonationEvents.ts
import { useWatchContractEvent } from "wagmi";
import { contracts, DONATION_MANAGER_ADDRESS } from "@/lib/contracts";
import { useCallback, useState } from "react";

export interface DonationEvent {
  donor: string;
  amount: bigint;
  message: string;
  blockNumber: bigint;
  transactionHash: string;
}

export function useDonationEvents() {
  const [events, setEvents] = useState<DonationEvent[]>([]);

  const handleLog = useCallback((logs: any[]) => {
    const newEvents = logs.map((log) => ({
      donor: log.args?.donor || '',
      amount: log.args?.amount || BigInt(0),
      message: log.args?.message || '',
      blockNumber: log.blockNumber || BigInt(0),
      transactionHash: log.transactionHash || '',
    }));
    
    setEvents((prev) => [...prev, ...newEvents]);
  }, []);

  useWatchContractEvent({
    address: DONATION_MANAGER_ADDRESS as `0x${string}`,
    abi: contracts.donationManager.abi,
    eventName: 'DonationMade',
    onLogs: handleLog,
    enabled: true,
  });

  return {
    events,
    clearEvents: () => setEvents([])
  };
}
