import { Box, useTheme } from "@mui/material";

interface EmptyDatasetCardProps {
  message?: string;
}

const EmptyDatasetCard: React.FC<EmptyDatasetCardProps> = ({
  message = "No data to display!",
}) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      color={theme.palette.text.disabled}
    >
      {message}
    </Box>
  );
};

export default EmptyDatasetCard;
