import "./real-estates-filters.component.scss";
import { RealEstatesFiltersComponentProps } from "./RealEstatesFiltersComponentProps";
import { ChangeEvent, useState } from "react";
import { RealEstateFilters } from "../../core/models/query/RealEstateQuery.ts";
export const RealEstatesFiltersComponent = ({
  setRealEstateQuery,
}: RealEstatesFiltersComponentProps) => {
  const [currentFilters, setCurrentFilters] = useState<RealEstateFilters>({});
  const setValue = (input: ChangeEvent<HTMLInputElement>) => {
    setCurrentFilters((curr) => {
      const filterKeys = Object.keys(currentFilters);
      if (!filterKeys.includes(input.target.name)) {
        Object.defineProperty(curr, input.target.name, {
          value: Number.parseInt(input.target.value),
          enumerable: true,
          writable: true,
        });
      } else {
        curr[input.target.name as keyof RealEstateFilters] = Number.parseInt(
          input.target.value
        );
      }

      return { ...curr };
    });
  };

  const filter = () => {
    setRealEstateQuery((curr) => {
      return { ...curr, ...currentFilters };
    });
  };
  return (
    <div className="real-estate-filter">
      <input
        type="number"
        onChange={setValue}
        name="priceFrom"
        placeholder="Cena od"
      />
      <input
        name="priceTo"
        type="number"
        onChange={setValue}
        placeholder="Cena do"
      />
      <input
        name="areaFrom"
        placeholder="Površina od"
        type="number"
        onChange={setValue}
      />
      <input
        name="areaTo"
        placeholder="Površina do"
        onChange={setValue}
        type="number"
      />
      <button onClick={filter}>Filter</button>
    </div>
  );
};
