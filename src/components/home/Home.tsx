import React from "react";
import PokemonList from "../pokemonList/PokemonList";
import PokemonBattle from "../battle/PokemonBattle";
import { Box } from "@mui/material";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <Box className={styles.home}>
      <Box className={styles.wrapper__list}>
        <PokemonList />
      </Box>
      <Box className={styles.wrapper__battle}>
        <PokemonBattle />
      </Box>
    </Box>
  );
};

export default Home;
