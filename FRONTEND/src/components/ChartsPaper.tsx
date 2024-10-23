import React, { useState } from "react";
import { Paper, useTheme, Button } from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

interface ChartsPaperProps {
  children: React.ReactNode;
}

const Chartspaper: React.FC<ChartsPaperProps> = ({ children }) => {
  const theme = useTheme();
  const [revealed, setRevealed] = useState(false);

  const handleToggle = () => {
    setRevealed((prev) => !prev);
  };

  return (
    <Paper
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        flex: 1,
        width: "100%",
        overflow: "hidden",
        padding: theme.spacing(2)
      }}
    >
      <Button
        onClick={handleToggle}
        variant={revealed ? "text" : "contained"}
        sx={{
          position: "absolute",
          top: theme.spacing(0),
          right: theme.spacing(0),
          borderRadius: "0 4px 0 4px",
          padding: "0.1rem",
          minWidth: "1rem",
          boxShadow: 0,
          zIndex: 2,
        }}
      >
        {revealed ? (
          <CloseIcon />
        ) : (
          <InfoOutlined sx={{ fontSize: "0.8rem" }} />
        )}
      </Button>
      {/* Front Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          opacity: revealed ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        {children}
      </div>
      {/* Back Content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          transformOrigin: "top right",
          transform: revealed ? "scale(1, 1)" : "scale(0, 0)",
          transition: "transform 0.3s",
          zIndex: 1,
        }}
      >
        <div>
          Card info
        </div>
      </div>
    </Paper>
  );
};

export default Chartspaper;
