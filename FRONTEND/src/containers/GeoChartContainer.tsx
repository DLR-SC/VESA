import { CircularProgress } from "@mui/material";
import GeoChart from "../chartHooks/GeoChart";
import { useDatafill } from "../hooks/useDatafill";
import React from "react";
import {
  setSelectedGeoData,
  updateSelectedGeoData,
} from "../store/dataset/datasetSlice";
import { filterDatasetsIfChanged } from "../store/dataset/utility/utility";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useGetInitialDatasetsQuery } from "../store/services/dataApi";
import { IContainerProps, IDatasetID, IPointHoverHandler } from "types/appData";
import CenteredCard from "../components/CenteredCard";
import EmptyDatasetCard from "../components/EmptyDatasetCard";

interface IGeoChartContainer extends IContainerProps {
  handlePointerHover: IPointHoverHandler;
}

function GeoChartContainer(props: IGeoChartContainer): JSX.Element {
  const { isFetching } = useGetInitialDatasetsQuery();
  const locationData = useAppSelector((state) => state.dataset.geoData);
  const selectedGeoData = useAppSelector(
    (state) => state.dataset.selectedGeoData
  );
  const selectedKeywordObject = useAppSelector(
    (state) => state.selectedKeyword.selectedKeyword
  );
  const dispatch = useAppDispatch();

  const handleCoordinateSelection = (id: IDatasetID) => {
    dispatch(updateSelectedGeoData(id));
  };

  const { compareAndResetAgainstGeoData } = useDatafill();

  React.useEffect(() => {
    compareAndResetAgainstGeoData(selectedGeoData);
  }, [selectedGeoData]);

  React.useEffect(() => {
    if (selectedKeywordObject) {
      const updateSelectedGeoData = filterDatasetsIfChanged(
        locationData,
        selectedGeoData
      );
      if (updateSelectedGeoData)
        dispatch(setSelectedGeoData(updateSelectedGeoData));
    }
  }, [locationData]);

  if (isFetching) {
    return (
      <CenteredCard>
        <CircularProgress size={60} />
      </CenteredCard>
    );
  }

  return locationData.length ? (
    <GeoChart
      data={locationData}
      selectedCoordinate={handleCoordinateSelection}
      selectedIDs={selectedGeoData}
      onPointHover={props.handlePointerHover}
    />
  ) : (
    <EmptyDatasetCard />
  );
}

export default GeoChartContainer;
