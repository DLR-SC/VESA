import { useEffect } from "react";
import {
  resetDatasetSlice,
  setChordData,
  setDataset,
  setGeoData,
  setKeywordData,
  setTimeData,
} from "store/dataset/datasetSlice";
import {
  extractAndTransformTimeData,
  getDatasetID,
  getDatasetIDIntersection,
  intervalTreeFromTimedata,
  processAuthorData,
} from "store/dataset/utility/utility";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  useGetInitialAuthorDataQuery,
  useGetInitialDatasetsQuery,
  useGetInitialKeywordDataQuery,
} from "store/services/dataApi";
import {
  IDataset,
  IDatasetID,
  IKeywordData,
  TemporalCoverage,
} from "types/appData";
import { useQuery } from "./useQuery";

/** A custom query for filling data states*/

export const useDatafill = () => {
  const dispatch = useAppDispatch();

  const { data: initialDataset } = useGetInitialDatasetsQuery();
  const { data: initialkeywordData } = useGetInitialKeywordDataQuery();
  const { data: initialAuthorData } = useGetInitialAuthorDataQuery();

  const {
    getRelatedKeywords,
    getRelatedDatasets,
    getAuthorData,
    getTimeDataset,
  } = useQuery();

  const selectedKeywordObject = useAppSelector(
    (state) => state.selectedKeyword.selectedKeyword as IKeywordData
  );
  const selectedGeoData = useAppSelector(
    (state) => state.dataset.selectedGeoData
  );

  /** Initial date constant for timeseries chart */
  const initialDateRanges = {
    startDate: new Date("1950-01-01"),
    endDate: new Date("2030-01-01"),
  };

  useEffect(() => {
    if (initialDataset?.result) {
      setInitialDataset();
      setInitialTimeData();
    }
  }, [initialDataset]);

  useEffect(() => {
    if (initialkeywordData?.result) {
      setInitialKeywordData();
    }
  }, [initialkeywordData]);

  useEffect(() => {
    if (initialAuthorData?.result) {
      setInitialChordData();
    }
  }, [initialAuthorData]);

  //setting initial data
  const setInitialDataset = () => {
    if (initialDataset) {
      dispatch(setDataset(initialDataset.result));
      dispatch(setGeoData(initialDataset.result));
    }
  };

  const setInitialKeywordData = () => {
    if (initialkeywordData) dispatch(setKeywordData(initialkeywordData.result));
  };

  const setInitialChordData = () => {
    if (initialAuthorData) {
      const result = processAuthorData(initialAuthorData.result);
      dispatch(setChordData(result));
    }
  };

  const setInitialTimeData = () => {
    if (initialDataset) {
      dispatch(
        setTimeData(
          timeDataExtractor(
            initialDataset?.result,
            initialDateRanges.startDate,
            initialDateRanges.endDate
          )
        )
      );
    }
  };

  // utility function for fetching and setting
  const fetchAndSet = async (
    datasetIds: IDatasetID[],
    skipGeoData = false,
    skipAuthorData = false,
    skipTimeData = false
  ) => {
    const relatedKeywordsData = await getRelatedKeywords(datasetIds);
    dispatch(setKeywordData(relatedKeywordsData.result));

    const relatedDatasets = await getRelatedDatasets(datasetIds);
    dispatch(setDataset(relatedDatasets.result));

    if (!skipTimeData) {
      dispatch(
        setTimeData(
          timeDataExtractor(
            relatedDatasets.result,
            initialDateRanges.startDate,
            initialDateRanges.endDate
          )
        )
      );
    }

    if (!skipAuthorData) {
      const authorData = await getAuthorData(datasetIds);
      const authorResult = processAuthorData(authorData.result);
      dispatch(setChordData(authorResult));
    }

    if (!skipGeoData) dispatch(setGeoData(relatedDatasets.result));
  };

  // this function fetches and sets related dataset for the selected keyword for all the other charts
  const fetchAndSetRelatedDataAgainstKeyword = async () => {
    if (selectedKeywordObject) {
      fetchAndSet(selectedKeywordObject.dataset_id);
    } else {
      resetDatasetSlice();
      initialSetterBundle();
    }
  };

  const fetchAndSetAgainstTimeData = async (range: TemporalCoverage) => {
    const result = await getTimeDataset(range);
    let datasetIDs = getDatasetID(result.result);

    if (selectedKeywordObject) {
      datasetIDs = getDatasetIDIntersection(
        datasetIDs,
        selectedKeywordObject.dataset_id
      );
    }

    if (selectedGeoData.length) {
      datasetIDs = getDatasetIDIntersection(datasetIDs, selectedGeoData);
    }

    fetchAndSet(datasetIDs, false, false, true);
  };

  // geodata filter setting and resetting
  const compareAndResetAgainstGeoData = (datasetIds: IDatasetID[]) => {
    if (datasetIds.length) {
      fetchAndSet(datasetIds, true);
    } else {
      if (selectedKeywordObject) {
        fetchAndSet(selectedKeywordObject.dataset_id, true);
      } else {
        initialSetterBundle();
      }
    }
  };

  const timeDataExtractor = (
    dataset: IDataset[],
    startDate: Date,
    endDate: Date
  ) => {
    const timeData = extractAndTransformTimeData(dataset);
    // const startDate = new Date(
    //   _.orderBy(timeData, ["start"], ["asc"])[0].start
    // );

    const resultantTimeData = intervalTreeFromTimedata(
      startDate,
      endDate,
      timeData
    );

    return resultantTimeData;
  };

  /** A function to handle initial data setting for all charts when reset button is clicked */
  const initialSetterBundle = () => {
    setInitialDataset();
    setInitialKeywordData();
    setInitialTimeData();
    setInitialChordData();
  };

  return {
    initialDateRanges,
    fetchAndSetRelatedDataAgainstKeyword,
    fetchAndSetAgainstTimeData,
    compareAndResetAgainstGeoData,
    fetchAndSet,
    initialSetterBundle,
  };
};
