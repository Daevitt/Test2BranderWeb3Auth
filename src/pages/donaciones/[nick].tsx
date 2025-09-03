import { useRouter } from 'next/router';
import { streamers } from '@/lib/streamers';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import useDonationEvents from '@/hooks/useDonationEvents';

export default function DonacionPage(){
  const router = useRouter();
  const { nick } = router.query;
  const s = streamers.find(x=> x.nick === nick);
  const { address, isConnected } = useAccount();
  const [donation, setDonation] = useState('');
  const [notif, setNotif] = useState<string|null>(null);

  useDonationEvents((msg)=> {
    if ((window as any).__addNotif) (window as any).__addNotif(msg);
    setNotif(msg);
  });

  useEffect(()=> { if (notif) setTimeout(()=> setNotif(null),5000); }, [notif]);

  if (!s) return <div className="p-6">Streamer no encontrado</div>;
  return (
    <div className="p-6 max-w-xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Donaciones a {s.nick}</h1>
        <ConnectButton />
      </header>
      <div className="flex flex-col items-center mb-6">
        <img src={s.avatar} className="w-28 h-28 rounded-full shadow mb-2" />
        <h2 className="text-2xl font-semibold">{s.nick}</h2>
      </div>

      {!isConnected ? (
        <div className="p-4 bg-gray-100 rounded">Conecta tu wallet para donar</div>
      ):(
        <div className="p-4 bg-white rounded shadow">
          <input type="number" value={donation} onChange={(e)=>setDonation(e.target.value)} className="w-full p-3 border rounded mb-3" placeholder="Monto (ETH)" />
          <button className="w-full bg-green-600 text-white p-3 rounded" onClick={()=> alert('Aquí se llamaría donateERC20/donateETH al contrato')}>Donar</button>
        </div>
      )}
    </div>
  )
}
