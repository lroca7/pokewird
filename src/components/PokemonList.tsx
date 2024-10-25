import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchPokemons,
  selectPokemonList,
} from "../store/features/pokemon/pokemonSlice";

const PokemonList: React.FC = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(selectPokemonList);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <div>{pokemon.name}</div>
      ))}
    </div>
  );
};

export default PokemonList;
