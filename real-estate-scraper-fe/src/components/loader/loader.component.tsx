import "./loader.component.scss";
import { LoaderComponentProps } from "./LoaderComponentProps";
export const LoaderComponent = ({show}: LoaderComponentProps) => {
  return (
    <div className={`loader-wrapper ${show ? 'loader--show':'loader--hide'}`}>
      <div className="loader"></div>
    </div>
  );
};
