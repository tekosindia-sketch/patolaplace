'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { getOrderByTrackingId, OrderData } from '@/lib/orders';
import styles from './page.module.css';

export default function TrackOrderPage() {
    const [trackingId, setTrackingId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [order, setOrder] = useState<OrderData | null>(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingId.trim()) return;

        setIsLoading(true);
        setSearched(true);
        try {
            const result = await getOrderByTrackingId(trackingId.trim());
            setOrder(result);
        } catch (error) {
            console.error("Tracking error", error);
            setOrder(null);
        } finally {
            setIsLoading(false);
        }
    };

    const StatusIcon = () => {
        if (!order) return null;
        switch (order.status) {
            case 'Processing': return <Clock size={48} color="var(--gold)" />;
            case 'Shipped': return <Package size={48} color="var(--gold)" />;
            case 'Out for Delivery': return <Truck size={48} color="var(--gold)" />;
            case 'Delivered': return <CheckCircle size={48} color="#22c55e" />;
            default: return <Package size={48} color="var(--gold)" />;
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Track Your Order</h1>
                    <p className={styles.subtitle}>Enter the order ID sent to your email or displayed at checkout.</p>
                </div>

                <div className={styles.searchBox}>
                    <form onSubmit={handleSearch} className={styles.searchForm}>
                        <div className={styles.inputWrapper}>
                            <Search className={styles.searchIcon} size={20} />
                            <input
                                type="text"
                                placeholder="e.g. ORD-X8K9P"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                className={styles.input}
                                required
                            />
                        </div>
                        <button type="submit" disabled={isLoading} className={styles.trackBtn}>
                            {isLoading ? 'Searching...' : 'Track'}
                        </button>
                    </form>
                </div>

                {searched && !isLoading && !order && (
                    <div className={styles.notFound}>
                        <Package size={40} color="#ccc" />
                        <h3>Order Not Found</h3>
                        <p>We couldn&apos;t find any order matching ID: <strong>{trackingId}</strong></p>
                        <p className={styles.helpText}>Please double-check your ID or contact support if you need help.</p>
                    </div>
                )}

                {order && (
                    <div className={styles.resultContainer}>
                        <div className={styles.statusSection}>
                            <div className={styles.statusIconWrap}>
                                <StatusIcon />
                            </div>
                            <h2 className={styles.statusText}>{order.status}</h2>
                            <p className={styles.estimatedDelivery}>
                                Estimated Delivery: <strong>{order.estimatedDelivery.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</strong>
                            </p>
                        </div>

                        <div className={styles.orderDetails}>
                            <div className={styles.sectionHeader}>
                                <h3>Order Summary</h3>
                                <span className={styles.orderIdBadge}>{order.trackingId}</span>
                            </div>

                            <div className={styles.itemsList}>
                                {order.items.map((item, idx) => (
                                    <div key={idx} className={styles.itemRow}>
                                        <div className={styles.itemImage}>
                                            <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} sizes="64px" />
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <h4>{item.name}</h4>
                                            <p>Qty: {item.quantity}</p>
                                        </div>
                                        <div className={styles.itemPrice}>
                                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.totalsSection}>
                                <div className={styles.totalsRow}>
                                    <span>Subtotal</span>
                                    <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
                                </div>
                                <div className={styles.totalsRow}>
                                    <span>Shipping</span>
                                    <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span>
                                </div>
                                <div className={`${styles.totalsRow} ${styles.grandTotal}`}>
                                    <span>Total Paid</span>
                                    <span>₹{order.total.toLocaleString('en-IN')}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.shippingInfo}>
                            <h3>Shipping Address</h3>
                            <div className={styles.addressCard}>
                                <strong>{order.customerInfo.name}</strong>
                                <p>{order.customerInfo.address}</p>
                                <p>{order.customerInfo.city}, {order.customerInfo.state} - {order.customerInfo.pincode}</p>
                                <p className={styles.contactPoint}>Email: {order.customerInfo.email}</p>
                                <p className={styles.contactPoint}>Phone: {order.customerInfo.phone}</p>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <Link href="/products" className={styles.continueShopping}>
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
