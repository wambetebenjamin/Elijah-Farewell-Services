'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X, Phone, MessageCircle, Facebook, Flower2 } from 'lucide-react'
import { phoneDisplay, phoneHref, whatsapp } from '@/data/site'

const nav = [['Home','/'],['Our Services','/#services'],['Pre-Planning','/pre-planning'],['Memorials','/memorials'],['Grief Support','/grief-support'],['About Us','/about'],['Contact','/contact']]

export function Header(){
 const [open,setOpen]=useState(false)
 return <header className="site-header"><div className="nav-wrap">
  <Link href="/" className="brand" aria-label="Elijah Farewell Services home"><Flower2 size={30}/><span><b>Elijah</b><small>Farewell Services</small></span></Link>
  <nav className={open?'nav-links open':'nav-links'} aria-label="Main navigation">{nav.map(([n,h])=><Link key={n} href={h} onClick={()=>setOpen(false)}>{n}</Link>)}</nav>
  <a className="helpline" href={phoneHref}><Phone size={16}/><span><small>24-hour helpline</small>{phoneDisplay}</span></a>
  <button className="menu" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button>
 </div></header>
}

export function Footer(){return <footer><div className="footer-grid"><div><Link href="/" className="brand inverse"><Flower2/><span><b>Elijah</b><small>Farewell Services</small></span></Link><p>Quiet guidance, practical care and a steady presence for Nairobi families—day or night.</p><a href={phoneHref}>{phoneDisplay}</a></div><div><h3>Our care</h3><Link href="/#services">Funeral services</Link><Link href="/pre-planning">Pre-planning</Link><Link href="/memorials">Online memorials</Link><Link href="/grief-support">Grief resources</Link></div><div><h3>Information</h3><Link href="/about">About us</Link><Link href="/contact">Contact</Link><Link href="/legal/privacy-policy">Privacy policy</Link><Link href="/legal/terms">Terms & conditions</Link><Link href="/legal/cookie-policy">Cookie policy</Link></div><div><h3>Stay connected</h3><a href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook size={17}/> Facebook</a><p className="small">Our office<br/>Nairobi, Kenya</p></div></div><div className="copyright">© {new Date().getFullYear()} Elijah Farewell Services. All rights reserved.</div></footer>}

export function WhatsApp(){return <a className="whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Speak to our team on WhatsApp"><MessageCircle/><span>Speak to our team. We are here.</span></a>}

export function Loader(){const [show,setShow]=useState(true);useEffect(()=>{const t=setTimeout(()=>setShow(false),1200);return()=>clearTimeout(t)},[]); if(!show)return null;return <div className="loader" aria-hidden="true"><i/><Flower2/><i/></div>}

export function CookieConsent(){const [show,setShow]=useState(false),[manage,setManage]=useState(false),[analytics,setAnalytics]=useState(false);useEffect(()=>setShow(!localStorage.getItem('efs-cookie-consent')),[]);const save=(value:string)=>{localStorage.setItem('efs-cookie-consent',JSON.stringify({necessary:true,analytics:value==='all'||analytics,date:new Date().toISOString()}));setShow(false)};if(!show)return null;return <><aside className="cookie"><p><b>Your privacy matters.</b> Elijah Farewell Services uses cookies to remember your preferences and improve your experience. See our <Link href="/legal/cookie-policy">Cookie Policy</Link>.</p><div><button className="btn" onClick={()=>save('all')}>Accept All</button><button className="btn outline" onClick={()=>setManage(true)}>Manage Preferences</button></div></aside>{manage&&<div className="modal-back"><section className="modal" role="dialog" aria-modal="true"><button className="close" onClick={()=>setManage(false)}><X/></button><p className="kicker">Cookie preferences</p><h2>Choose what feels right</h2><div className="toggle-row"><span><b>Necessary</b><small>Required for the website to function.</small></span><input type="checkbox" checked disabled/></div><div className="toggle-row"><span><b>Analytics</b><small>Helps us understand how the site is used.</small></span><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)}/></div><button className="btn" onClick={()=>save('custom')}>Save Preferences</button></section></div>}</>}
