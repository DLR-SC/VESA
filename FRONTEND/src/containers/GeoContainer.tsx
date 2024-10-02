import GeoFilterCard from "../components/GeoFilterCard";
import { useState } from "react";
import { IContainerProps, ILocation, IPointHoverHandler } from "types/appData";
import GeoChartContainer from "./GeoChartContainer";

function GeoContainer(props: IContainerProps): JSX.Element {
  const [hoverCoordinates, setHoverCoordinates] = useState<ILocation>({
    lat: "",
    lon: "",
  });

  const handleHoverCoordinates: IPointHoverHandler = (lat, lon) => {
    setHoverCoordinates({ lat, lon });
  };

  return (
    <>
      <GeoFilterCard hoverPoints={hoverCoordinates} />
      <GeoChartContainer
        handlePointerHover={handleHoverCoordinates}
      />
    </>
  );
}

export default GeoContainer;
