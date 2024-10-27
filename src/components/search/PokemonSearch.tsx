import React from "react";
import { TextField, Box } from "@mui/material";
import styles from "./PokemonSearch.module.css";
import { useAppDispatch } from "../../hooks";
import { setSearchTerm } from "../../store/features/pokemon/pokemonSlice";

const PokemonSearch: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <Box mb={2} className={styles.pokemon__search}>
      <TextField
        variant="outlined"
        fullWidth
        onChange={handleSearchChange}
        placeholder="Buscar pokemon..."
      />
    </Box>
  );
};

export default PokemonSearch;
