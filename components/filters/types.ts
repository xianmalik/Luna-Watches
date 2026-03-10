export interface ProductFilters {
  priceRange: [number, number];
  brands: string[];
  categories: string[];
  minRating: number;
  availability: string[];
  sortBy: string;
  order: "asc" | "desc";
}

export function createDefaultFilters(
  priceMin: number,
  priceMax: number
): ProductFilters {
  return {
    priceRange: [priceMin, priceMax],
    brands: [],
    categories: [],
    minRating: 0,
    availability: [],
    sortBy: "title",
    order: "asc",
  };
}
