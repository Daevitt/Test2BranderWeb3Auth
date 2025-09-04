// src/hooks/useContractEvents.ts

import { useWatchContractEvent } from "wagmi";
import { contracts, type ContractConfig } from "@/lib/contracts";
import { useCallback, useState } from "react";

// Definición de eventos que quieres escuchar
export interface ContractEvent {
  eventName: string;
  args: any[];
  blockNumber: bigint;
  transactionHash: string;
  address: string;
  timestamp?: number;
}

export interface UseContractEventsProps {
  contractName?: keyof typeof contracts;
  eventName?: string;
  enabled?: boolean;
  onEvent?: (event: ContractEvent) => void;
}

export function useContractEvents({
  contractName = 'donationManager',
  eventName = 'DonationMade',
  enabled = true,
  onEvent
}: UseContractEventsProps = {}) {
  const [events, setEvents] = useState<ContractEvent[]>([]);
  const [isListening, setIsListening] = useState(enabled);

  const contract = contracts[contractName];

  const handleLogs = useCallback((logs: any[]) => {
    const newEvents = logs.map((log): ContractEvent => ({
      eventName: log.eventName || eventName,
      args: log.args ? Object.values(log.args) : [],
      blockNumber: log.blockNumber || BigInt(0),
      transactionHash: log.transactionHash || '',
      address: log.address || contract.address,
      timestamp: Date.now()
    }));

    setEvents(prev => [...prev, ...newEvents]);
    
    // Llamar callback personalizado si existe
    newEvents.forEach(event => onEvent?.(event));
  }, [eventName, contract.address, onEvent]);

  const handleError = useCallback((error: Error) => {
    console.error('Contract event error:', error);
  }, []);

  useWatchContractEvent({
    address: contract.address as `0x${string}`,
    abi: contract.abi,
    eventName: eventName as any,
    onLogs: handleLogs,
    onError: handleError,
    enabled: isListening && enabled,
  });

  const startListening = useCallback(() => {
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  const getEventsByType = useCallback((type: string) => {
    return events.filter(event => event.eventName === type);
  }, [events]);

  return {
    events,
    isListening,
    startListening,
    stopListening,
    clearEvents,
    getEventsByType,
    eventsCount: events.length
  };
}
