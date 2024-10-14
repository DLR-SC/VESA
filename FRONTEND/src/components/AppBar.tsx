import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Fab,
  IconButton, Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import Box from "@mui/material/Box";
import { useDatafill } from "../hooks/useDatafill";
import { resetDatasetSlice } from "../store/dataset/datasetSlice";
import { useAppDispatch } from "../store/hooks";
import { resetSelectedKeyword } from "../store/selectedKeyword/selectedKeywordSlice";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";
import PopoverComponent from "./PopoverComponent";

export const appBarHeight = 56; //appBar height constant declaration

function AppBar(): JSX.Element {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showPopover, setShowPopover] = useState<boolean>(false);

  const { initialSetterBundle } = useDatafill();

  const handleReset = () => {
    dispatch(resetSelectedKeyword());
    dispatch(resetDatasetSlice());
    initialSetterBundle();
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setShowPopover(true);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setShowPopover(false);
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
      <Typography variant="h1">
        <b>Visualisation Enabled Search Application</b>
      </Typography>
      <IconButton
        aria-label="top-bar-info-button"
        color="primary"
        sx={{ textDecoration: "overline" }}
        onClick={handlePopoverOpen}
        data-testid="info-button"
      >
        <InfoOutlinedIcon sx={{ fontSize: "1.6rem" }} />
      </IconButton>
      {showPopover && (
        <PopoverComponent
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          open={showPopover}
        >
          Popover content
        </PopoverComponent>
      )}
    </Box>
  );
}

export default AppBar;
