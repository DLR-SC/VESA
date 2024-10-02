import { CircularProgress } from "@mui/material";
import CenteredCard from "../components/CenteredCard";
import { useQuery } from "../hooks/useQuery";
import { useAppSelector } from "../store/hooks";
import { useGetInitialAuthorDataQuery } from "../store/services/dataApi";
import NodeChart from "../chartHooks/NodeChart";
import EmptyDatasetCard from "../components/EmptyDatasetCard";
import { IContainerProps } from "types/appData";

function NodeChartContainer(props: IContainerProps): JSX.Element {
  const { isFetching } = useGetInitialAuthorDataQuery();
  const { authorIsLoading } = useQuery();
  const chordData = useAppSelector((state) => state.dataset.chordData);

  if (isFetching || authorIsLoading) {
    return (
      <CenteredCard>
        <CircularProgress size={60} />
      </CenteredCard>
    );
  }

  return chordData.length ? (
    <NodeChart data={chordData}/>
  ) : (
    <EmptyDatasetCard
      message="Author information is not available for non pangea datasets."
    />
  );
}

export default NodeChartContainer;
