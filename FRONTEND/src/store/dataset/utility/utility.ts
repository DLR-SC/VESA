import createIntervalTree from "interval-tree-1d";
import _ from "lodash";
import {
  AuthorData,
  ChordData,
  IDataset,
  IDatasetID,
  IGeoData,
  ITimeData,
  ITransformedTimeData,
} from "types/appData";

export const extractGeoData = (datasets: IDataset[]): IGeoData[] => {
  const hasValidLocation = (
    dataset: IDataset
  ): dataset is IDataset & {
    location_data: { mean_latitude: `${number}`; mean_longitude: `${number}` };
  } => {
    return (
      dataset.location_data !== undefined &&
      dataset.location_data.mean_latitude !== null &&
      dataset.location_data.mean_longitude !== null
    );
  };

  const getGroupId = (datasetID: IDatasetID) => {
    if (datasetID.startsWith("Dataset")) {
      return "dataset";
    } else if (datasetID.startsWith("STACCollection")) {
      return "staccollection";
    }
    return "dataset";
  };

  return datasets.filter(hasValidLocation).map((dataset) => ({
    id: dataset.id,
    coordinates: [
      dataset.location_data.mean_longitude,
      dataset.location_data.mean_latitude,
    ],
    groupId: getGroupId(dataset.id),
  }));
};

/** Utility function for deselecting geoData  */
export const toggleSelectedGeoData = (
  selectedGeoData: IDatasetID[],
  datasetID: IDatasetID
): IDatasetID[] => {
  const exists = selectedGeoData.includes(datasetID);
  if (exists) {
    return selectedGeoData.filter((id) => id !== datasetID);
  } else {
    return [...selectedGeoData, datasetID];
  }
};

/** Utility function to update selectedGeoData points to exclude search term related data  */
export const filterDatasetsIfChanged = (
  locationData: IGeoData[],
  selectedGeoDataset: IDatasetID[]
): IDatasetID[] | null => {
  const locationDataIds = new Set(locationData.map((data) => data.id));

  const filteredSelectedGeoDataset = selectedGeoDataset.filter((id) =>
    locationDataIds.has(id)
  );

  if (
    filteredSelectedGeoDataset.length === selectedGeoDataset.length &&
    filteredSelectedGeoDataset.every(
      (id, index) => id === selectedGeoDataset[index]
    )
  ) {
    return null;
  }

  return filteredSelectedGeoDataset;
};

/** utility function to get intersection of two datasetID arrays */
export const getDatasetIDIntersection = (
  firsDatasetIDs: IDatasetID[],
  secondDatasetIDs: IDatasetID[]
): IDatasetID[] => {
  return _.intersection(firsDatasetIDs, secondDatasetIDs);
};

/** utility function to extract date data to create and set the timeData slice */
export const extractAndTransformTimeData = (
  data: IDataset[]
): ITransformedTimeData[] => {
  return (
    _.chain(data)
      .filter((item) => {
        if (!_.isNull(item.temporal_coverage)) {
          return (
            item.temporal_coverage?.start_date !== null &&
            item.temporal_coverage?.end_date !== null
          );
        }
        return true;
      })
      .map((item) => {
        let start = item.temporal_coverage?.start_date as any;
        let end = item.temporal_coverage?.end_date as any;

        // Check if start and end are the same day
        const startDate = new Date(start);
        const endDate = new Date(end);

        if (
          startDate.getFullYear() === endDate.getFullYear() &&
          startDate.getMonth() === endDate.getMonth() &&
          startDate.getDate() === endDate.getDate()
        ) {
          // Add an additional day to the end date
          endDate.setDate(endDate.getDate() + 1);
          end = endDate.toISOString();
        }

        return {
          start,
          end,
          dataset_title: item.dataset_title,
        };
      })
      // .orderBy(['start'], ['asc']) // Use 'start' directly for sorting as they are valid date strings
      .value()
  );
};

