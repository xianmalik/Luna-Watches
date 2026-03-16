// ─── Site ─────────────────────────────────────────────────────────────────────

export const SITE_NAME = "Luna Store"
export const SITE_DESCRIPTION = "Your destination for quality products at great prices"

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAVBAR_PRIMARY_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/category", label: "Categories" },
  { href: "/products/new", label: "New Arrivals" },
  { href: "/contact", label: "Contact" },
]

// ─── Footer ───────────────────────────────────────────────────────────────────

export const FOOTER_SECTIONS = [
  {
    title: "Explore",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Blog", href: "/blog" },
      { label: "Collections", href: "/collections" },
      { label: "Buying Guides", href: "/guides" },
      { label: "Reviews", href: "/reviews" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Sell With Us", href: "/sell" },
      { label: "Trade-In", href: "/trade" },
      { label: "Extend Care", href: "/care" },
      { label: "Warranties and Repairs", href: "/repairs" },
      { label: "FAQs", href: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Our Locations", href: "/locations" },
      { label: "Careers", href: "/careers" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
]

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Twitter", href: "https://twitter.com" },
]

// ─── Cart ─────────────────────────────────────────────────────────────────────

export const CART_GUEST_USER_ID = 1
export const CART_MAX_QUANTITY = 99
export const CART_BADGE_MAX_DISPLAY = 99

// ─── UI Timing ────────────────────────────────────────────────────────────────

export const ADD_TO_CART_SUCCESS_MS = 2000
export const SEARCH_DEBOUNCE_MS = 300

// ─── Filters ──────────────────────────────────────────────────────────────────

export const FILTER_INITIAL_VISIBLE_COUNT = 8

export const SORT_OPTIONS = [
  { value: "title-asc", label: "Name: A to Z" },
  { value: "title-desc", label: "Name: Z to A" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
]

// ─── Products / API ───────────────────────────────────────────────────────────

export const HOME_PRODUCTS_LIMIT = 5
export const PRODUCTS_PAGE_LIMIT = 194
export const RELATED_PRODUCTS_LIMIT = 6

// ─── Payment ──────────────────────────────────────────────────────────────────

export const PAYMENT_METHODS = [
  {
    id: "cod" as const,
    label: "Cash on Delivery",
    description: "Pay with cash when your order is delivered",
    icon: "Wallet",
  },
  {
    id: "bank" as const,
    label: "Bank Transfer",
    description: "Transfer payment directly to our bank account",
    icon: "Banknote",
  },
]

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cod: "Cash on Delivery",
  bank: "Bank Transfer",
}

export const BANK_TRANSFER_DETAILS = {
  bank: "Luna Bank",
  accountName: "Luna Store",
  accountNumber: "1234567890",
  swiftCode: "LUNAXXXX",
}

// ─── Hero Slides ──────────────────────────────────────────────────────────────

export const HERO_SLIDES = [
  {
    image: "/assets/images/slider-image-1.png",
    title: "DISCOVER MORE",
    description: "Explore our curated collection of products, deals, and new arrivals",
    button: { text: "Explore The Collections", responsiveText: "Explore", url: "/collections" },
  },
  {
    image: "/assets/images/slider-image-1.png",
    title: "DISCOVER MORE",
    description: "Explore our curated collection of products, deals, and new arrivals",
    button: { text: "Explore The Collections", responsiveText: "Explore", url: "/collections" },
  },
  {
    image: "/assets/images/slider-image-1.png",
    title: "DISCOVER MORE",
    description: "Explore our curated collection of products, deals, and new arrivals",
    button: { text: "Explore The Collections", responsiveText: "Explore", url: "/collections" },
  },
]

// ─── Homepage Brands ──────────────────────────────────────────────────────────

export const HOME_BRANDS = [
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
]

// ─── Homepage Collections ─────────────────────────────────────────────────────

export const HOME_COLLECTIONS = [
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
]

// ─── Homepage Features ────────────────────────────────────────────────────────

export const HOME_FEATURES = [
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
]
