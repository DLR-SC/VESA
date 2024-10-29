import { Box, Popover } from "@mui/material";
import React from "react";

interface InfoPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
function PopoverComponent(props: InfoPopoverProps): JSX.Element {
  return (
    <Popover
      aria-label="top-bar-popover"
      data-testid="popover-testid"
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{
        "& .MuiPopover-paper": {
          width: 300,
        },
      }}
    >
      <Box position="relative" p={4}>
        {props.children}
      </Box>
    </Popover>
  );
}

export default PopoverComponent;
