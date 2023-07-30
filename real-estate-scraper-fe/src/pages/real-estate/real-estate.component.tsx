import "./real-estate.component.scss";
import { RealEstateComponentProps } from "./RealEstateComponentProps";
import { RealEstatesOverviewComponent } from "../../components/real-estates-overview/real-estates-overview.component.tsx";
export const RealEstateComponent = ({}: RealEstateComponentProps) => {
  return (
    <div>
      <RealEstatesOverviewComponent></RealEstatesOverviewComponent>
    </div>
  );
};
