import { useState } from 'react';
import { streamers } from '@/lib/streamers';
import useDonationEvents from '@/hooks/useDonationEvents';

export default function AdminWeb(){
  const [list, setList] = useState(streamers);
  useDonationEvents((m)=> console.log('donation event', m));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Web</h1>
      <p className="mb-4">Aquí puedes administrar la lista web de streamers (no cambia contratos).</p>
      <ul>
        {list.map(s=> <li key={s.nick} className="mb-2">{s.nick}</li>)}
      </ul>
    </div>
  )
}
