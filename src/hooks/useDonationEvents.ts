// src/hooks/useDonationEvents.ts
import { useWatchContractEvent } from 'wagmi'
import donationAbi from '@/lib/contracts'
import { DONATION_MANAGER_ADDRESS } from '@/lib/contracts'

export function useDonationEvents() {
  useWatchContractEvent({
    address: DONATION_MANAGER_ADDRESS,
    abi: donationAbi,
    eventName: 'DonationReceived',
    onLogs: (logs) => {
      logs.forEach((log) => {
        // ahora log.args ya viene tipado por wagmi
        const { donor, streamer, token, amount, factor } = log.args

        console.log('📢 DonationReceived:', {
          donor,
          streamer,
          token,
          amount: amount.toString(),
          factor: factor.toString(),
        })
      })
    },
    onError: (err) => {
      console.error('❌ Error in DonationReceived watcher:', err)
    },
  })
}