/** utility function to create interval timedata from startDate, endDate and timeData */
export const intervalTreeFromTimedata = (
  startDate: Date,
  endDate: Date,
  timeData: ITransformedTimeData[]
): ITimeData[] => {
  const numericIntervals = timeData.map((interval) => {
    return [
      new Date(interval.start).getTime(),
      new Date(interval.end).getTime(),
    ];
  });

  //@ts-ignore
  const tree = createIntervalTree(numericIntervals);
  const intersectionCounts = [];
  for (
    let currentDay = new Date(startDate);
    currentDay <= endDate;
    currentDay.setDate(currentDay.getDate() + 1)
  ) {
    let queryResult = 0;
    //@ts-ignore
    tree.queryPoint(currentDay.getTime(), () => {
      queryResult++;
    });
    intersectionCounts.push(queryResult);
  }
  const result = [];
  for (let i = 0; i < intersectionCounts.length; i++) {
    let currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    // let dateString = currentDate.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
    let dateString = currentDate.getTime();
    result.push({
      date: dateString,
      value: intersectionCounts[i],
    });
  }

  return result;
};

/**Utility function to get the IDatasetID from IDataset */
export const getDatasetID = (dataset: IDataset[]): IDatasetID[] => {
  return dataset.map((item) => item.id);
};

/**Utility function to process author data fopr node link diagram */
export const processAuthorData = (data: AuthorData[]): ChordData[] => {
  // Create an object to store the unique datasetss contributed by each pair of authors
  let datasetsCounts: { [key: string]: Set<string> } = {};

  // Iterate through the data to count the unique datasetss contributed by each pair of authors
  data.forEach((entry) => {
    const { author, datasets } = entry;

    // Iterate through the datasetss of the current author
    datasets.forEach((datasetsTitle) => {
      // Initialize an empty Set to store unique authors who contributed to this datasets
      let authorsContributed = new Set<string>();

      // Find authors who contributed to the current datasets
      data.forEach((otherEntry) => {
        if (otherEntry.datasets.includes(datasetsTitle)) {
          authorsContributed.add(otherEntry.author);
        }
      });

      // Exclude the current author from the set
      authorsContributed.delete(author);

      // Iterate through the other authors
      authorsContributed.forEach((otherAuthor) => {
        const key =
          author < otherAuthor
            ? `${author}-${otherAuthor}`
            : `${otherAuthor}-${author}`;
        // Initialize an empty Set to store unique datasetss contributed by the pair of authors
        datasetsCounts[key] = datasetsCounts[key] || new Set<string>();
        // Add the current datasets to the Set
        datasetsCounts[key].add(datasetsTitle);
      });
    });
  });

  // Convert unique datasets counts into the format required by amCharts
  let formattedData: ChordData[] = [];
  for (const [key, value] of Object.entries(datasetsCounts)) {
    const [author1, author2] = key.split("-");
    formattedData.push({ from: author1, to: author2, value: value.size });
  }

  return formattedData;
};

/** Utility function to convert Date from javascript Date string to 'dd-mm-yyyy' */
export const convertToDateString = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

/** Utility function to calculate first and second row height for the chart display. Minimum height first row and second row can have is 500px and 400px respectively  */
export const calculateRowHeights = (
  viewportHeight: number,
  navbarHeight: number
): { firstRowHeight: string; secondRowHeight: string } => {
  const minHeightFirstRow = 500;
  const minHeightSecondRow = 400;

  // Calculate the remaining height after subtracting the navbar and additional 100px
  const remainingHeight = viewportHeight - navbarHeight - 100;

  // Calculate the ideal heights based on the 5:4 ratio
  let firstRowHeight = (remainingHeight * 5) / 9;
  let secondRowHeight = (remainingHeight * 4) / 9;

  // Ensure that the heights meet the minimum requirements
  if (firstRowHeight < minHeightFirstRow) {
    firstRowHeight = minHeightFirstRow;
    secondRowHeight = remainingHeight - minHeightFirstRow + minHeightSecondRow;
  } else if (secondRowHeight < minHeightSecondRow) {
    secondRowHeight = minHeightSecondRow;
    firstRowHeight = remainingHeight - minHeightSecondRow + minHeightFirstRow;
  }

  return {
    firstRowHeight: `${firstRowHeight}px`,
    secondRowHeight: `${secondRowHeight}px`,
  };
};
