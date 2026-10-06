import { NextResponse } from 'next/server'
import { verifyCaptcha } from '@/lib/server'
export async function POST(req:Request){const {token}=await req.json();const result=await verifyCaptcha(token);return NextResponse.json(result,{status:result.success?200:400})}
