import React, { useEffect } from "react";
import PokemonList from "../pokemonList/PokemonList";
import { Box } from "@mui/material";
import PokemonSearch from "../search/PokemonSearch";
import { useAppDispatch } from "../../hooks";
import { setSearchTerm } from "../../store/features/pokemon/pokemonSlice";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, [dispatch]);

  return (
    <Box>
      <PokemonSearch />
      <PokemonList />
    </Box>
  );
};

export default Home;
