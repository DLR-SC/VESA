import { Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import DLRLogo from "assets/dlr_logo.svg";

export const footerHeight = 40; //appBar height constant declaration

function Footer(): JSX.Element {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: footerHeight,
        backgroundColor: theme.palette.background.paper,
        paddingX: theme.spacing(4),
        gap: theme.spacing(4),
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body2">&copy;&nbsp;NFDI4Earth</Typography>
      <Box
        sx={{
          lineHeight:0
        }}
      >
        <a
          href="https://www.dlr.de/de"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img height="30" src={DLRLogo} alt="DLR Logo" />
        </a>
      </Box>
    </Box>
  );
}

export default Footer;
