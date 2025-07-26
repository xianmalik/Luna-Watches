import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

interface ProductImage {
    src: string;
}

interface ProductNode {
    id: string;
    title: string;
    handle: string;
    images: {
        edges: { node: ProductImage }[];
    };
}

interface ShopifyResponse {
    products: {
        edges: { node: ProductNode }[];
    };
}

export async function GET() {
    const query = `
        {
            products(first: 10) {
                edges {
                    node {
                        id
                        title
                        handle
                        images(first: 1) {
                            edges {
                                node {
                                    src
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const data: ShopifyResponse = await shopifyFetch(query);
        return NextResponse.json(data.products.edges.map(edge => edge.node));
    } catch (err: unknown) {
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'An unknown error occurred' },
            { status: 500 }
        );
    }
}