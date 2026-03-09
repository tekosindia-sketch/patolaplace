'use client';
import React, { useState, useEffect } from 'react';
import { getProducts } from '@/lib/admin';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types';
import { OrderData } from '@/lib/orders';
import { Package, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import styles from './page.module.css';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, customers: 12 });
    const [recentOrders, setRecentOrders] = useState<OrderData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            try {
                // Products count
                const products = await getProducts();

                // Orders and Revenue
                const ordersSnap = await getDocs(collection(db, 'orders'));
                const orders = ordersSnap.docs.map(doc => doc.data() as OrderData);
                const revenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

                // Recent orders
                const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(5));
                const recentSnap = await getDocs(q);
                const recent = recentSnap.docs.map(doc => doc.data() as OrderData);

                setStats({
                    products: products.length,
                    orders: orders.length,
                    revenue: revenue,
                    customers: 12 // Mock for now
                });
                setRecentOrders(recent);
            } catch (error) {
                console.error("Dashboard error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadStats();
    }, []);

    if (isLoading) return <div>Loading dashboard...</div>;

    const cards = [
        { label: 'Total Revenue', value: `₹${stats.revenue.toLocaleString('en-IN')}`, icon: TrendingUp, color: '#22c55e' },
        { label: 'Orders', value: stats.orders, icon: Package, color: '#3b82f6' },
        { label: 'Products', value: stats.products, icon: ShoppingBag, color: 'var(--gold)' },
        { label: 'Customers', value: stats.customers, icon: Users, color: '#a855f7' },
    ];

    return (
        <div className={styles.dashboard}>
            <div className={styles.grid}>
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className={styles.card}>
                            <div className={styles.cardInfo}>
                                <p className={styles.cardLabel}>{card.label}</p>
                                <h3 className={styles.cardValue}>{card.value}</h3>
                            </div>
                            <div className={styles.cardIcon} style={{ background: `${card.color}15`, color: card.color }}>
                                <Icon size={24} />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={styles.recentSection}>
                <div className={styles.sectionHeader}>
                    <h3>Recent Orders</h3>
                    <button className={styles.viewAll}>View All</button>
                </div>
                <div className={styles.ordersTableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Tracking ID</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.length > 0 ? recentOrders.map((order, i) => (
                                <tr key={i}>
                                    <td><span className={styles.trackingId}>{order.trackingId}</span></td>
                                    <td>
                                        <div className={styles.customerInfo}>
                                            <p className={styles.customerName}>{order.customerInfo.name}</p>
                                            <p className={styles.customerEmail}>{order.customerInfo.email}</p>
                                        </div>
                                    </td>
                                    <td>₹{order.total.toLocaleString('en-IN')}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase().replace(/\s+/g, '')]}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>No orders found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
