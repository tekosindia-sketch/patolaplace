'use client';
import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '@/lib/admin';
import { Product } from '@/types';
import { Plus, Edit2, Trash2, Search, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        setIsLoading(true);
        const data = await getProducts();
        setProducts(data);
        setIsLoading(false);
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                await deleteProduct(id);
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                alert('Failed to delete product');
            }
        }
    };

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Products</h1>
                    <p className={styles.subtitle}>Manage your saree collection ({products.length} total)</p>
                </div>
                <Link href="/admin/products/add" className={styles.addBtn}>
                    <Plus size={18} />
                    Add New Saree
                </Link>
            </div>

            <div className={styles.toolbar}>
                <div className={styles.search}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>Loading products...</td></tr>
                        ) : filtered.length > 0 ? (
                            filtered.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <div className={styles.productCell}>
                                            <div className={styles.imgWrapper}>
                                                <Image src={p.images[0]} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="40px" />
                                            </div>
                                            <div>
                                                <p className={styles.productName}>{p.name}</p>
                                                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                    <span className={styles.id}>{p.id.substring(0, 8)}...</span>
                                                    <Link href={`/products/detail?id=${p.id}`} target="_blank" className={styles.externalLink}>
                                                        <ExternalLink size={12} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={styles.categoryBadge}>{p.category}</span>
                                    </td>
                                    <td>
                                        <p className={styles.price}>₹{p.price.toLocaleString('en-IN')}</p>
                                        {p.originalPrice && <p className={styles.oldPrice}>₹{p.originalPrice.toLocaleString('en-IN')}</p>}
                                    </td>
                                    <td>
                                        <span className={styles.stockStatus}>In Stock</span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/admin/products/edit/${p.id}`} className={styles.editBtn}>
                                                <Edit2 size={16} />
                                            </Link>
                                            <button onClick={() => handleDelete(p.id, p.name)} className={styles.deleteBtn}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>No products found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
