'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '@/types';

interface WishlistContextType {
    items: Product[];
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    toggle: (product: Product) => void;
    count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<Product[]>([]);

    const addItem = useCallback((product: Product) => {
        setItems(prev => {
            if (prev.find(i => i.id === product.id)) return prev;
            return [...prev, product];
        });
    }, []);

    const removeItem = useCallback((productId: string) => {
        setItems(prev => prev.filter(i => i.id !== productId));
    }, []);

    const isInWishlist = useCallback((productId: string) => {
        return items.some(i => i.id === productId);
    }, [items]);

    const toggle = useCallback((product: Product) => {
        if (items.find(i => i.id === product.id)) {
            removeItem(product.id);
        } else {
            addItem(product);
        }
    }, [items, addItem, removeItem]);

    return (
        <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, toggle, count: items.length }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
    return ctx;
}
