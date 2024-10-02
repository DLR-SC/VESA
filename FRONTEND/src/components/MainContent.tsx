import { Box, useTheme } from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  useGetInitialDatasetsQuery,
  useGetInitialKeywordDataQuery,
} from "../store/services/dataApi";
import ChartsContainer from "../containers/ChartsContainer";
import ErrorDialog from "./ErrorDialog";

function MainContent(): JSX.Element {
  const { error: datasetError } = useGetInitialDatasetsQuery();
  const { error: keywordDatasetError } = useGetInitialKeywordDataQuery();

  const theme = useTheme();

  // Transition styles
  const styles = {
    transitionStyles: {
      transition: theme.transitions.create("all", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  };

  if (datasetError || keywordDatasetError) {
    return (
      <ErrorDialog
        errorObj={(datasetError || keywordDatasetError) as FetchBaseQueryError}
      />
    );
  }

  return (
    <Box flex={1}>
          <ChartsContainer />
    </Box>
  );
}

export default MainContent;
