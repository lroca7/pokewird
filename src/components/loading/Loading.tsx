import React from "react";
import { Backdrop, Box } from "@mui/material";
import pokeball from "../../assets/pokeball.png"; // Asegúrate de que la ruta sea correcta

const Loading: React.FC = () => {
  return (
    <Backdrop
      open={true}
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <img src={pokeball} alt="Cargando..." />
      </Box>
    </Backdrop>
  );
};

export default Loading;
