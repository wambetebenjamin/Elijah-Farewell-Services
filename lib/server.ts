import nodemailer from 'nodemailer'
import { kv } from '@vercel/kv'

export async function verifyCaptcha(token?:string){
 if(!process.env.RECAPTCHA_SECRET_KEY){if(process.env.NODE_ENV==='development')return {success:true,score:1};return {success:false,score:0,error:'CAPTCHA is not configured'}}
 if(!token)return {success:false,score:0,error:'Please complete the security check.'}
 const body=new URLSearchParams({secret:process.env.RECAPTCHA_SECRET_KEY,response:token})
 const response=await fetch('https://www.google.com/recaptcha/api/siteverify',{method:'POST',body,cache:'no-store'})
 const data=await response.json() as {success:boolean;score?:number}
 return {success:data.success&&(data.score??1)>=.5,score:data.score??0,requiresV2:data.success&&(data.score??1)<.5,error:data.success?'Please complete the additional security check.':'Security check failed.'}
}
export async function save(key:string,value:unknown){try{await kv.set(key,value)}catch(e){if(process.env.NODE_ENV==='production')throw e}}
export async function sendTeamMail(subject:string,data:Record<string,unknown>){
 if(!process.env.SMTP_HOST||!process.env.TEAM_EMAIL)return
 const transport=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:Number(process.env.SMTP_PORT)===465,auth:process.env.SMTP_USER?{user:process.env.SMTP_USER,pass:process.env.SMTP_PASSWORD}:undefined})
 const text=Object.entries(data).map(([k,v])=>`${k}: ${String(v)}`).join('\n')
 await transport.sendMail({from:process.env.MAIL_FROM||process.env.SMTP_USER,to:process.env.TEAM_EMAIL,subject,text})
}
export function clean(value:unknown,max=3000){return typeof value==='string'?value.trim().slice(0,max):''}
