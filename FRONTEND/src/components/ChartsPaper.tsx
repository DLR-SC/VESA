import React, { useState } from "react";
import { Paper, useTheme, Button, Theme } from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import InfoCard from "./InfoCard";

/** A Mui Paper card component which  can be used to reveal further information of its contents by an information button toggler. 
 * The first child will be the main content and the subsequent child will be the Information content*/

// Interface for the props
interface ChartsPaperProps {
  children: [React.ReactNode, React.ReactNode];
}

// Styles helper
const useStyles = (theme: Theme) => ({
  paper: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    flex: 1,
    width: "100%",
    overflow: "hidden",
    padding: theme.spacing(2),
  },
});

// Main Chartspaper component
const Chartspaper: React.FC<ChartsPaperProps> = ({ children }) => {
  const theme = useTheme();
  const [revealed, setRevealed] = useState(false);

  const handleToggle = () => setRevealed((prev) => !prev);

  const styles = useStyles(theme);

  const [mainContent, revelaedContent] = children;

  return (
    <Paper sx={styles.paper}>
      <ToggleButton revealed={revealed} onClick={handleToggle} />
      <MainContent revealed={revealed}>{mainContent}</MainContent>
      <RevealContent revealed={revealed}>{revelaedContent}</RevealContent>
    </Paper>
  );
};

export default Chartspaper;

// Toggle Button Component
const ToggleButton: React.FC<{ revealed: boolean; onClick: () => void }> = ({
  revealed,
  onClick,
}) => {
  const theme =useTheme()
  return (
    <Button
      onClick={onClick}
      variant={"text"}
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        borderRadius: "0 4px 0 4px",
        padding: "0.1rem",
        minWidth: "1rem",
        boxShadow: 0,
        zIndex: 2,
      }}
    >
      {revealed ? <CloseIcon sx={{color: theme.palette.background.default}}/> : <InfoOutlined sx={{ fontSize: "0.8rem" }} />}
    </Button>
  );
};

// Main Content Component
const MainContent: React.FC<{
  revealed: boolean;
  children: React.ReactNode;
}> = ({ revealed, children }) => {
  return (
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
  );
};

// Reveal Content Component
const RevealContent: React.FC<{
  revealed: boolean;
  children: React.ReactNode;
}> = ({ revealed, children }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "100%",
        height: "100%",
        transformOrigin: "top right",
        transform: revealed ? "scale(1)" : "scale(0)",
        transition: "transform 0.3s",
        zIndex: 1,
      }}
    >
      {children}
    </div>
  );
};
