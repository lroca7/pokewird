import React from "react";
import { Alert, Box, Snackbar, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import PokemonBattle from "../battle/PokemonBattle";
import styles from "./MainLayout.module.css";
import Header from "../header/Header";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  closeSnackbarBattle,
  selectIsFullForBattle,
  selectPokemonReadyForBattle,
} from "../../store/features/pokemon/pokemonSlice";

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const readyForBattle = useAppSelector(selectPokemonReadyForBattle);
  const snackbarOpen = useAppSelector(selectIsFullForBattle);
  const isMobile = useMediaQuery("(max-width: 768px)"); // Detecta si es móvil

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

        {!isMobile ? (
          <Box className={styles.wrapper__battle}>
            <PokemonBattle />
          </Box>
        ) : (
          <>
            {readyForBattle.length > 0 && (
              <Box className={styles.wrapper__battle}>
                <PokemonBattle />
              </Box>
            )}
          </>
        )}
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
