import React, { useState } from "react";
import { Paper, useTheme, Button } from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

interface ChartsPaperProps {
  children: React.ReactNode;
}

const Chartspaper: React.FC<ChartsPaperProps> = ({ children }) => {
  const theme = useTheme();
  const [flipped, setFlipped] = useState(true);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <Paper
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        flex: "1",
        width: "100%",
        perspective: "1000px",
        overflow: "hidden",
      }}
    >
      <Button
        onClick={handleFlip}
        variant="contained"
        sx={{
          position: "absolute",
          top: theme.spacing(0),
          right: theme.spacing(0),
          borderRadius: "0 4px 0 4px",
          padding: "0.1rem",
          minWidth: "1rem",
          zIndex: 2,
        }}
      >
        {flipped ? (
          <CloseIcon sx={{ fontSize: "1.2rem" }} />
        ) : (
          <InfoOutlined sx={{ fontSize: "0.8rem" }} />
        )}
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          transformStyle: "preserve-3d",
          transition: "transform 0.3s",
          transform: flipped ? "rotateY(180deg)" : "none",
        }}
      >
        {/* Front Side */}
        <div
          style={{
            backfaceVisibility: "hidden",
            width: "100%",
            height: "100%",
            display: flipped ? "none" : "flex",
            flexDirection: "column",
            flex: 1,
            padding: theme.spacing(2),
          }}
        >
          {children}
        </div>
        {/* Back Side */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            width: "100%",
            height: "100%",
            display: flipped ? "flex" : "none",
            flexDirection: "column",
            flex: 1,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.paper,
          }}
        >
          <div
            style={{
              height: "100%",
            }}
          >
            Card info
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default Chartspaper;
