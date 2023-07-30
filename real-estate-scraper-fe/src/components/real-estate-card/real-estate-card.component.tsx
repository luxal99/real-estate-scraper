import "./real-estate-card.component.scss";
import { RealEstateCardComponentProps } from "./RealEstateCardComponentProps";
export const RealEstateCardComponent = ({
  realEstate,
}: RealEstateCardComponentProps) => {

    const showRealEstate = ()=>{
        window.location.href = realEstate.link
    }
  return (
    <div className="real-estate-card" onClick={showRealEstate}>
      <div>
          <img src={realEstate.picture}/>
      </div>
      <div className='real-estate-card--body'>
        <p>{realEstate.title}</p>
        <p>{realEstate.area}</p>
        <h2>{realEstate.price}€</h2>
      </div>
    </div>
  );
};
