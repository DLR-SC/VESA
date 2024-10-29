import {
  Box,
  CircularProgress, Typography,
  useTheme
} from "@mui/material";
import { useCallback } from "react";
import { useAppSelector } from "../store/hooks";
import {
  useGetInitialDatasetsQuery,
  useGetRelatedDatasetsMutation,
} from "../store/services/dataApi";
import { IContainerProps, IDataset, IKeywordData } from "types/appData";
import PlaceholderCard from "./CenteredCard";
import DataGrid from "./DataGrid";
import EmptyDatasetCard from "./EmptyDatasetCard";

function ResultBox(props: IContainerProps): JSX.Element {
  const selectedKeywordObject = useAppSelector(
    (state) => state.selectedKeyword.selectedKeyword as IKeywordData
  );
  const tableData = useAppSelector((state) => state.dataset.dataset);

  const { isFetching } = useGetInitialDatasetsQuery();
  const [data, { isLoading }] = useGetRelatedDatasetsMutation({
    fixedCacheKey: "shared-dataset-mutation",
  });

  const theme = useTheme();

  const errorMessageText = selectedKeywordObject?.keyword
    ? `No related keywords found for ${selectedKeywordObject?.keyword}`
    : "No related keywords found.";

  const dataTableRenderer = (data: IDataset[]) => {
    return <DataGrid data={data} />;
  };

  const renderContent = useCallback(() => {
    if (isFetching || isLoading) {
      return (
        <PlaceholderCard>
          <CircularProgress size={60} />
        </PlaceholderCard>
      );
    }

    return tableData.length ? (
      dataTableRenderer(tableData)
    ) : (
      <EmptyDatasetCard message={errorMessageText} />
    );
  }, [isFetching, isLoading, tableData]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        textAlign: "initial"
      }}
    >
      <Box padding={2} display={"flex"}>
        <Typography variant="h4">
          <span
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
            }}
          >
            Search term
          </span>
          :&nbsp;
        </Typography>
        <Typography
          fontFamily={"Montserrat, sans-serif"}
          style={{ fontWeight: 300 }}
          color={
            selectedKeywordObject?.keyword
              ? "initial"
              : theme.palette.text.disabled
          }
        >
          {selectedKeywordObject?.keyword || "Showing all data"}
        </Typography>
      </Box>
      <Box flex={1} position="relative">
        <Box
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
        >
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
}

export default ResultBox;
