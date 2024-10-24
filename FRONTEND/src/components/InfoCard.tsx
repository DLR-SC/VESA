import React from 'react';
import { Card, CardContent, Typography, useTheme } from '@mui/material';

interface InfoCardProps {
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',          
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main)
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h2"
          component="div"
          gutterBottom
          align="left"           
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          align="left"           
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
