import React from 'react';
import Link from 'next/link';

export default function WishlistPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--ivory)', padding: '60px 24px' }}>
            <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'var(--charcoal)', marginBottom: 8 }}>Your Wishlist</h1>
                <p style={{ fontSize: 14, color: '#888', marginBottom: 40 }}>Items you&apos;ve saved for later</p>
                <p style={{ fontSize: 15, color: '#aaa', textAlign: 'center', padding: '60px 0' }}>Your wishlist is empty. <Link href="/products" style={{ color: 'var(--gold)' }}>Browse our collection →</Link></p>
            </div>
        </div>
    );
}
