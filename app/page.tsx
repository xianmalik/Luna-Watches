import BrandsGrid from "@/blocks/BrandsGrid";
import CollectionsGrid from "@/blocks/CollectionsGrid";
import FeaturesGrid from "@/blocks/FeaturesGrid";
import HeroSlider from "@/blocks/HeroSlider";
import ProductsGrid from "@/blocks/ProductsGrid";
import { dummyjsonFetch } from "@/lib/dummyjson";
import type { ProductsResponse } from "@/types/products";

export default async function Home() {
  const { products } = await dummyjsonFetch<ProductsResponse>("/products", {
    params: { limit: "5" },
  });
  return (
    <>
      <HeroSlider
        slides={[
          {
            image: "/assets/images/slider-image-1.png",
            title: "LUXURY WATCHES",
            description: "Trova Tutte le informationi sui nostri prodotti, le offerte e le novità",
            button: {
              text: "Explore The Collections",
              responsiveText: "Explore",
              url: "/collections"
            }
          },
          {
            image: "/assets/images/slider-image-1.png",
            title: "LUXURY WATCHES",
            description: "Trova Tutte le informationi sui nostri prodotti, le offerte e le novità",
            button: {
              text: "Explore The Collections",
              responsiveText: "Explore",
              url: "/collections"
            }
          },
          {
            image: "/assets/images/slider-image-1.png",
            title: "LUXURY WATCHES",
            description: "Trova Tutte le informationi sui nostri prodotti, le offerte e le novità",
            button: {
              text: "Explore The Collections",
              responsiveText: "Explore",
              url: "/collections"
            }
          },
        ]}
      />
      <BrandsGrid
        title="Popular Brands"
        brands={[
          "ROLEX",
          "Patek Philippe",
          "Breitling",
          "Omega",
          "Audemars Piguet",
          "Tudor",
          "CARTIER",
          "IWC",
          "PANERAI",
          "SEIKO",
        ]}
       />
      <CollectionsGrid
        title="Collections"
        collections={[
          {
            title: "Rolex",
            image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=600&fit=crop",
            href: "/collections/rolex",
          },
          {
            title: "Complications",
            image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&h=600&fit=crop",
            href: "/collections/complications",
          },
          {
            title: "Men\u2019s Collections",
            image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&h=600&fit=crop",
            href: "/collections/mens",
          },
          {
            title: "Audemars Piguet",
            image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&h=600&fit=crop",
            href: "/collections/audemars-piguet",
          },
          {
            title: "Rare to Find",
            image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&h=600&fit=crop",
            href: "/collections/rare",
          },
          {
            title: "Women\u2019s Collection",
            image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&h=600&fit=crop",
            href: "/collections/womens",
          },
        ]}
      />
       <ProductsGrid
        title="New Arrivals"
        products={products}
        />
      <FeaturesGrid
        title="Swiss Luxury Watches Since 2000"
        features={[
          {
            icon: "/assets/illustrations/buyer-rating.svg",
            headline: "4.8 Out of 5 Stars",
            lines: ["From 136,000", "Reviews Worldwide"],
          },
          {
            icon: "/assets/illustrations/watch-love.svg",
            headline: "9 Million",
            lines: ["Watch Enthusiasts", "Use Chrono24 Each Month"],
          },
          {
            icon: "/assets/illustrations/customers.svg",
            headline: "Over 200,000",
            lines: ["Customers Choose", "Buyer Protection Annually"],
          },
          {
            icon: "/assets/illustrations/thustworthy.svg",
            headline: "More Than 25,000",
            lines: ["Trustworthy", "Sellers"],
          },
        ]}
      />
      </>
  )
}
