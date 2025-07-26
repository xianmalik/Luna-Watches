import { NextApiRequest, NextApiResponse } from "next";
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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
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
        res.status(200).json(data.products.edges.map(edge => edge.node));
    } catch (err: unknown) {
        res.status(500).json({ error: err instanceof Error ? err.message : 'An unknown error occurred' });
    }
}