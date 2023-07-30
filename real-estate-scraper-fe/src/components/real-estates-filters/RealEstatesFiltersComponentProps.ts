import { RealEstateQuery } from "../../core/models/query/RealEstateQuery.ts";
import { Dispatch, SetStateAction } from "react";

export interface RealEstatesFiltersComponentProps {
  setRealEstateQuery: Dispatch<SetStateAction<RealEstateQuery>>;
}
