import React, { useState } from "react";
import { TextField, Box, IconButton, Typography } from "@mui/material";
import styles from "./PokemonSearch.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addPokemonToList,
  setSearchTerm,
} from "../../store/features/pokemon/pokemonSlice";
import { PokemonService } from "../../api/pokemonService";
import DeleteIcon from "@mui/icons-material/Delete";

const PokemonSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const pokemonList = useAppSelector((state) => state.pokemon.list);
  const pokemonService = new PokemonService();
  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const searchTerm = useAppSelector((state) => state.pokemon.searchTerm);

  const [loading, setLoading] = useState(false);

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchTerm = event.target.value.toLowerCase(); // Convierte a minúsculas para comparación
    dispatch(setSearchTerm(searchTerm));

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(async () => {
      setLoading(true);

      const isInList = pokemonList.some((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
      );

      if (!isInList && searchTerm) {
        try {
          const response = await pokemonService.searchPokemon(searchTerm);

          const pokemon = response.data;

          const minPokemon = {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default,
          };
          dispatch(addPokemonToList(minPokemon));
        } catch (error) {
          console.error("Error al buscar el Pokemon:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  const handleClearSearch = () => {
    dispatch(setSearchTerm(""));
  };

  return (
    <>
      <Box mb={2} className={styles.pokemon__search}>
        <TextField
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar pokemon..."
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "48px",
            },
          }}
        />
        <IconButton aria-label="clear" onClick={handleClearSearch}>
          <DeleteIcon />
        </IconButton>
      </Box>

      {loading && (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">Consultando ...</Typography>
        </Box>
      )}
    </>
  );
};

export default PokemonSearch;
