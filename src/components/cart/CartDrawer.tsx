'use client';
import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

    if (!isOpen) return null;

    return (
        <>
            <div className={styles.overlay} onClick={closeCart} />
            <div className={styles.drawer}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <ShoppingBag size={20} className={styles.bagIcon} />
                        <h2 className={styles.title}>Your Bag</h2>
                        {totalItems > 0 && <span className={styles.count}>{totalItems} item{totalItems > 1 ? 's' : ''}</span>}
                    </div>
                    <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
                        <X size={22} />
                    </button>
                </div>

                {/* Empty state */}
                {items.length === 0 ? (
                    <div className={styles.empty}>
                        <div className={styles.emptyIcon}>🛍️</div>
                        <h3 className={styles.emptyTitle}>Your bag is empty</h3>
                        <p className={styles.emptyText}>Discover our exquisite collection of handcrafted sarees</p>
                        <button className={styles.shopBtn} onClick={closeCart}>
                            <Link href="/products">Explore Collection</Link>
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Items */}
                        <div className={styles.items}>
                            {items.map(({ product, quantity }) => (
                                <div key={product.id} className={styles.item}>
                                    <div className={styles.itemImage}>
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name}
                                            fill
                                            className={styles.img}
                                            sizes="80px"
                                        />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <p className={styles.itemCategory}>{product.category}</p>
                                        <p className={styles.itemName}>{product.name}</p>
                                        <p className={styles.itemFabric}>{product.fabric}</p>
                                        <div className={styles.itemBottom}>
                                            <div className={styles.qty}>
                                                <button
                                                    className={styles.qtyBtn}
                                                    onClick={() => updateQuantity(product.id, quantity - 1)}
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className={styles.qtyNum}>{quantity}</span>
                                                <button
                                                    className={styles.qtyBtn}
                                                    onClick={() => updateQuantity(product.id, quantity + 1)}
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                            <p className={styles.itemPrice}>₹{(product.price * quantity).toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => removeItem(product.id)}
                                        aria-label="Remove item"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className={styles.footer}>
                            <div className={styles.perks}>
                                <span className={styles.perk}>✦ Free shipping on this order</span>
                            </div>
                            <div className={styles.subtotal}>
                                <span>Subtotal</span>
                                <span className={styles.amount}>₹{totalPrice.toLocaleString('en-IN')}</span>
                            </div>
                            <p className={styles.tax}>Taxes and shipping calculated at checkout</p>
                            <Link href="/checkout" onClick={closeCart}>
                                <button className={styles.checkoutBtn}>
                                    Proceed to Checkout
                                    <ArrowRight size={16} />
                                </button>
                            </Link>
                            <button className={styles.continueBtn} onClick={closeCart}>Continue Shopping</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
