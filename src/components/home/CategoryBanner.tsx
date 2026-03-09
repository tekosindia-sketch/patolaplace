'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data/products';
import styles from './CategoryBanner.module.css';

const categoryImages: Record<string, string> = {
    kanjivaram: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
    banarasi: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600',
    chanderi: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600',
    'mysore-silk': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
    bandhani: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600',
    paithani: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600',
    designer: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600',
    bridal: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600',
};

export default function CategoryBanner() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.label}>Shop by Category</span>
                    <h2 className={styles.title}>Explore Our Collections</h2>
                    <p className={styles.subtitle}>Eight centuries of weaving mastery, curated for the modern woman</p>
                </div>

                {/* Category grid */}
                <div className={styles.grid}>
                    {categories.map((cat, i) => (
                        <Link
                            key={cat.id}
                            href={`/products?category=${cat.id}`}
                            className={`${styles.card} ${i === 0 ? styles.featured : ''}`}
                        >
                            <div className={styles.cardImage}>
                                <Image
                                    src={categoryImages[cat.id]}
                                    alt={cat.name}
                                    fill
                                    className={styles.img}
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                                />
                                <div className={styles.cardOverlay} />
                            </div>
                            <div className={styles.cardContent}>
                                <span className={styles.cardIcon}>{cat.icon}</span>
                                <h3 className={styles.cardName}>{cat.name}</h3>
                                <p className={styles.cardDesc}>{cat.description}</p>
                                <span className={styles.cardCount}>{cat.count} designs</span>
                                <div className={styles.cardCta}>
                                    <span>Shop Now</span>
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View all */}
                <div className={styles.footer}>
                    <Link href="/collections" className={styles.viewAll}>
                        View All Collections
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
