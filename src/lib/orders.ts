import { supabase } from './supabase';
import { CartItem } from '@/types';

export interface OrderData {
    id?: number;
    trackingId: string;
    customerInfo: {
        name: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        pincode: string;
    };
    items: {
        productId: string;
        name: string;
        price: number;
        quantity: number;
        image: string;
    }[];
    paymentMethod: string;
    subtotal: number;
    shipping: number;
    total: number;
    status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
    createdAt: Date;
    estimatedDelivery: Date;
}

// Generate a random 6-character alphanumeric string like A9B2X7
function generateTrackingId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return 'ORD-' + id;
}

export async function createOrder(customerInfo: OrderData['customerInfo'], cartItems: CartItem[], paymentMethod: string, subtotal: number, shipping: number) {
    try {
        const trackingId = generateTrackingId();

        // Estimated delivery: 5-7 business days from now
        const estimatedDelivery = new Date();
        estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

        const orderDoc = {
            trackingId,
            customerInfo,
            items: cartItems.map(item => ({
                productId: item.product.id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity,
                image: item.product.images?.[0] || ''
            })),
            paymentMethod,
            subtotal,
            shipping,
            total: subtotal + shipping,
            status: 'Processing',
            createdAt: new Date().toISOString(),
            estimatedDelivery: estimatedDelivery.toISOString()
        };

        const { error } = await supabase.from('orders').insert(orderDoc);
        if (error) throw error;

        return trackingId;
    } catch (error) {
        console.error("Error creating order in Supabase: ", error);
        throw error;
    }
}

export async function getOrderByTrackingId(trackingId: string): Promise<OrderData | null> {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('trackingId', trackingId.toUpperCase())
            .single();

        if (error) throw error;
        if (!data) return null;

        return {
            ...data,
            createdAt: new Date(data.createdAt),
            estimatedDelivery: new Date(data.estimatedDelivery)
        } as OrderData;
    } catch (error) {
        console.error("Error fetching order from Supabase: ", error);
        return null;
    }
}
