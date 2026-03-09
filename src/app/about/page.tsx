import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--ivory)' }}>
            {/* Hero */}
            <div style={{ position: 'relative', height: 480, background: 'var(--charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600" alt="Heritage weavers" fill style={{ objectFit: 'cover', opacity: 0.4 }} sizes="100vw" />
                <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: 16 }}>Our Story</span>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 400, color: 'white', lineHeight: 1.15 }}>Seven Decades of Silk Mastery</h1>
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: 12 }}>Est. 1952</span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--charcoal)', marginBottom: 24 }}>Born in Ahmedabad. Worn across Bharat.</h2>
                    <p style={{ fontSize: 16, lineHeight: 1.9, color: '#555', marginBottom: 20 }}>
                        Patolaplace was founded in 1952 by Shri Rameshwar Das Gupta, a visionary weaver who believed that India&apos;s silk tradition deserved to be celebrated, not just preserved. Starting with a single loom in the historic lanes of Ahmedabad, we have grown into one of India&apos;s most trusted names in authentic handwoven silk sarees.
                    </p>
                    <p style={{ fontSize: 16, lineHeight: 1.9, color: '#555', marginBottom: 20 }}>
                        Over 70 years and three generations later, we work with 50+ master weavers across Kanchipuram, Varanasi, Chanderi, Paithan and Mysore. Every saree we sell carries a certificate of authenticity and tells the story of the artisan who created it.
                    </p>
                    <p style={{ fontSize: 16, lineHeight: 1.9, color: '#555' }}>
                        We believe that wearing an authentic silk saree is not just fashion — it is a connection to India&apos;s 5,000-year-old textile heritage. Our mission is to ensure that every Indian woman has access to the finest, most authentic sarees, delivered with love.
                    </p>
                </div>

                {/* Values grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 60 }}>
                    {[
                        { icon: '🏛️', title: 'Heritage First', desc: 'Every weave technique we support has been practiced for centuries. We never compromise on tradition.' },
                        { icon: '✅', title: 'Authenticity Guaranteed', desc: 'All our sarees come with a certificate of authenticity. GI tags where applicable.' },
                        { icon: '🤝', title: 'Artisan First', desc: 'We pay our weavers fairly and attribute every saree to its creator. No middlemen.' },
                    ].map(v => (
                        <div key={v.title} style={{ padding: 32, background: 'white', borderRadius: 16, textAlign: 'center', border: '1px solid rgba(201,168,76,0.15)' }}>
                            <span style={{ fontSize: 36, display: 'block', marginBottom: 12 }}>{v.icon}</span>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 10 }}>{v.title}</h3>
                            <p style={{ fontSize: 14, color: '#777', lineHeight: 1.7 }}>{v.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
