'use client'
export default function GlobalError({reset}:{reset:()=>void}){return <html><body><section className="section family-note" style={{minHeight:'100vh',display:'grid',placeItems:'center'}}><div><p className="kicker">A quiet interruption</p><h1>Something went wrong. Please try again.</h1><button className="btn" onClick={reset}>Try Again</button></div></section></body></html>}
