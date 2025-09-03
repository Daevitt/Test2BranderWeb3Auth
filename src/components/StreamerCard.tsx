import Link from 'next/link';
export default function StreamerCard({s}:{s:{nick:string,avatar:string}}) {
  return (
    <Link href={`/donaciones/${s.nick}`}>
      <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition">
        <img src={s.avatar} alt={s.nick} className="w-20 h-20 rounded-full shadow mb-2" />
        <div className="text-sm font-medium">{s.nick}</div>
      </div>
    </Link>
  );
}
