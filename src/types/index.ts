export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    fabric: string;
    occasion: string[];
    color: string;
    colorHex: string;
    description: string;
    longDescription: string;
    images: string[];
    rating: number;
    reviewCount: number;
    isNew?: boolean;
    isBestseller?: boolean;
    category: string;
    blouseIncluded: boolean;
    length: string;
    careInstructions: string[];
    tags: string[];
    reviews?: Review[];
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface WishlistItem {
    product: Product;
    addedAt: Date;
}

export interface Review {
    id: string;
    name: string;
    location: string;
    rating: number;
    text: string;
    date: string;
    image?: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    image: string;
    productCount: number;
}
