import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
export async function GET(_:Request,{params}:{params:{id:string}}){try{const [memorial,candles]=await Promise.all([kv.get(`memorial:${params.id}`),kv.get(`candles:${params.id}`)]);if(!memorial)return NextResponse.json({error:'Not found'},{status:404});return NextResponse.json({memorial,candles:candles||0})}catch{return NextResponse.json({error:'Unavailable'},{status:503})}}
