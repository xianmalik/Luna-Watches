import BrandsGrid from "@/blocks/BrandsGrid";
import CollectionsGrid from "@/blocks/CollectionsGrid";
import FeaturesGrid from "@/blocks/FeaturesGrid";
import HeroSlider from "@/blocks/HeroSlider";
import ProductsGrid from "@/blocks/ProductsGrid";

export default function Home() {
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
        products={[
          {
            image: {
              url: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop",
              alt: "Product 1"
            },
            name: "Royal Oka 5th",
            slug: "royal-oka-5th",
            brand: "Patek Philippe",
            price: {
              original: 74000.00
            },
            badge: "PRE OWNED"
          },
          {
            image: {
              url: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=400&fit=crop",
              alt: "Product 2"
            },
            name: "Royal Oka 5th",
            slug: "royal-oka-5th-2",
            brand: "Patek Philippe",
            price: {
              original: 74000.00
            },
            badge: "PRE OWNED"
          },
          {
            image: {
              url: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&h=400&fit=crop",
              alt: "Product 3"
            },
            name: "Royal Oka 5th",
            slug: "royal-oka-5th-3",
            brand: "Patek Philippe",
            price: {
              original: 74000.00
            },
            badge: "PRE OWNED"
          },
          {
            image: {
              url: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop",
              alt: "Product 4"
            },
            name: "Royal Oka 5th",
            slug: "royal-oka-5th-4",
            brand: "Patek Philippe",
            price: {
              original: 74000.00
            },
            badge: "PRE OWNED"
          },
          {
            image: {
              url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop",
              alt: "Product 5"
            },
            name: "Royal Oka 5th",
            slug: "royal-oka-5th-5",
            brand: "Patek Philippe",
            price: {
              original: 74000.00
            },
            badge: "PRE OWNED"
          }]}
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
