import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import PokemonBattle from "../battle/PokemonBattle";
import styles from "./MainLayout.module.css";
import Header from "../header/Header";

const MainLayout: React.FC = () => {
  return (
    <Box className={styles.main__app}>
      <Header />
      <Box className={styles.main__layaout}>
        <Box className={styles.wrapper__main}>
          <Outlet />
        </Box>

        <Box className={styles.wrapper__battle}>
          <PokemonBattle />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
