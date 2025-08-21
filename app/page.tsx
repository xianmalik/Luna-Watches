import { Fragment } from "react";

// Homepage Blocks
import HeroSlider from "@/blocks/HeroSlider";
import ProductGrid from "@/blocks/ProductGrid";

// Content JSON
import content from "@/content/home.json";
import products from "@/content/products.json";
import CardGrid from "@/blocks/CardGrid";

export default function Home() {
  return (
    <Fragment>
      <HeroSlider slides={content.slides} />
      <ProductGrid title={"New Arrival"} products={products.filter(product => product.isNewArrival)} />
      <CardGrid />
    </Fragment>
  );
}
