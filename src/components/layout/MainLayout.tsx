// MainLayout.tsx
import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import PokemonBattle from "../battle/PokemonBattle";
import styles from "./MainLayout.module.css";

const MainLayout: React.FC = () => {
  return (
    <Box className={styles.main__layaout}>
      <Box className={styles.wrapper__main}>
        <Outlet />
      </Box>

      <Box className={styles.wrapper__battle}>
        <PokemonBattle />
      </Box>
    </Box>
  );
};

export default MainLayout;
