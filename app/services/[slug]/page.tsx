import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { services } from '@/data/site'
export const revalidate=3600
export function generateStaticParams(){return services.map(s=>({slug:s.slug}))}
export default function ServicePage({params}:{params:{slug:string}}){const s=services.find(x=>x.slug===params.slug);if(!s)notFound();return <><section className="page-hero" style={{backgroundImage:`url('${s.image}')`}}><div><p className="kicker">{s.eyebrow}</p><h1 className="display">{s.name}</h1><p>{s.description}</p></div></section><section className="section"><div className="content"><p className="kicker">How we help</p><h2>A steady hand through every decision</h2><p>{s.full}</p><h2>What is included</h2><ul>{s.included.map(x=><li key={x}><Check size={16}/> {x}</li>)}</ul><h2>What your family can expect</h2><ol className="steps">{s.steps.map(x=><li key={x}>{x}</li>)}</ol><h2>How to get started</h2><p>Call at any hour, or send a quiet enquiry. We will listen first and explain what can happen next.</p><Link href="/contact" className="btn">Enquire Now <ArrowRight size={16}/></Link></div></section></>}
