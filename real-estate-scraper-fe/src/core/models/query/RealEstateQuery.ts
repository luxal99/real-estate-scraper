export interface RealEstateQuery {
  page: number;
  priceFrom?: number;
  priceTo?: number;
  areaFrom?: number;
  areaTo?: number;
}

export type RealEstateFilters = Omit<RealEstateQuery, "page">;
