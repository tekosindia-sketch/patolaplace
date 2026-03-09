'use client';
import React, { useState } from 'react';
import { products } from '@/data/products';
import { addProduct } from '@/lib/admin';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function MigrateDataPage() {
    const [status, setStatus] = useState<string>('idle');
    const [progress, setProgress] = useState<number>(0);

    const handleMigrate = async () => {
        setStatus('migrating');
        setProgress(0);

        try {
            // 1. (Optional) Clear existing collection to avoid duplicates during testing
            // (Be careful running this in production!)
            const querySnapshot = await getDocs(collection(db, 'products'));
            const deletePromises = querySnapshot.docs.map(d => deleteDoc(d.ref));
            await Promise.all(deletePromises);

            // 2. Add all products
            for (let i = 0; i < products.length; i++) {
                const p = products[i];
                // strip the old string ID so firestore generates a real document ID
                const { id: _, ...productWithoutId } = p;

                await addProduct(productWithoutId);
                setProgress(Math.round(((i + 1) / products.length) * 100));
            }

            setStatus('success');
        } catch (error) {
            console.error("Migration failed:", error);
            setStatus('error');
        }
    };

    return (
        <div style={{ padding: 40, maxWidth: 600, margin: '0 auto', fontFamily: 'monospace' }}>
            <h2>Firebase Data Migration</h2>
            <p>This will delete existing products in Firestore and upload the {products.length} hardcoded products from <code>src/data/products.ts</code>.</p>

            <button
                onClick={handleMigrate}
                disabled={status === 'migrating'}
                style={{ padding: '10px 20px', background: 'var(--charcoal)', color: 'white', cursor: 'pointer', marginTop: 20 }}
            >
                {status === 'migrating' ? `Migrating... ${progress}%` : 'Start Migration'}
            </button>

            {status === 'success' && <p style={{ color: 'green', marginTop: 20 }}>Migration complete! Data is now in Firestore.</p>}
            {status === 'error' && <p style={{ color: 'red', marginTop: 20 }}>Migration failed. Check console.</p>}
        </div>
    );
}
