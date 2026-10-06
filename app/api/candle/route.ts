import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { z } from 'zod'
export async function POST(req:Request){const parsed=z.object({id:z.string().uuid()}).safeParse(await req.json());if(!parsed.success)return NextResponse.json({error:'Invalid memorial.'},{status:400});try{const exists=await kv.exists(`memorial:${parsed.data.id}`);if(!exists)return NextResponse.json({error:'Memorial not found.'},{status:404});const count=await kv.incr(`candles:${parsed.data.id}`);return NextResponse.json({count})}catch{return NextResponse.json({error:'The candle could not be lit.'},{status:500})}}
