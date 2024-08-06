import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useAppSelector } from "@/lib/hooks";

type SomethingWentWrongProps = {
  message?: string;
  onRetry?: () => void;
};

const SomethingWentWrong = ({
  message = "Something went wrong.",
  onRetry,
}: SomethingWentWrongProps) => {
  const textColor = useAppSelector((state) => state.color.textColor);
  const backgroundColor = useAppSelector(
    (state) => state.color.backgroundColor
  );
  const paperColor = useAppSelector(
    (state) => state.color.paperColor
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      textAlign="center"
      p={2}
    >
      <ErrorOutlineIcon sx={{ color: textColor }} fontSize="large" />
      <Typography variant="h6" color={textColor} gutterBottom>
        {message}
      </Typography>
      {onRetry && (
        <Button
          variant="contained"
          onClick={onRetry}
          sx={{ backgroundColor: backgroundColor, color: textColor, '&:hover': {backgroundColor: paperColor} }}
        >
          Retry
        </Button>
      )}
    </Box>
  );
};

export default SomethingWentWrong;
