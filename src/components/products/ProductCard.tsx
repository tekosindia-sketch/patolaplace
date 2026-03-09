'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './ProductCard.module.css';

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const { addItem } = useCart();
    const { toggle, isInWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);
    const router = useRouter();
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className={styles.card}>
            {/* Image */}
            <Link href={`/products/detail?id=${product.id}`} className={styles.imageWrap}>
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className={styles.img}
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                {product.images[1] && (
                    <Image
                        src={product.images[1]}
                        alt={product.name}
                        fill
                        className={styles.imgHover}
                        sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                )}
                {/* Badges */}
                <div className={styles.badges}>
                    {product.isNew && <span className={styles.badgeNew}>New</span>}
                    {product.isBestseller && <span className={styles.badgeBest}>Bestseller</span>}
                    {discount > 0 && <span className={styles.badgeSale}>-{discount}%</span>}
                </div>
                {/* Hover actions */}
                <div className={styles.hoverActions}>
                    <button
                        className={styles.actionBtn}
                        onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(product); }}
                        aria-label="Add to wishlist"
                    >
                        <Heart size={16} fill={inWishlist ? '#6B1E3D' : 'none'} color={inWishlist ? '#6B1E3D' : 'currentColor'} />
                    </button>
                    <button className={styles.actionBtn} aria-label="Quick view" onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/products/detail?id=${product.id}`); }}>
                        <Eye size={16} />
                    </button>
                    {/* Quick add */}
                    <button
                        className={styles.quickAdd}
                        onClick={e => { e.preventDefault(); e.stopPropagation(); addItem(product); }}
                    >
                        <ShoppingBag size={14} />
                        Add to Bag
                    </button>
                </div>
            </Link>

            {/* Info */}
            <div className={styles.info}>
                <p className={styles.category}>{product.category}</p>
                <Link href={`/products/detail?id=${product.id}`}>
                    <h3 className={styles.name}>{product.name}</h3>
                </Link>
                <p className={styles.fabric}>{product.fabric}</p>
                {/* Rating */}
                <div className={styles.rating}>
                    <div className={styles.stars}>
                        {[1, 2, 3, 4, 5].map(s => (
                            <Star key={s} size={12} fill={s <= Math.round(product.rating) ? '#C9A84C' : 'none'} color={s <= Math.round(product.rating) ? '#C9A84C' : '#ddd'} />
                        ))}
                    </div>
                    <span className={styles.ratingCount}>({product.reviewCount})</span>
                </div>
                {/* Price */}
                <div className={styles.price}>
                    <span className={styles.priceMain}>₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                        <span className={styles.priceOrig}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                </div>
                {/* Color dot */}
                <div className={styles.colorDot} style={{ background: product.colorHex }} title={product.color} />
            </div>
        </div>
    );
}
