'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getProducts } from '@/lib/admin';
import { Product } from '@/types';
import styles from './page.module.css';
import { useSearchParams } from 'next/navigation';

const occasions = ['Bridal', 'Wedding', 'Festive', 'Casual', 'Office', 'Party', 'Puja'];

function ProductsContent() {

    const searchParams = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [selectedOccasion, setSelectedOccasion] = useState(searchParams.get('occasion') || '');
    const [priceMax, setPriceMax] = useState(50000);
    const [sortBy, setSortBy] = useState('default');
    const [showFilters, setShowFilters] = useState(false);

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load products from Supabase
    useEffect(() => {

        const loadProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data || []);
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();

    }, []);

    // Filter + Sort products
    const filtered = useMemo(() => {

        let list = [...products];

        const filterParam = searchParams.get('filter');

        if (filterParam === 'new') {
            list = list.filter(p => p?.isNew);
        }

        if (filterParam === 'bestseller') {
            list = list.filter(p => p?.isBestseller);
        }

        if (selectedCategory) {
            list = list.filter(
                p => p?.category?.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        if (selectedOccasion) {
            list = list.filter(
                p => p?.occasion?.includes(selectedOccasion)
            );
        }

        list = list.filter(p => (p?.price || 0) <= priceMax);

        if (sortBy === 'price-asc') {
            list.sort((a, b) => a.price - b.price);
        }

        if (sortBy === 'price-desc') {
            list.sort((a, b) => b.price - a.price);
        }

        if (sortBy === 'rating') {
            list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }

        return list;

    }, [products, selectedCategory, selectedOccasion, priceMax, sortBy, searchParams]);

    // Extract categories dynamically
    const activeFabrics = useMemo(() => {
        return [...new Set(products.map(p => p?.category).filter(Boolean))];
    }, [products]);

    return (
        <div className={styles.page}>

            {/* Page header */}

            <div className={styles.pageHeader}>
                <span className={styles.pageLabel}>Our Collection</span>
                <h1 className={styles.pageTitle}>All Sarees</h1>
                <p className={styles.pageSub}>
                    {filtered.length} stunning sarees, handcrafted for you
                </p>
            </div>

            <div className={styles.layout}>

                {/* Sidebar Filters */}

                <aside className={`${styles.sidebar} ${showFilters ? styles.sidebarOpen : ''}`}>

                    {/* Category */}

                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>Category</h3>

                        <div className={styles.filterOptions}>

                            <button
                                className={`${styles.filterChip} ${!selectedCategory ? styles.active : ''}`}
                                onClick={() => setSelectedCategory('')}
                            >
                                All
                            </button>

                            {activeFabrics.map(f => (

                                <button
                                    key={f}
                                    className={`${styles.filterChip} ${selectedCategory === f ? styles.active : ''}`}
                                    onClick={() => setSelectedCategory(f === selectedCategory ? '' : f)}
                                >
                                    {f}
                                </button>

                            ))}

                        </div>
                    </div>

                    {/* Occasion */}

                    <div className={styles.filterSection}>
                        <h3 className={styles.filterTitle}>Occasion</h3>

                        <div className={styles.filterOptions}>

                            <button
                                className={`${styles.filterChip} ${!selectedOccasion ? styles.active : ''}`}
                                onClick={() => setSelectedOccasion('')}
                            >
                                All
                            </button>

                            {occasions.map(o => (

                                <button
                                    key={o}
                                    className={`${styles.filterChip} ${selectedOccasion === o ? styles.active : ''}`}
                                    onClick={() => setSelectedOccasion(o === selectedOccasion ? '' : o)}
                                >
                                    {o}
                                </button>

                            ))}

                        </div>
                    </div>

                    {/* Price */}

                    <div className={styles.filterSection}>

                        <h3 className={styles.filterTitle}>Price Range</h3>

                        <p className={styles.priceDisplay}>
                            Up to ₹{priceMax.toLocaleString('en-IN')}
                        </p>

                        <input
                            type="range"
                            min={2000}
                            max={50000}
                            step={500}
                            value={priceMax}
                            onChange={e => setPriceMax(Number(e.target.value))}
                            className={styles.priceSlider}
                        />

                        <div className={styles.priceMinMax}>
                            <span>₹2,000</span>
                            <span>₹50,000</span>
                        </div>

                    </div>

                    {/* Clear Filters */}

                    <button
                        className={styles.clearBtn}
                        onClick={() => {
                            setSelectedCategory('');
                            setSelectedOccasion('');
                            setPriceMax(50000);
                        }}
                    >
                        Clear All Filters
                    </button>

                </aside>

                {/* Main */}

                <main className={styles.main}>

                    {/* Toolbar */}

                    <div className={styles.toolbar}>

                        <button
                            className={styles.filterToggle}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <SlidersHorizontal size={16} />
                            Filters
                        </button>

                        <span className={styles.resultCount}>
                            {filtered.length} results
                        </span>

                        <select
                            className={styles.sortSelect}
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                        >
                            <option value="default">Sort: Featured</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating">Best Rated</option>
                        </select>

                    </div>

                    {/* Grid */}

                    {isLoading ? (

                        <div className={styles.grid}>

                            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (

                                <div
                                    key={i}
                                    style={{
                                        aspectRatio: '3/4',
                                        background: 'var(--ivory-dark)',
                                        borderRadius: 12,
                                        animation: 'pulse 1.5s infinite ease-in-out'
                                    }}
                                />

                            ))}

                        </div>

                    ) : filtered.length > 0 ? (

                        <div className={styles.grid}>

                            {filtered.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}

                        </div>

                    ) : (

                        <div className={styles.empty}>

                            <p className={styles.emptyIcon}>🔍</p>
                            <p className={styles.emptyTitle}>No sarees found</p>
                            <p className={styles.emptyText}>Try adjusting your filters</p>

                        </div>

                    )}

                </main>

            </div>

        </div>
    );
}

export default function ProductsPage() {

    return (
        <React.Suspense fallback={<div className={styles.loading}>Loading products...</div>}>
            <ProductsContent />
        </React.Suspense>
    );

}