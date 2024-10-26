import React from "react";
import style from "./PokemonCard.module.css";
import { Box, IconButton, Typography } from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../hooks";
import {
  addPokemon,
  deletePokemon,
} from "../../store/features/pokemon/pokemonSlice";
import { useNavigate } from "react-router-dom";

interface PokemonCardProps {
  pokemon: {
    id: number;
    name: string;
    image: string;
  };
  showDelete?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, showDelete }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddPokemon = () => {
    dispatch(addPokemon(pokemon));
  };

  const handleDeletePokemon = () => {
    dispatch(deletePokemon(pokemon.id));
  };

  const handleDetailPokemon = () => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <Box className={style.pokemon_card}>
      {showDelete ? (
        <IconButton
          aria-label="delete"
          className={style.card_button}
          onClick={handleDeletePokemon}
        >
          <DeleteIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="add"
          className={style.card_button}
          onClick={handleAddPokemon}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      )}
      <Box onClick={handleDetailPokemon}>
        <img src={pokemon.image} alt={pokemon.name} />
        <Typography variant="body1">{pokemon.name}</Typography>
      </Box>
    </Box>
  );
};

export default PokemonCard;
