import React from "react";
import { Alert, Box, Snackbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import PokemonBattle from "../battle/PokemonBattle";
import styles from "./MainLayout.module.css";
import Header from "../header/Header";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  closeSnackbarBattle,
  selectIsFullForBattle,
} from "../../store/features/pokemon/pokemonSlice";

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const snackbarOpen = useAppSelector(selectIsFullForBattle);

  const handleCloseSnackbar = () => {
    dispatch(closeSnackbarBattle());
  };

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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="warning">
          Ya tienes 6 Pokemon en tu lista de batalla.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MainLayout;
