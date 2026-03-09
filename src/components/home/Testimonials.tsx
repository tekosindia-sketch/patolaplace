'use client';
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/products';
import styles from './Testimonials.module.css';

export default function Testimonials() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>Customer Stories</span>
                    <h2 className={styles.title}>Loved by 10,000+ Women Across India</h2>
                </div>

                <div className={styles.grid}>
                    {testimonials.map((t) => (
                        <div key={t.id} className={styles.card}>
                            <Quote size={28} className={styles.quoteIcon} />
                            <div className={styles.stars}>
                                {[1, 2, 3, 4, 5].map(s => (
                                    <Star key={s} size={14} fill={s <= t.rating ? '#C9A84C' : 'none'} color={s <= t.rating ? '#C9A84C' : '#ddd'} />
                                ))}
                            </div>
                            <p className={styles.text}>&ldquo;{t.text}&rdquo;</p>
                            <div className={styles.author}>
                                <div className={styles.avatar}>{t.name[0]}</div>
                                <div>
                                    <p className={styles.name}>{t.name}</p>
                                    <p className={styles.location}>{t.location} · {t.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust badges */}
                <div className={styles.trustRow}>
                    {[
                        { icon: '🏆', label: '10,000+ Happy Customers' },
                        { icon: '✅', label: 'GI Certified Sarees' },
                        { icon: '🚚', label: 'Free Pan-India Shipping' },
                        { icon: '↩️', label: '15-Day Easy Returns' },
                        { icon: '🔒', label: '100% Secure Payments' },
                    ].map(b => (
                        <div key={b.label} className={styles.trustBadge}>
                            <span className={styles.trustIcon}>{b.icon}</span>
                            <span className={styles.trustLabel}>{b.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
