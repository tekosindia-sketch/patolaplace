'use client';
import React, { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { createOrder } from '@/lib/orders';

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart();
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '', payment: 'upi' });
    const shipping = totalPrice > 2999 ? 0 : 99;
    const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const [isProcessing, setIsProcessing] = useState(false);
    const [trackingId, setTrackingId] = useState<string | null>(null);

    const handlePlaceOrder = async () => {
        if (!form.name || !form.email || !form.address) return; // Simple validation check
        setIsProcessing(true);
        try {
            const id = await createOrder(form, items, form.payment, totalPrice, shipping);
            setTrackingId(id);
            setSubmitted(true);
            clearCart();
        } catch (error) {
            console.error("Order failed", error);
            alert("Oops! Something went wrong processing your order.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (submitted && trackingId) return (
        <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, padding: 24 }}>
            <CheckCircle size={64} color="var(--gold)" />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 600, color: 'var(--charcoal)', textAlign: 'center' }}>Order Placed Successfully!</h1>

            <div style={{ background: 'white', border: '1px solid var(--ivory-dark)', padding: '24px 32px', borderRadius: 12, margin: '12px 0', textAlign: 'center' }}>
                <p style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 4 }}>Your Tracking ID</p>
                <div style={{ fontSize: 32, fontFamily: 'monospace', fontWeight: 700, color: 'var(--charcoal)', letterSpacing: '0.05em' }}>
                    {trackingId}
                </div>
            </div>

            <p style={{ fontSize: 16, color: '#777', textAlign: 'center', maxWidth: 480 }}>Thank you for shopping with Patolaplace. You can use your Tracking ID on our <Link href="/track" style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'underline' }}>Track Order</Link> page to follow its progress.</p>
            <Link href="/products" style={{ marginTop: 8, padding: '14px 40px', background: 'var(--charcoal)', color: 'white', borderRadius: 6, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Continue Shopping</Link>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: 'var(--ivory)', padding: '40px 24px' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 48 }}>
                {/* Form */}
                <div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 500, color: 'var(--charcoal)', marginBottom: 8 }}>Checkout</h1>
                    <p style={{ fontSize: 14, color: '#888', marginBottom: 32 }}>Complete your order securely</p>

                    <div style={{ background: 'white', borderRadius: 16, padding: 32, marginBottom: 24, border: '1px solid var(--ivory-dark)' }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 20 }}>Shipping Information</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            {[
                                { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Priya Sharma', col: 2 },
                                { label: 'Email Address', name: 'email', type: 'email', placeholder: 'priya@email.com' },
                                { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
                                { label: 'Street Address', name: 'address', type: 'text', placeholder: '42, Silk Road, Vasant Nagar', col: 2 },
                                { label: 'City', name: 'city', type: 'text', placeholder: 'Mumbai' },
                                { label: 'State', name: 'state', type: 'text', placeholder: 'Maharashtra' },
                                { label: 'Pincode', name: 'pincode', type: 'text', placeholder: '400001' },
                            ].map(f => (
                                <div key={f.name} style={{ gridColumn: f.col === 2 ? '1 / -1' : 'auto' }}>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#888', marginBottom: 8 }}>{f.label}</label>
                                    <input
                                        type={f.type} name={f.name} value={form[f.name as keyof typeof form]} onChange={handle}
                                        placeholder={f.placeholder} required
                                        style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #E0D5C8', borderRadius: 6, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: 'white', borderRadius: 16, padding: 32, border: '1px solid var(--ivory-dark)' }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 20 }}>Payment Method</h2>
                        {[
                            { value: 'upi', label: '📱 UPI (Google Pay, PhonePe, Paytm)' },
                            { value: 'card', label: '💳 Credit / Debit Card' },
                            { value: 'netbanking', label: '🏦 Net Banking' },
                            { value: 'cod', label: '💵 Cash on Delivery' },
                        ].map(opt => (
                            <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', border: '1.5px solid', borderColor: form.payment === opt.value ? 'var(--gold)' : '#E0D5C8', borderRadius: 8, marginBottom: 10, cursor: 'pointer', background: form.payment === opt.value ? 'rgba(201,168,76,0.06)' : 'white' }}>
                                <input type="radio" name="payment" value={opt.value} checked={form.payment === opt.value} onChange={handle} style={{ accentColor: 'var(--gold)' }} />
                                <span style={{ fontSize: 14, fontWeight: 500 }}>{opt.label}</span>
                            </label>
                        ))}
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        style={{ width: '100%', marginTop: 24, padding: '18px', background: isProcessing ? '#ccc' : 'var(--charcoal)', color: 'white', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: isProcessing ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
                    >
                        {isProcessing ? 'Processing Order...' : `Place Order — ₹${(totalPrice + shipping).toLocaleString('en-IN')}`}
                        {!isProcessing && <ArrowRight size={18} />}
                    </button>
                </div>

                {/* Order Summary */}
                <div>
                    <div style={{ background: 'white', borderRadius: 16, padding: 28, border: '1px solid var(--ivory-dark)', position: 'sticky', top: 88 }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 20 }}>Order Summary</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                            {items.map(({ product, quantity }) => (
                                <div key={product.id} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                    <div style={{ width: 56, height: 72, borderRadius: 8, overflow: 'hidden', position: 'relative', flexShrink: 0, background: 'var(--ivory-dark)' }}>
                                        <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="56px" />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.name}</p>
                                        <p style={{ fontSize: 12, color: '#999' }}>Qty: {quantity}</p>
                                    </div>
                                    <span style={{ fontSize: 14, fontWeight: 700, flexShrink: 0 }}>₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ borderTop: '1px solid var(--ivory-dark)', paddingTop: 16 }}>
                            {[
                                { label: 'Subtotal', val: `₹${totalPrice.toLocaleString('en-IN')}` },
                                { label: 'Shipping', val: shipping === 0 ? 'Free' : `₹${shipping}` },
                                { label: 'Tax (included)', val: 'Inclusive' },
                            ].map(r => (
                                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#888', marginBottom: 8 }}>
                                    <span>{r.label}</span><span>{r.val}</span>
                                </div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, color: 'var(--charcoal)', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--ivory-dark)' }}>
                                <span>Total</span><span>₹{(totalPrice + shipping).toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                        <p style={{ marginTop: 16, fontSize: 12, color: '#aaa', textAlign: 'center' }}>🔒 256-bit SSL encrypted checkout</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
