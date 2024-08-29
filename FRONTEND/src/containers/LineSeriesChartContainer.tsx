import { CircularProgress } from "@mui/material";
import CenteredCard from "components/CenteredCard";
import { useDatafill } from "hooks/useDatafill";
import _ from "lodash";
import { IContainerProps, TemporalCoverage } from "types/appData";
import LineSeriesChart from "../chartHooks/LineSeriesChart";
import EmptyDatasetCard from "../components/EmptyDatasetCard";
import { useAppSelector } from "../store/hooks";
import { useGetInitialDatasetsQuery } from "../store/services/dataApi";
import { convertToDateString } from "store/dataset/utility/utility";

function LineSeriesChartContainer(props: IContainerProps): JSX.Element {
  const containerHeight = "400px";
  const { isFetching } = useGetInitialDatasetsQuery();
  const timeData = useAppSelector((state) => state.dataset.timeData);

  const { initialDateRanges, fetchAndSetAgainstTimeData } = useDatafill();

  const debouncedHandleScroll = _.debounce((range: TemporalCoverage) => {
    fetchAndSetAgainstTimeData(range);
  }, 500);

  const handleScroll = (range: TemporalCoverage) => {
    debouncedHandleScroll(range);
  };

  if (isFetching) {
    return (
      <CenteredCard>
        <CircularProgress size={60} />
      </CenteredCard>
    );
  }

  return timeData.length ? (
    <>
      <LineSeriesChart
        data={timeData}
        handleScroll={handleScroll}
        initialDate={{
          start_date: convertToDateString(initialDateRanges.startDate),
          end_date: convertToDateString(initialDateRanges.endDate),
        }}
      />
    </>
  ) : (
    <EmptyDatasetCard />
  );
}

export default LineSeriesChartContainer;
