import CardSingle from '@/components/CardSingle';

// Dummy data for 6 cards
const dummyCards = [
  {
    title: "Luxury Watches",
    description: "Discover our collection of premium timepieces from world-renowned brands. Each watch tells a unique story of craftsmanship and elegance.",
    buttonText: "Shop Now",
    buttonLink: "/watches",
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=600&fit=crop"
  },
  {
    title: "Vintage Collection",
    description: "Timeless classics that never go out of style. Our vintage collection features rare finds and iconic designs from decades past.",
    buttonText: "Explore",
    buttonLink: "/vintage",
    imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&h=600&fit=crop"
  },
  {
    title: "Smart Watches",
    description: "Modern technology meets sophisticated design. Stay connected with our range of smartwatches that blend functionality with style.",
    buttonText: "Learn More",
    buttonLink: "/smartwatches",
    imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=600&fit=crop"
  },
  {
    title: "Limited Edition",
    description: "Exclusive pieces that define luxury. Our limited edition watches are crafted in small numbers for discerning collectors.",
    buttonText: "View Collection",
    buttonLink: "/limited-edition",
    imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop"
  },
  {
    title: "Sports Watches",
    description: "Built for adventure and performance. Our sports watches combine durability with precision for every outdoor enthusiast.",
    buttonText: "Discover",
    buttonLink: "/sports",
    imageUrl: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800&h=600&fit=crop"
  },
  {
    title: "Accessories",
    description: "Complete your look with our premium watch accessories. From straps to winders, we have everything you need.",
    buttonText: "Shop Accessories",
    buttonLink: "/accessories",
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=600&fit=crop"
  }
];

export default function CardGrid() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyCards.map((card, index) => (
          <CardSingle
            key={index}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
            buttonLink={card.buttonLink}
            imageUrl={card.imageUrl}
          />
        ))}
      </div>
    </section>
  );
}