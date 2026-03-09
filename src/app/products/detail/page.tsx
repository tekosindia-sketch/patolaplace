'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingBag, CheckCircle, Truck, Shield } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { getProductById, getProducts } from '@/lib/admin';
import { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import CallButton from '@/components/video/CallButton';

import { useSearchParams } from 'next/navigation';

function ProductDetailContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [product, setProduct] = useState<Product | null>(null);
    const [related, setRelated] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeImg, setActiveImg] = useState(0);
    const [qty, setQty] = useState(1);
    const { addItem } = useCart();
    const { toggle, isInWishlist } = useWishlist();

    React.useEffect(() => {
        const loadProduct = async () => {
            setIsLoading(true);
            try {
                if (!id) return;
                const p = await getProductById(id);
                if (p) {
                    setProduct(p);
                    // Fetch related sarees
                    const allProducts = await getProducts();
                    const similar = allProducts.filter(item => item.category === p.category && item.id !== p.id).slice(0, 4);
                    setRelated(similar);
                }
            } finally {
                setIsLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const inWishlist = product ? isInWishlist(product.id) : false;
    const discount = product?.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    if (isLoading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ivory)' }}>
                <div style={{ width: 40, height: 40, border: '4px solid var(--ivory-dark)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--ivory)', gap: 16 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32 }}>Saree Not Found</h2>
                <Link href="/products" style={{ color: 'var(--gold)', fontWeight: 600 }}>Back to Collections</Link>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--ivory)' }}>
            {/* Breadcrumb */}
            <div style={{ background: 'white', borderBottom: '1px solid var(--ivory-dark)', padding: '12px 24px' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#888' }}>
                    <Link href="/" style={{ color: '#888' }}>Home</Link>
                    <span>/</span>
                    <Link href="/products" style={{ color: '#888' }}>Sarees</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--charcoal)', fontWeight: 500 }}>{product.name}</span>
                </div>
            </div>

            {/* Main */}
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
                {/* Images */}
                <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {product.images.map((img, i) => (
                            <button key={i} onClick={() => setActiveImg(i)} style={{
                                width: 72, height: 90, borderRadius: 8, overflow: 'hidden', border: i === activeImg ? '2px solid var(--gold)' : '2px solid transparent',
                                cursor: 'pointer', background: 'var(--ivory-dark)', flexShrink: 0, position: 'relative',
                            }}>
                                <Image src={img} alt={`${product.name} ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="72px" />
                            </button>
                        ))}
                    </div>
                    <div style={{ flex: 1, borderRadius: 16, overflow: 'hidden', background: 'var(--ivory-dark)', position: 'relative', aspectRatio: '3/4' }}>
                        <Image src={product.images[activeImg]} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1024px) 100vw, 50vw" priority />
                        {discount > 0 && (
                            <span style={{ position: 'absolute', top: 16, left: 16, background: '#ef4444', color: 'white', padding: '4px 10px', borderRadius: 99, fontSize: 12, fontWeight: 700 }}>-{discount}%</span>
                        )}
                    </div>
                </div>

                {/* Details */}
                <div style={{ padding: '8px 0' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>{product.category}</span>
                    {product.isBestseller && <span style={{ marginLeft: 10, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--gradient-gold)', color: 'var(--charcoal)', padding: '3px 10px', borderRadius: 99 }}>Bestseller</span>}

                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 500, color: 'var(--charcoal)', margin: '12px 0 6px', lineHeight: 1.3 }}>{product.name}</h1>
                    <p style={{ fontSize: 14, color: '#777', marginBottom: 16 }}>{product.fabric} · {product.length}</p>

                    {/* Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                        <div style={{ display: 'flex', gap: 2 }}>
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill={s <= Math.round(product.rating) ? '#C9A84C' : 'none'} color={s <= Math.round(product.rating) ? '#C9A84C' : '#ddd'} />)}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)' }}>{product.rating}</span>
                        <span style={{ fontSize: 13, color: '#aaa' }}>({product.reviewCount} reviews)</span>
                    </div>

                    {/* Price */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24, padding: '16px 0', borderTop: '1px solid var(--ivory-dark)', borderBottom: '1px solid var(--ivory-dark)' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, color: 'var(--charcoal)' }}>₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && <span style={{ fontSize: 18, color: '#bbb', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>}
                        {discount > 0 && <span style={{ fontSize: 14, fontWeight: 700, color: '#22c55e' }}>{discount}% off</span>}
                    </div>

                    <p style={{ fontSize: 14, lineHeight: 1.8, color: '#555', marginBottom: 24 }}>{product.longDescription}</p>

                    {/* Blouse */}
                    <p style={{ fontSize: 13, padding: '8px 14px', background: 'rgba(201,168,76,0.1)', borderRadius: 6, color: 'var(--gold-dark)', fontWeight: 600, marginBottom: 24, display: 'inline-block' }}>
                        {product.blouseIncluded ? '✅ Blouse piece included' : '❌ Blouse piece not included'}
                    </p>

                    {/* Qty */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>Quantity:</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: '1.5px solid #E0D5C8', borderRadius: 6, padding: '6px 12px' }}>
                            <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ fontSize: 18, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--charcoal)' }}>−</button>
                            <span style={{ fontSize: 16, fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{qty}</span>
                            <button onClick={() => setQty(qty + 1)} style={{ fontSize: 18, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--charcoal)' }}>+</button>
                        </div>
                    </div>

                    {/* CTAs */}
                    <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
                        <button onClick={() => addItem(product, qty)} style={{
                            flex: 1, padding: '16px 24px', background: 'var(--charcoal)', color: 'white', border: 'none', borderRadius: 6,
                            fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'background 0.2s',
                        }}>
                            <ShoppingBag size={16} /> Add to Bag
                        </button>
                        <button onClick={() => toggle(product)} style={{
                            width: 52, height: 52, border: '1.5px solid', borderColor: inWishlist ? 'var(--burgundy)' : '#E0D5C8',
                            background: inWishlist ? 'rgba(107,30,61,0.06)' : 'white', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                        }}>
                            <Heart size={20} fill={inWishlist ? 'var(--burgundy)' : 'none'} color={inWishlist ? 'var(--burgundy)' : 'var(--charcoal)'} />
                        </button>
                    </div>

                    {/* Delivery info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '20px 0', borderTop: '1px solid var(--ivory-dark)' }}>
                        {[
                            { icon: Truck, text: 'Free shipping. Estimated delivery in 5–7 business days.' },
                            { icon: Shield, text: 'Certificate of Authenticity included with every order.' },
                            { icon: CheckCircle, text: '15-day easy returns. No questions asked.' },
                        ].map(({ icon: Icon, text }) => (
                            <div key={text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                <Icon size={16} color="var(--gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                                <span style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{text}</span>
                            </div>
                        ))}
                    </div>

                    {/* Care */}
                    <div style={{ marginTop: 20, padding: 20, background: 'white', borderRadius: 12, border: '1px solid var(--ivory-dark)' }}>
                        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Care Instructions</p>
                        {(product.careInstructions || []).map((c: string) => <p key={c} style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>• {c}</p>)}
                    </div>
                </div>
            </div>

            {/* Reviews */}
            {product.reviews && product.reviews.length > 0 && (
                <div style={{ background: 'white', borderTop: '1px solid var(--ivory-dark)', padding: '60px 24px' }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Authentic Feedback</p>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 500, color: 'var(--charcoal)', marginBottom: 32 }}>Customer Reviews</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                            {product.reviews.map(review => (
                                <div key={review.id} style={{ padding: 24, border: '1px solid var(--ivory-dark)', borderRadius: 12, background: 'var(--ivory)' }}>
                                    <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill={s <= review.rating ? '#C9A84C' : 'none'} color={s <= review.rating ? '#C9A84C' : '#ddd'} />)}
                                    </div>
                                    <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 4 }}>{review.name}</h4>
                                    <span style={{ fontSize: 12, color: '#888', display: 'block', marginBottom: 12 }}>{review.location} &middot; {review.date}</span>
                                    <p style={{ fontSize: 14, lineHeight: 1.6, color: '#555' }}>&quot;{review.text}&quot;</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Related */}
            {related.length > 0 && (
                <div style={{ background: 'white', padding: '60px 24px' }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>You May Also Like</p>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 500, color: 'var(--charcoal)', marginBottom: 32 }}>Similar Sarees</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
                            {related.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </div>
                </div>
            )}

            <CallButton />
        </div>
    );
}

export default function ProductDetailPage() {
    return (
        <React.Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--ivory)' }}>Loading...</div>}>
            <ProductDetailContent />
        </React.Suspense>
    );
}
