import { IconButton, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState } from "react";
import PopoverComponent from "../PopoverComponent";

const HelpButton = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [showPopover, setShowPopover] = useState(false);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setShowPopover(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setShowPopover(false);
  };

  return (
    <>
      <Tooltip title="Info">
        <IconButton
          aria-label="info-button"
          color="primary"
          onClick={handlePopoverOpen}
        >
          <HelpOutlineIcon sx={{ fontSize: "1.6rem" }} />
        </IconButton>
      </Tooltip>

      {showPopover && (
        <PopoverComponent
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          open={showPopover}
        >
          Popover content
        </PopoverComponent>
      )}
    </>
  );
};

export default HelpButton;
