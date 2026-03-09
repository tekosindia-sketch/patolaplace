'use client';
import React, { useState } from 'react';
import { Save, Globe, Smartphone, Mail, Instagram, Facebook } from 'lucide-react';
import styles from './page.module.css';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        storeName: 'Patolaplace',
        storeEmail: 'contact@patolaplace.com',
        storePhone: '+91 98765 43210',
        instagram: '@patolaplace',
        facebook: 'patolaplace.official',
        shippingFee: '150',
        freeShippingThreshold: '5000'
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({ ...settings, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('Settings saved successfully!');
        }, 1000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Settings</h1>
                <p className={styles.subtitle}>Manage your store configuration </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}><Globe size={18} /> General Information</h2>
                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label>Store Name</label>
                            <input name="storeName" value={settings.storeName} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Contact Email</label>
                            <input name="storeEmail" value={settings.storeEmail} onChange={handleChange} />
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}><Instagram size={18} /> Social Media</h2>
                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label>Instagram Handle</label>
                            <input name="instagram" value={settings.instagram} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Facebook Page</label>
                            <input name="facebook" value={settings.facebook} onChange={handleChange} />
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}><CreditCard size={18} /> Shipping & Payments</h2>
                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label>Flat Shipping Fee (₹)</label>
                            <input name="shippingFee" value={settings.shippingFee} onChange={handleChange} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Free Shipping Above (₹)</label>
                            <input name="freeShippingThreshold" value={settings.freeShippingThreshold} onChange={handleChange} />
                        </div>
                    </div>
                </section>

                <button type="submit" disabled={isSaving} className={styles.saveBtn}>
                    <Save size={18} />
                    {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
            </form>
        </div>
    );
}

// Add CreditCard import missing in lucide-react if needed or use ShoppingBag
import { CreditCard } from 'lucide-react';
