export interface Product {
    id: number | string; // Can be UUID or numeric
    slug: string; // For SEO-friendly URLs

    name: string;
    description?: string;
    shortDescription?: string;
    brand?: Brand;
    sku?: string; // Stock Keeping Unit
    barcode?: string; // UPC/EAN/etc

    price: {
        original: number; // Original price before discount
        current: number;  // Current/discounted price
        currency: string; // e.g., 'USD', 'EUR'
    };
    discount?: {
        type: 'percentage' | 'fixed';
        value: number;
        validUntil?: Date;
    };

    stock: {
        quantity: number;
        inStock: boolean;
        lowStockThreshold?: number;
    };

    isFeatured?: boolean;
    isPreOwned?: boolean;
    isNewArrival?: boolean;
    isBestSeller?: boolean;

    condition?: 'new' | 'used' | 'refurbished';
    warranty?: string;

    categories?: Category[];
    tags?: string[];

    variants?: Variant[]; // For size/color/etc
    options?: ProductOption[]; // Additional selectable features

    featuredImage: ProductImage;
    images: ProductImage[]; // Multiple images
    videos?: string[]; // Video URLs or IDs

    shipping?: {
        weight?: number; // in kg
        dimensions?: { length: number; width: number; height: number }; // cm
        shipsFrom?: string;
        estimatedDeliveryDays?: number;
        freeShipping?: boolean;
    };

    ratings?: {
        average: number;
        count: number;
    };
    reviewsCount?: number;

    seo?: {
        title?: string;
        description?: string;
        keywords?: string[];
        canonicalUrl?: string;
    };

    status?: 'active' | 'inactive' | 'draft' | 'archived';
    visibility?: 'public' | 'private' | 'unlisted';

    createdAt: Date;
    updatedAt: Date;
}

interface Variant {
    id: string;
    name: string; // e.g., "Red - Large"
    sku?: string;
    price?: number;
    stock?: number;
    image?: string;
    options: Record<string, string>; // e.g., { Color: 'Red', Size: 'Large' }
}

interface ProductOption {
    name: string; // e.g., 'Size' or 'Color'
    values: string[]; // e.g., ['S', 'M', 'L'] or ['Red', 'Blue']
}

interface ProductImage {
    url: string;
    alt?: string;
    isPrimary?: boolean;
}

interface Brand {
    id: string;
    name: string;
    logoUrl?: string;
}

interface Category {
    id: string;
    name: string;
    slug: string;
    parentId?: string;
}
