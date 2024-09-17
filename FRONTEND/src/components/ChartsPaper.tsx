import React from "react";
import { Paper, useTheme } from "@mui/material";

interface ChartsPaperProps {
  children: React.ReactNode;
}

const Chartspaper: React.FC<ChartsPaperProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: theme.spacing(2),
        flex: "1",
        width: "100%",
      }}
    >
      {children}
    </Paper>
  );
};

export default Chartspaper;
