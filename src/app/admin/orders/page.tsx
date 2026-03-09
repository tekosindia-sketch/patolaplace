'use client';
import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '@/lib/admin';
import { OrderData } from '@/lib/orders';
import { Search, Filter, Eye, Phone, MapPin, Calendar, CreditCard, Users, ShoppingBag } from 'lucide-react';
import styles from './page.module.css';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<OrderData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setIsLoading(true);
        const data = await getAllOrders();
        setOrders(data);
        setIsLoading(false);
    };

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            setOrders(orders.map(o => (o as any).id === orderId ? { ...o, status: newStatus as any } : o));
            if (selectedOrder && (selectedOrder as any).id === orderId) {
                setSelectedOrder({ ...selectedOrder, status: newStatus as any });
            }
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const filtered = orders.filter(o => {
        const matchesSearch = o.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            o.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const statuses = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Orders</h1>
                    <p className={styles.subtitle}>Manage customer orders and fulfillment</p>
                </div>
            </div>

            <div className={styles.toolbar}>
                <div className={styles.search}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search by ID or Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.filters}>
                    <Filter size={18} />
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="All">All Statuses</option>
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>

            <div className={styles.contentGrid}>
                <div className={styles.tableCard}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>Loading orders...</td></tr>
                            ) : filtered.length > 0 ? (
                                filtered.map((o) => (
                                    <tr key={(o as any).id} className={selectedOrder === o ? styles.selectedRow : ''} onClick={() => setSelectedOrder(o)}>
                                        <td><span className={styles.orderId}>{o.trackingId}</span></td>
                                        <td>
                                            <p className={styles.custName}>{o.customerInfo.name}</p>
                                            <p className={styles.custEmail}>{o.customerInfo.phone}</p>
                                        </td>
                                        <td>₹{o.total.toLocaleString('en-IN')}</td>
                                        <td>
                                            <span className={`${styles.statusBadge} ${styles[o.status.toLowerCase().replace(/\s+/g, '')]}`}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span className={`${styles.paymentBadge} ${o.paymentMethod.toLowerCase().includes('cod') || o.paymentMethod.toLowerCase().includes('cash') ? styles.cod : styles.prepaid}`}>
                                                    {o.paymentMethod}
                                                </span>
                                                <button className={styles.viewBtn} title="View Details"><Eye size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>No orders found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Order Detail Sidebar/Card */}
                <div className={styles.detailCard}>
                    {selectedOrder ? (
                        <div className={styles.orderDetail}>
                            <h2 className={styles.detailTitle}>Order Details</h2>
                            <p className={styles.detailId}>{selectedOrder.trackingId}</p>

                            <div className={styles.statusUpdate}>
                                <label>Update Status</label>
                                <select
                                    value={selectedOrder.status}
                                    onChange={(e) => handleStatusUpdate((selectedOrder as any).id, e.target.value)}
                                >
                                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <div className={styles.detailSection}>
                                <div className={styles.sectionTitle}><Users size={16} /> Customer</div>
                                <p><strong>{selectedOrder.customerInfo.name}</strong></p>
                                <p className={styles.detailText}><Phone size={12} /> {selectedOrder.customerInfo.phone}</p>
                                <p className={styles.detailText}><MapPin size={12} /> {selectedOrder.customerInfo.address}, {selectedOrder.customerInfo.city}, {selectedOrder.customerInfo.state} - {selectedOrder.customerInfo.pincode}</p>
                            </div>

                            <div className={styles.detailSection}>
                                <div className={styles.sectionTitle}><ShoppingBag size={16} /> Items</div>
                                {selectedOrder.items.map((item, idx) => (
                                    <div key={idx} className={styles.orderItem}>
                                        <div className={styles.itemImg}>
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <p className={styles.itemName}>{item.name}</p>
                                            <p className={styles.itemPrice}>{item.quantity} x ₹{item.price.toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.priceSummary}>
                                <div className={styles.priceRow}><span>Subtotal</span><span>₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span></div>
                                <div className={styles.priceRow}><span>Shipping</span><span>₹{selectedOrder.shipping.toLocaleString('en-IN')}</span></div>
                                <div className={styles.totalRow}><span>Total</span><span>₹{selectedOrder.total.toLocaleString('en-IN')}</span></div>
                            </div>

                            <div className={styles.paymentInfo}>
                                <CreditCard size={16} />
                                <span>Paid via {selectedOrder.paymentMethod}</span>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.emptyDetail}>
                            <div className={styles.emptyIcon}><Eye size={48} /></div>
                            <p>Select an order to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
