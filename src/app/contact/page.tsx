'use client';
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    return (
        <div style={{ minHeight: '100vh', background: 'var(--ivory)' }}>
            <div style={{ background: 'var(--charcoal)', padding: '60px 24px', textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Get in Touch</span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: 'white' }}>Contact Us</h1>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginTop: 12 }}>We&apos;d love to hear from you. Our silk experts are here to help.</p>
            </div>

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
                {/* Contact info */}
                <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, color: 'var(--charcoal)', marginBottom: 32 }}>We&apos;re Here for You</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
                        {[
                            { icon: Phone, title: 'Call Us', lines: ['+91 98765 43210', 'Mon–Sat, 10am–7pm IST'] },
                            { icon: Mail, title: 'Email Us', lines: ['care@patolaplace.com', 'Reply within 24 hours'] },
                            { icon: MapPin, title: 'Visit Us', lines: ['Patolaplace House, Sindhu Bhavan Road', 'Ahmedabad, Gujarat 380054'] },
                            { icon: Clock, title: 'Business Hours', lines: ['Monday – Saturday: 10:00 AM – 7:00 PM', 'Sunday: 11:00 AM – 5:00 PM'] },
                        ].map(({ icon: Icon, title, lines }) => (
                            <div key={title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                <div style={{ width: 44, height: 44, background: 'rgba(201,168,76,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <Icon size={20} color="var(--gold)" />
                                </div>
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--charcoal)', marginBottom: 4 }}>{title}</p>
                                    {lines.map(l => <p key={l} style={{ fontSize: 13, color: '#777', lineHeight: 1.6 }}>{l}</p>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <div>
                    {submitted ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16, textAlign: 'center' }}>
                            <CheckCircle size={56} color="var(--gold)" />
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--charcoal)' }}>Message Sent!</h3>
                            <p style={{ fontSize: 14, color: '#777' }}>Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                        </div>
                    ) : (
                        <div style={{ background: 'white', borderRadius: 16, padding: 36, border: '1px solid var(--ivory-dark)' }}>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, color: 'var(--charcoal)', marginBottom: 24 }}>Send a Message</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {[
                                    { label: 'Your Name', name: 'name', type: 'text', placeholder: 'Priya Sharma' },
                                    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'priya@email.com' },
                                    { label: 'Subject', name: 'subject', type: 'text', placeholder: 'Query about Kanjivaram saree' },
                                ].map(f => (
                                    <div key={f.name}>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: 8 }}>{f.label}</label>
                                        <input type={f.type} placeholder={f.placeholder} value={form[f.name as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                                            style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #E0D5C8', borderRadius: 6, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none' }} />
                                    </div>
                                ))}
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#888', marginBottom: 8 }}>Message</label>
                                    <textarea placeholder="Tell us how we can help you..." rows={5} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                                        style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #E0D5C8', borderRadius: 6, fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none', resize: 'vertical' }} />
                                </div>
                                <button onClick={() => setSubmitted(true)} style={{ padding: '14px 32px', background: 'var(--charcoal)', color: 'white', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                                    Send Message →
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
