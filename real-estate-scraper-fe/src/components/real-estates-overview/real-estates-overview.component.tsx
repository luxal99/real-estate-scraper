import "./real-estates-overview.component.scss";
import { RealEstatesOverviewComponentProps } from "./RealEstatesOverviewComponentProps";
import { useEffect, useState } from "react";
import { RealEstate } from "../../core/models/real-estate/real-estate.model.ts";
import {
  enterNewest,
  getRealEstates,
} from "../../core/http/real-estate.http.ts";
import { RealEstateCardComponent } from "../real-estate-card/real-estate-card.component.tsx";
import { RealEstateQuery } from "../../core/models/query/RealEstateQuery.ts";
import { LoaderComponent } from "../loader/loader.component.tsx";
import { RealEstatesFiltersComponent } from "../real-estates-filters/real-estates-filters.component.tsx";
export const RealEstatesOverviewComponent =
  ({}: RealEstatesOverviewComponentProps) => {
    const [realEstates, setRealEstates] = useState<RealEstate[]>([]);
    const [showLoader, setShowLoader] = useState(false);

    const [realEstateQuery, setRealEstateQuery] = useState<RealEstateQuery>({
      page: 1,
    });

    useEffect(() => {
      (async () => {
        await getLocalRealEstates();
      })();
    }, [realEstateQuery]);

    useEffect(() => {}, [realEstates]);
    const getLocalRealEstates = async () => {
      setShowLoader(true);
      const { data } = await getRealEstates(realEstateQuery);
      setRealEstates(data);
      setShowLoader(false);
    };

    const getNewest = async () => {
      setShowLoader(true);
      await enterNewest();
      await getLocalRealEstates();
      setShowLoader(false);
    };
    const next = () => {
      setRealEstateQuery((curr) => {
        return { ...curr, page: curr.page + 1 };
      });
    };

    const previous = () => {
      setRealEstateQuery((curr) => {
        return { ...curr, page: curr.page > 1 ? curr.page - 1 : curr.page };
      });
    };

    return (
      <div>
        <RealEstatesFiltersComponent setRealEstateQuery={setRealEstateQuery} />
        <div className="real-estate-overview">
          {realEstates.map((realEstate, index) => (
            <RealEstateCardComponent realEstate={realEstate} key={index} />
          ))}
        </div>
        <div className="pagination">
          <button onClick={previous} disabled={realEstateQuery.page === 1}>
            Prev
          </button>
          <button onClick={next}>Next</button>
          <button onClick={async () => await getNewest()}>{"Reload"}</button>
        </div>
        <LoaderComponent show={showLoader} />
      </div>
    );
  };
