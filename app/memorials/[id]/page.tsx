import { kv } from '@vercel/kv'
import { notFound } from 'next/navigation'
import Candle from '@/components/Candle'
export const dynamic='force-dynamic'
type Memorial={id:string;name:string;birthDate:string;passingDate:string;photoUrl:string;tribute:string;createdAt:string}
export async function generateMetadata({params}:{params:{id:string}}){try{const m=await kv.get<Memorial>(`memorial:${params.id}`);return {title:m?`In memory of ${m.name}`:'Memorial'}}catch{return {title:'Memorial'}}}
export default async function MemorialPage({params}:{params:{id:string}}){let memorial:Memorial|null=null,count=0;try{[memorial,count]=await Promise.all([kv.get<Memorial>(`memorial:${params.id}`),kv.get<number>(`candles:${params.id}`).then(x=>x||0)])}catch{}if(!memorial)notFound();return <section className="section family-note"><div className="memorial-shell"><p className="kicker">In loving memory</p><h1 className="display">{memorial.name}</h1><p className="dates">{memorial.birthDate} — {memorial.passingDate}</p><img className="portrait" src={memorial.photoUrl} alt={`Portrait of ${memorial.name}`}/><p className="tribute">“{memorial.tribute}”</p><Candle id={memorial.id} initial={count}/></div></section>}
