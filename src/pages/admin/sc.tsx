import { useEffect, useState } from 'react';
import useDonationEvents from '@/hooks/useDonationEvents';

export default function AdminSC(){
  const [params, setParams] = useState<any>(null);
  useDonationEvents((m)=> console.log('donation', m));

  useEffect(()=> {
    setParams({ rarities: ['common','rare','epic','legendary'], defaultFactor: 100 });
  },[]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Smart Contracts</h1>
      <pre>{JSON.stringify(params,null,2)}</pre>
    </div>
  )
}
