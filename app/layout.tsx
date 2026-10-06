import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import { Header, Footer, WhatsApp, Loader, CookieConsent } from '@/components/SiteChrome'
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||'https://elijahfarewellservices.co.ke'),title:{default:'Elijah Farewell Services | Compassionate Care in Nairobi',template:'%s | Elijah Farewell Services'},description:'Compassionate funeral services, cremation, burial, memorial planning and grief support in Nairobi, available 24 hours.'}
const schema={"@context":"https://schema.org","@type":"FuneralHome","name":"Elijah Farewell Services","telephone":"+254112272061","address":{"@type":"PostalAddress","addressLocality":"Nairobi","addressCountry":"KE"},"areaServed":"Nairobi, Kenya","openingHours":"Mo-Su 00:00-23:59"}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Loader/><Header/><main>{children}</main><Footer/><WhatsApp/><CookieConsent/>{process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY&&<Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} strategy="afterInteractive"/>}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>}
