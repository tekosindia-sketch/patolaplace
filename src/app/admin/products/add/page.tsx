'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addProduct } from '@/lib/admin';
import { ArrowLeft, Plus, X } from 'lucide-react';
import Link from 'next/link';
import styles from './add-product.module.css';

export default function AddProductPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                handleArrayChange(index, data.url, 'images');
            } else {
                alert(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Error mapping image');
        } finally {
            setIsUploading(false);
        }
    };
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'Silk',
        images: [''],
        features: [''],
        details: {
            fabric: 'Pure Silk',
            work: 'Hand-woven',
            length: '6.5 Meters (incl. blouse)',
            color: ''
        }
    });

    const categories = ['Silk', 'Cotton', 'Bridal', 'Festive', 'Designer'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('details.')) {
            const detailField = name.split('.')[1];
            setProduct(prev => ({
                ...prev,
                details: { ...prev.details, [detailField]: value }
            }));
        } else {
            setProduct(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleArrayChange = (index: number, value: string, field: 'images' | 'features') => {
        const newArr = [...product[field]];
        newArr[index] = value;
        setProduct(prev => ({ ...prev, [field]: newArr }));
    };

    const addItem = (field: 'images' | 'features') => {
        setProduct(prev => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const removeItem = (index: number, field: 'images' | 'features') => {
        if (product[field].length > 1) {
            const newArr = [...product[field]];
            newArr.splice(index, 1);
            setProduct(prev => ({ ...prev, [field]: newArr }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalImages = product.images.filter(img => img.trim() !== '');
        if (finalImages.length === 0) {
            alert('Please provide at least one image URL for the product.');
            return;
        }

        setIsLoading(true);
        try {
            await addProduct({
                ...product,
                price: parseFloat(product.price),
                originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : undefined,
                images: finalImages,
                features: product.features.filter(f => f.trim() !== '')
            } as any);
            router.push('/admin/products');
        } catch (error) {
            alert('Error adding product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/admin/products" className={styles.backBtn}>
                    <ArrowLeft size={20} />
                    Back to Products
                </Link>
                <h1 className={styles.title}>Add New Saree</h1>
            </div>

            <form onSubmit={handleSubmit} className={styles.formGrid}>
                {/* Left Column: Basic Info */}
                <div className={styles.mainCard}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Basic Information</h2>
                        <div className={styles.inputGroup}>
                            <label>Product Name</label>
                            <input name="name" value={product.name} onChange={handleChange} required placeholder="e.g. Royal Golden Kanchipuram Silk Saree" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Description</label>
                            <textarea name="description" value={product.description} onChange={handleChange} required rows={5} placeholder="Describe the saree's heritage, weave, and feel..." />
                        </div>
                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label>Category</label>
                                <select name="category" value={product.category} onChange={handleChange}>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Price (₹)</label>
                                <input name="price" type="number" value={product.price} onChange={handleChange} required placeholder="9900" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Original Price (₹ - optional)</label>
                                <input name="originalPrice" type="number" value={product.originalPrice} onChange={handleChange} placeholder="14900" />
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Details & Specifications</h2>
                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label>Fabric</label>
                                <input name="details.fabric" value={product.details.fabric} onChange={handleChange} required />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Work Type</label>
                                <input name="details.work" value={product.details.work} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label>Color</label>
                                <input name="details.color" value={product.details.color} onChange={handleChange} required placeholder="e.g. Royal Blue" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Total Length</label>
                                <input name="details.length" value={product.details.length} onChange={handleChange} required />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Media and Features */}
                <div className={styles.sideColumn}>
                    <section className={styles.card}>
                        <h2 className={styles.sectionTitle}>Product Images</h2>
                        <p className={styles.hint}>Upload an image from your computer or paste a URL directly.</p>
                        {product.images.map((img, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                                <div className={styles.arrayItem}>
                                    <input value={img} onChange={(e) => handleArrayChange(idx, e.target.value, 'images')} placeholder="Image URL" required />

                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, idx)} style={{ display: 'none' }} id={`img-upload-${idx}`} />
                                    <label htmlFor={`img-upload-${idx}`} className={styles.addItemBtn} style={{ margin: 0, padding: '8px 12px', cursor: 'pointer', flexShrink: 0, background: 'var(--gold)', color: 'white', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {isUploading ? '...' : 'Upload File'}
                                    </label>

                                    <button type="button" onClick={() => removeItem(idx, 'images')} className={styles.removeBtn}><X size={14} /></button>
                                </div>
                                {img && (img.startsWith('http') || img.startsWith('/')) && (
                                    <img src={img} alt="Preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee' }} />
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={() => addItem('images')} className={styles.addItemBtn}>
                            <Plus size={14} /> Add Another Image
                        </button>
                    </section>

                    <section className={styles.card}>
                        <h2 className={styles.sectionTitle}>Key Features</h2>
                        {product.features.map((feat, idx) => (
                            <div key={idx} className={styles.arrayItem}>
                                <input value={feat} onChange={(e) => handleArrayChange(idx, e.target.value, 'features')} placeholder="e.g. Dry Clean Only" required />
                                <button type="button" onClick={() => removeItem(idx, 'features')} className={styles.removeBtn}><X size={14} /></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addItem('features')} className={styles.addItemBtn}>
                            <Plus size={14} /> Add Feature
                        </button>
                    </section>

                    <button type="submit" disabled={isLoading || isUploading} className={styles.saveBtn}>
                        {isLoading ? 'Saving...' : 'Publish Saree'}
                    </button>
                </div>
            </form>
        </div>
    );
}
