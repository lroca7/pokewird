import React from "react";
import { useAppSelector } from "../../hooks";
import { selectPokemonReadyForBattle } from "../../store/features/pokemon/pokemonSlice";
import PokemonCard from "../pokemonCard/PokemonCard";

import styles from "./PokemonBattle.module.css";
import { Box, Typography } from "@mui/material";

const PokemonBattle: React.FC = () => {
  const pokemons = useAppSelector(selectPokemonReadyForBattle);

  return (
    <Box className={styles.pokemon_battle}>
      <Typography variant="h4" mb={2}>
        Listos para el combate
      </Typography>
      <Box className={styles.pokemon_list}>
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} showDelete={true} />
          ))
        ) : (
          <Typography variant="subtitle1" mt={5}>
            Lista vacia, no hay ningun pokemon listo
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default PokemonBattle;
