import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { z } from 'zod'
import { verifyCaptcha } from '@/lib/server'
export async function POST(req:Request){const raw=await req.json();const parsed=z.object({email:z.string().email(),captchaToken:z.string().optional()}).safeParse(raw);if(!parsed.success)return NextResponse.json({error:'Please enter a valid email address.'},{status:400});const captcha=await verifyCaptcha(parsed.data.captchaToken);if(!captcha.success)return NextResponse.json({error:captcha.error,requiresV2:captcha.requiresV2},{status:400});try{await kv.sadd('newsletter:subscribers',parsed.data.email.toLowerCase())}catch(e){if(process.env.NODE_ENV==='production')return NextResponse.json({error:'Please try again later.'},{status:500})}return NextResponse.json({message:'Thank you. Your first gentle resource will arrive soon.'})}
