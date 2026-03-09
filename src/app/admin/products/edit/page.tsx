'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { getProductById, updateProduct } from '@/lib/admin';
import { ArrowLeft, Save, X, Plus } from 'lucide-react';
import Link from 'next/link';
import styles from '../add/add-product.module.css';

function EditProductContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
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
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            if (!id) return;
            const data = await getProductById(id);
            if (data) {
                setProduct(data);
            } else {
                alert('Product not found');
                router.push('/admin/products');
            }
            setIsLoading(false);
        };
        load();
    }, [id, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('details.')) {
            const detailField = name.split('.')[1];
            setProduct((prev: any) => ({
                ...prev,
                details: { ...prev.details, [detailField]: value }
            }));
        } else {
            setProduct((prev: any) => ({ ...prev, [name]: value }));
        }
    };

    const handleArrayChange = (index: number, value: string, field: 'images' | 'features') => {
        const newArr = [...product[field]];
        newArr[index] = value;
        setProduct((prev: any) => ({ ...prev, [field]: newArr }));
    };

    const addItem = (field: 'images' | 'features') => {
        setProduct((prev: any) => ({ ...prev, [field]: [...prev[field], ''] }));
    };

    const removeItem = (index: number, field: 'images' | 'features') => {
        if (product[field].length > 1) {
            const newArr = [...product[field]];
            newArr.splice(index, 1);
            setProduct((prev: any) => ({ ...prev, [field]: newArr }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        const finalImages = product.images.filter((img: string) => img.trim() !== '');
        if (finalImages.length === 0) {
            alert('Please provide at least one image URL for the product.');
            return;
        }

        setIsSaving(true);
        try {
            const { id: _, ...updates } = product; // Remove ID from payload
            await updateProduct(id, {
                ...updates,
                price: parseFloat(product.price),
                originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : undefined,
                images: finalImages,
                features: product.features.filter((f: string) => f.trim() !== '')
            });
            router.push('/admin/products');
        } catch (error) {
            alert('Error updating product');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className={styles.loading}>Loading product details...</div>;

    const categories = ['Silk', 'Cotton', 'Bridal', 'Festive', 'Designer'];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/admin/products" className={styles.backBtn}>
                    <ArrowLeft size={20} />
                    Back to Products
                </Link>
                <h1 className={styles.title}>Edit Saree</h1>
            </div>

            <form onSubmit={handleSubmit} className={styles.formGrid}>
                <div className={styles.mainCard}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Basic Information</h2>
                        <div className={styles.inputGroup}>
                            <label>Product Name</label>
                            <input name="name" value={product.name} onChange={handleChange} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Description</label>
                            <textarea name="description" value={product.description} onChange={handleChange} required rows={5} />
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
                                <input name="price" type="number" value={product.price} onChange={handleChange} required />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Original Price (₹)</label>
                                <input name="originalPrice" type="number" value={product.originalPrice || ''} onChange={handleChange} />
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Details & Specifications</h2>
                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label>Fabric</label>
                                <input name="details.fabric" value={product.details?.fabric || ''} onChange={handleChange} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Work Type</label>
                                <input name="details.work" value={product.details?.work || ''} onChange={handleChange} />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <label>Color</label>
                                <input name="details.color" value={product.details?.color || ''} onChange={handleChange} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Total Length</label>
                                <input name="details.length" value={product.details?.length || ''} onChange={handleChange} />
                            </div>
                        </div>
                    </section>
                </div>

                <div className={styles.sideColumn}>
                    <section className={styles.card}>
                        <h2 className={styles.sectionTitle}>Product Images</h2>
                        <p className={styles.hint}>Upload an image from your computer or paste a URL directly.</p>
                        {product.images.map((img: string, idx: number) => (
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
                        {product.features.map((feat: string, idx: number) => (
                            <div key={idx} className={styles.arrayItem}>
                                <input value={feat} onChange={(e) => handleArrayChange(idx, e.target.value, 'features')} placeholder="Feature" />
                                <button type="button" onClick={() => removeItem(idx, 'features')} className={styles.removeBtn}><X size={14} /></button>
                            </div>
                        ))}
                        <button type="button" onClick={() => addItem('features')} className={styles.addItemBtn}>
                            <Plus size={14} /> Add Feature
                        </button>
                    </section>

                    <button type="submit" disabled={isSaving || isUploading} className={styles.saveBtn}>
                        <Save size={18} />
                        {isSaving ? 'Saving Changes...' : 'Update Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function EditProductPage() {
    return (
        <React.Suspense fallback={<div className={styles.loading}>Loading product details...</div>}>
            <EditProductContent />
        </React.Suspense>
    );
}
