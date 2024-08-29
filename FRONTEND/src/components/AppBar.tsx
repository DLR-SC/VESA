import RefreshIcon from "@mui/icons-material/Refresh";
import { Fab, Tooltip, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { useDatafill } from "hooks/useDatafill";
import { resetDatasetSlice } from "store/dataset/datasetSlice";
import { useAppDispatch } from "store/hooks";
import { resetSelectedKeyword } from "store/selectedKeyword/selectedKeywordSlice";

export const appBarHeight = 56; //appBar height constant declaration

function AppBar(): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { initialSetterBundle } = useDatafill();

  const handleReset = () => {
    dispatch(resetSelectedKeyword());
    dispatch(resetDatasetSlice());
    initialSetterBundle();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: appBarHeight,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        gap: theme.spacing(4),
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h1">
        {" "}
        <b>Graph Based Visual Search Engine </b>{" "}
      </Typography>{" "}
      <Typography variant="body2" fontWeight={"600"}>
        {" "}
        Click{" "}
        <a
          href="https://forms.gle/21L8XnXBF1wJPanE8"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>{" "}
        to evaluate this application and provide your feedback{" "}
      </Typography>
      <Tooltip title="Reset all filters">
        <Fab
          size="small"
          color="default"
          aria-label="add"
          onClick={handleReset}
        >
          <RefreshIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
}

export default AppBar;
