import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { IContainerProps } from "types/appData";

/** A centered card component to be used in areas where a centered loader or error display is required  */

interface CenteredCardPropTypes extends IContainerProps {
  children: React.ReactNode;
}

function CenteredCard({
  children,
}: CenteredCardPropTypes): JSX.Element {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  );
}

export default CenteredCard;
