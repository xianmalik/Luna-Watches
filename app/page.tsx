import BrandsGrid from "@/blocks/BrandsGrid";
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
      </>
  )
}
