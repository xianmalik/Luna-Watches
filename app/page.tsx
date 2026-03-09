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
            title: "DISCOVER MORE",
            description: "Explore our curated collection of products, deals, and new arrivals",
            button: {
              text: "Explore The Collections",
              responsiveText: "Explore",
              url: "/collections"
            }
          },
          {
            image: "/assets/images/slider-image-1.png",
            title: "DISCOVER MORE",
            description: "Explore our curated collection of products, deals, and new arrivals",
            button: {
              text: "Explore The Collections",
              responsiveText: "Explore",
              url: "/collections"
            }
          },
          {
            image: "/assets/images/slider-image-1.png",
            title: "DISCOVER MORE",
            description: "Explore our curated collection of products, deals, and new arrivals",
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
          "Nike",
          "Apple",
          "Samsung",
          "Sony",
          "Adidas",
          "Dyson",
          "Bose",
          "Lego",
          "New Balance",
          "The North Face",
        ]}
       />
      <CollectionsGrid
        title="Collections"
        collections={[
          {
            title: "Electronics",
            image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=600&fit=crop",
            href: "/collections/electronics",
          },
          {
            title: "Home & Living",
            image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=600&fit=crop",
            href: "/collections/home-living",
          },
          {
            title: "Men\u2019s",
            image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=600&fit=crop",
            href: "/collections/mens",
          },
          {
            title: "Women\u2019s",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=600&fit=crop",
            href: "/collections/womens",
          },
          {
            title: "Trending",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop",
            href: "/collections/trending",
          },
          {
            title: "Sale",
            image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&h=600&fit=crop",
            href: "/collections/sale",
          },
        ]}
      />
       <ProductsGrid
        title="New Arrivals"
        products={products}
        />
      <FeaturesGrid
        title="Trusted Online Shopping Since 2000"
        features={[
          {
            icon: "/assets/illustrations/buyer-rating.svg",
            headline: "4.8 Out of 5 Stars",
            lines: ["From 136,000", "Reviews Worldwide"],
          },
          {
            icon: "/assets/illustrations/love-shopping.svg",
            headline: "9 Million",
            lines: ["Happy Customers", "Shop With Us Each Month"],
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
