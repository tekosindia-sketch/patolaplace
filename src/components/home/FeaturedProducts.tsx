'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getProducts } from '@/lib/admin';
import { Product } from '@/types';
import styles from './FeaturedProducts.module.css';

export default function FeaturedProducts() {
    const [featured, setFeatured] = React.useState<Product[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const load = async () => {
            const data = await getProducts();
            setFeatured(data.slice(0, 8));
            setIsLoading(false);
        };
        load();
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.label}>Handpicked for You</span>
                    <h2 className={styles.title}>Our Most Loved Sarees</h2>
                    <p className={styles.subtitle}>Exquisite handcrafted sarees chosen by our connoisseurs</p>
                </div>

                <div className={styles.grid}>
                    {isLoading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} style={{ aspectRatio: '3/4', background: 'var(--ivory-dark)', borderRadius: 12, opacity: 0.6 }} />
                        ))
                    ) : (
                        featured.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>

                <div className={styles.footer}>
                    <Link href="/products" className={styles.viewAll}>
                        View All Sarees
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
