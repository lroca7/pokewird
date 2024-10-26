import React, { useEffect } from "react";
import PokemonList from "../pokemonList/PokemonList";
import { Box } from "@mui/material";
import styles from "./Home.module.css";
import PokemonSearch from "../search/PokemonSearch";
import { useAppDispatch } from "../../hooks";
import { setSearchTerm } from "../../store/features/pokemon/pokemonSlice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Limpia el término de búsqueda al montar el componente
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  return (
    <Box className={styles.home}>
      <Box>
        <PokemonSearch />
        <PokemonList />
      </Box>
    </Box>
  );
};

export default Home;
