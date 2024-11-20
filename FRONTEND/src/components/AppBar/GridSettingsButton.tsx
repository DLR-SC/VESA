import { IconButton, Tooltip } from "@mui/material";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import { useState } from "react";
import GridLayoutMenu from "./GridLayoutMenu";

const GridSettingsButton = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openGridMenu, setOpenGridMenu] = useState(false);

  const handleGridLayoutMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenGridMenu(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenGridMenu(false);
  };

  return (
    <>
      <Tooltip title="Grid Layout Settings">
        <IconButton
          aria-label="grid-settings-button"
          color="primary"
          onClick={handleGridLayoutMenuClick}
        >
          <Grid3x3Icon sx={{ fontSize: "1.6rem" }} />
        </IconButton>
      </Tooltip>

      <GridLayoutMenu
        anchorEl={anchorEl}
        openMenu={openGridMenu}
        onClose={handleMenuClose}
      />
    </>
  );
};

export default GridSettingsButton;
