import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import CategoryBanner from '@/components/home/CategoryBanner';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Testimonials from '@/components/home/Testimonials';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patolaplace — Luxury Indian Sarees | Pure Silk, Handcrafted in India',
  description: 'Discover India\'s finest Kanjivaram, Banarasi, Chanderi, Mysore Silk and Paithani sarees. Handcrafted by master weavers. Authenticity guaranteed.',
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />

      {/* Heritage strip */}
      <div style={{
        background: 'var(--charcoal)',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        flexWrap: 'wrap',
      }}>
        {['🇮🇳 Made in India', '✦ GI Certified Sarees', '🚚 Free Shipping ₹2,999+', '↩️ 15-Day Returns', '⭐ 4.9/5 Rating'].map(t => (
          <span key={t} style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>{t}</span>
        ))}
      </div>

      <CategoryBanner />

      {/* Editorial banner */}
      <section style={{ background: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Our Heritage</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: 'var(--charcoal)', lineHeight: 1.2, marginBottom: 24 }}>
              Seven Decades of Weaving India&apos;s Finest Silks
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#666', marginBottom: 16 }}>
              Founded in 1952 in the sacred city of Varanasi, we have spent over seven decades preserving the art of Indian silk weaving. Each saree is a testament to the unmatched skill of our artisans.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#666', marginBottom: 32 }}>
              From the gilded looms of Kanchipuram to the brocade workshops of Varanasi — we bring you India&apos;s authentic textile heritage, delivered to your doorstep with a certificate of authenticity.
            </p>
            <Link href="/about" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 32px', background: 'var(--charcoal)', color: 'white',
              borderRadius: 4, fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>Our Story →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { n: '500+', l: 'Unique Designs' },
              { n: '70+', l: 'Years of Heritage' },
              { n: '10K+', l: 'Happy Customers' },
              { n: '50+', l: 'Master Weavers' },
            ].map(s => (
              <div key={s.l} style={{
                padding: '32px 24px', background: 'white', borderRadius: 12,
                border: '1px solid rgba(201,168,76,0.15)', textAlign: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1 }}>{s.n}</p>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: 8 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts />

      {/* Bridal Edit CTA */}
      <section style={{
        background: 'var(--gradient-burgundy)',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: 16 }}>✦ Exclusively Curated ✦</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.15, marginBottom: 16 }}>
          The Bridal Edit
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', maxWidth: 520, margin: '0 auto 36px' }}>
          Handpicked bridal sarees in pure Kanjivaram, Banarasi, Mysore Silk and Paithani. Begin your forever draped in heritage.
        </p>
        <Link href="/products?occasion=Bridal" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '16px 40px', background: 'var(--gradient-gold)',
          color: 'var(--charcoal)', borderRadius: 4, fontSize: 13, fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 8px 32px rgba(201,168,76,0.4)',
        }}>Explore Bridal Collection →</Link>
      </section>

      <Testimonials />
    </>
  );
}
