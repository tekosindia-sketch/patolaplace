import { supabase } from './supabase';
import { Product } from '@/types';
import { OrderData } from './orders';

// =============================================
// Products — powered by Supabase
// =============================================

export const getProducts = async (): Promise<Product[]> => {
    try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        return (data || []) as Product[];
    } catch (e) {
        console.error("Error fetching products from Supabase", e);
        return [];
    }
};

export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
        if (error) throw error;
        return data as Product;
    } catch (e) {
        console.error("Error fetching product by ID from Supabase", e);
        return null;
    }
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
        const id = String(Date.now());
        const { error } = await supabase.from('products').insert({ id, ...product });
        if (error) throw error;
        return id;
    } catch (e) {
        console.error("Error adding product to Supabase: ", e);
        throw e;
    }
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
        const { error } = await supabase.from('products').update(updates).eq('id', id);
        if (error) throw error;
    } catch (e) {
        console.error("Error updating product in Supabase: ", e);
        throw e;
    }
};

export const deleteProduct = async (id: string) => {
    try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
    } catch (e) {
        console.error("Error deleting product from Supabase: ", e);
        throw e;
    }
};

// =============================================
// Orders — powered by Supabase
// =============================================

export const getAllOrders = async (): Promise<OrderData[]> => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('createdAt', { ascending: false });

        if (error) throw error;

        return (data || []).map(row => ({
            ...row,
            createdAt: new Date(row.createdAt),
            estimatedDelivery: new Date(row.estimatedDelivery)
        })) as OrderData[];
    } catch (e) {
        console.error("Error fetching orders from Supabase", e);
        return [];
    }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
    try {
        const { error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId);

        if (error) throw error;
    } catch (e) {
        console.error("Error updating order status in Supabase", e);
        throw e;
    }
};
