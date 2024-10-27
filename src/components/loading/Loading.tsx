// LoadingBackdrop.tsx
import React from "react";
import { Backdrop, CircularProgress, Typography, Box } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Backdrop
      open={true}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <CircularProgress color="inherit" />
        <Typography variant="body1" mt={2}>
          Cargando ...
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default Loading;
