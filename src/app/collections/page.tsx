import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/products';

export default function CollectionsPage() {
    const imgs = [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800',
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--ivory)' }}>
            <div style={{ background: 'var(--charcoal)', padding: '60px 24px', textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>All Collections</span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: 'white' }}>Our Heritage Collections</h1>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginTop: 12 }}>Eight centuries of weaving mastery, curated for the modern woman</p>
            </div>
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
                {categories.map((cat, i) => (
                    <Link key={cat.id} href={`/products?category=${cat.id}`} style={{
                        position: 'relative', borderRadius: 16, overflow: 'hidden', display: 'block',
                        aspectRatio: '3/4', background: 'var(--ivory-dark)', textDecoration: 'none',
                    }}>
                        <Image src={imgs[i]} alt={cat.name} fill style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }} sizes="25vw" />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(28,28,30,0.85) 100%)' }} />
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24 }}>
                            <span style={{ fontSize: 24 }}>{cat.icon}</span>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'white', margin: '8px 0 4px' }}>{cat.name}</h3>
                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>{cat.description}</p>
                            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold-light)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{cat.count} designs</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
