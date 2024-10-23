import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface InfoCardProps {
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description }) => {
  return (
    <Card
      sx={{
        height: '100%',          
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
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
