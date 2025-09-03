import { useState } from 'react';
import StreamerCard from '@/components/StreamerCard';
import { streamers } from '@/lib/streamers';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  const [q, setQ] = useState('');
  const filtered = streamers.filter(s=> s.nick.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="min-h-screen p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Brander - Donaciones</h1>
        <ConnectButton />
      </header>
      <div className="max-w-4xl mx-auto">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Buscar streamer..." className="w-full p-3 border rounded mb-6" />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6">
          {filtered.map(s=> <StreamerCard key={s.nick} s={s} />)}
        </div>
      </div>
    </div>
  )
}
