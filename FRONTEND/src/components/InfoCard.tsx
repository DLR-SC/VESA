import React from "react";
import {
  Box,
  Card,
  CardContent, Divider,
  Typography,
  useTheme
} from "@mui/material";

interface InfoCardProps {
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h1" component="div" gutterBottom align="left">
          {title}
        </Typography>
        <Divider />
        <Box paddingY={theme.spacing(2)}>
          <Typography variant="body2" align="left">
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
