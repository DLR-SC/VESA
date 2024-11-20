import { Fab, Typography, Box, useTheme } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useDatafill } from "../../hooks/useDatafill";
import { useAppDispatch } from "../../store/hooks";
import { resetDatasetSlice } from "../../store/dataset/datasetSlice";
import { resetSelectedKeyword } from "../../store/selectedKeyword/selectedKeywordSlice";
import GridSettingsButton from "./GridSettingsButton";
import HelpButton from "./HelpButton";

const AppBar = (): JSX.Element => {
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
        height: 56,
        backgroundColor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        px: 4,
        gap: theme.spacing(4),
        justifyContent: "space-between",
      }}
    >
      <Fab size="small" color="default" onClick={handleReset}>
        <RefreshIcon />
      </Fab>

      <Typography variant="h1">
        <b>Visualisation Enabled Search Application</b>
      </Typography>
      <Box>
        <GridSettingsButton />
        <HelpButton />
      </Box>
    </Box>
  );
};

export default AppBar;
