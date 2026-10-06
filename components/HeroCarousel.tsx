'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const slides = [
  { src: '/images/memorial-flowers.png', alt: 'White memorial flowers and a candle arranged with care' },
  { src: '/images/memorial-candles.jpg', alt: 'A quiet memorial candle in a peaceful indoor setting' },
  { src: '/images/white-rose.jpg', alt: 'A white rose held during a memorial service' },
]

export function HeroCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="hero-carousel" aria-label="Peaceful scenes from Elijah Farewell Services">
      {slides.map((slide, index) => (
        <div className={`hero-slide${active === index ? ' is-active' : ''}`} key={slide.src}>
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            priority={index === 0}
          />
        </div>
      ))}
      <div className="hero-progress" aria-label="Choose a hero image">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={active === index ? 'is-active' : ''}
            onClick={() => setActive(index)}
            aria-label={`Show image ${index + 1}`}
            aria-current={active === index ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}
