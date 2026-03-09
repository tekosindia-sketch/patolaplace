'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import styles from './HeroSlider.module.css';

const slides = [
    {
        id: 1,
        label: 'The Bridal Collection',
        title: 'Draped in\nHeritage, Born\nfor Royalty',
        subtitle: 'Pure Kanjivaram & Banarasi Silk — Handcrafted by Master Weavers',
        cta: 'Explore Bridal Edit',
        ctaHref: '/products?occasion=Bridal',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&q=85',
        accent: '#C9A84C',
    },
    {
        id: 2,
        label: 'New Arrivals 2026',
        title: 'Where Tradition\nMeets Timeless\nElegance',
        subtitle: 'Discover our exclusive Festive Collection — GI Certified, Authenticity Guaranteed',
        cta: 'Shop New Arrivals',
        ctaHref: '/products?filter=new',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1920&q=85',
        accent: '#6B1E3D',
    },
    {
        id: 3,
        label: 'Heritage Weaves',
        title: 'Five Centuries\nof Silk\nMastery',
        subtitle: 'From the looms of Varanasi, Kanchipuram and Mysore — exclusively yours',
        cta: 'View Collections',
        ctaHref: '/collections',
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1920&q=85',
        accent: '#C9A84C',
    },
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goTo = (index: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrent(index);
        setTimeout(() => setIsAnimating(false), 700);
    };

    const next = () => goTo((current + 1) % slides.length);
    const prev = () => goTo((current - 1 + slides.length) % slides.length);

    useEffect(() => {
        const timer = setInterval(next, 5500);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current]);

    const slide = slides[current];

    return (
        <section className={styles.hero}>
            {/* Background image */}
            <div className={styles.bg}>
                {slides.map((s, i) => (
                    <div key={s.id} className={`${styles.slide} ${i === current ? styles.active : ''}`}>
                        <Image
                            src={s.image}
                            alt={s.title}
                            fill
                            priority={i === 0}
                            className={styles.bgImg}
                            sizes="100vw"
                        />
                    </div>
                ))}
                <div className={styles.overlay} />
            </div>

            {/* Content */}
            <div className={styles.content}>
                <div className={styles.inner}>
                    <div className={styles.textBlock} key={current}>
                        <span className={styles.label}>{slide.label}</span>
                        <h1 className={styles.title}>
                            {slide.title.split('\n').map((line, i) => (
                                <span key={i} className={styles.titleLine}>{line}</span>
                            ))}
                        </h1>
                        <p className={styles.subtitle}>{slide.subtitle}</p>
                        <div className={styles.actions}>
                            <Link href={slide.ctaHref} className={styles.ctaBtn}>
                                {slide.cta}
                                <ArrowRight size={16} />
                            </Link>
                            <Link href="/collections" className={styles.ctaSecondary}>
                                View All Collections
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statNum}>10K+</span>
                            <span className={styles.statLabel}>Happy Brides</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNum}>500+</span>
                            <span className={styles.statLabel}>Saree Designs</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statNum}>70+</span>
                            <span className={styles.statLabel}>Years of Heritage</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prev} aria-label="Previous slide">
                <ChevronLeft size={22} />
            </button>
            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={next} aria-label="Next slide">
                <ChevronRight size={22} />
            </button>

            {/* Dots */}
            <div className={styles.dots}>
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Scroll indicator */}
            <div className={styles.scroll}>
                <div className={styles.scrollLine} />
                <span className={styles.scrollText}>Scroll to discover</span>
            </div>
        </section>
    );
}
