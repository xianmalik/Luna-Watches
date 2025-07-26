import HeroSlider from "@/blocks/HeroSlider";

export default function Home() {
  return (
    <HeroSlider
      slides={[
        {
          image: "/assets/images/slider-image-1.png",
          title: "LUXURY WATCHES",
          description: "Trova Tutte le informationi sui nostri prodotti, le offerte e le novità",
          button: {
            text: "Explore The Collections",
            url: "/collections"
          }
        },
        {
          image: "/assets/images/slider-image-1.png",
          title: "LUXURY WATCHES",
          description: "Trova Tutte le informationi sui nostri prodotti, le offerte e le novità",
          button: {
            text: "Explore The Collections",
            url: "/collections"
          }
        },
        {
          image: "/assets/images/slider-image-1.png",
          title: "LUXURY WATCHES",
          description: "Trova Tutte le informationi sui nostri prodotti, le offerte e le novità",
          button: {
            text: "Explore The Collections",
            url: "/collections"
          }
        },
      ]}
    />
  );
}
