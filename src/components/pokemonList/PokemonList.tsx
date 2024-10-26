import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchPokemons,
  selectFilteredPokemonList,
} from "../../store/features/pokemon/pokemonSlice";
import PokemonCard from "../pokemonCard/PokemonCard";
import style from "./PokemonList.module.css";
import { Box } from "@mui/material";

const PokemonList: React.FC = () => {
  const dispatch = useAppDispatch();

  const pokemons = useAppSelector(selectFilteredPokemonList);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  return (
    <Box className={style.pokemon_list}>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </Box>
  );
};

export default PokemonList;
