import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, IconButton, Typography } from "@mui/material";
import { PokemonService } from "../../api/pokemonService";

import styles from "./PokemonDetail.module.css";
import {
  addPokemon,
  deletePokemon,
  selectPokemonReadyForBattle,
} from "../../store/features/pokemon/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Loading from "../loading/Loading";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { statTranslations, typeColors, typeColorsGradients } from "../../utils";

export interface PokemonStat {
  base_stat: number;
  effort: number; // Si deseas almacenar la "eficiencia" de la estadística
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

const PokemonDetail: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>(); // Obtén el ID del Pokémon de la URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const readyToBattle = useAppSelector(selectPokemonReadyForBattle);
  const isPokemonReadyToBattle = readyToBattle.some(
    (p) => p.id === pokemon?.id
  );

  const handleAddPokemon = () => {
    if (pokemon) {
      const minPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.front_default,
      };
      dispatch(addPokemon(minPokemon));
    }
  };

  const handleDeletePokemon = () => {
    if (pokemon) {
      dispatch(deletePokemon(pokemon.id));
    }
  };

  useEffect(() => {
    const getPokemonDetail = async () => {
      try {
        setLoading(true);
        const pokemonService = new PokemonService();
        const pokemonId = Number(id);
        const response = await pokemonService.getPokemonById(pokemonId);

        if (response.status === 200) {
          setPokemon(response.data);
        } else {
          return {};
        }
      } catch (error) {
        console.error("Error: ", error);
        setError("Error al cargar el Pokémon");
      } finally {
        setLoading(false);
      }
    };

    getPokemonDetail();

    window.scrollTo(0, 0);
  }, [id]);

  // Verificar si 'pokemon' es null
  if (!pokemon) {
    return (
      <Box className={styles.pokemon__detail}>
        <Typography variant="h6">No hay pokemon seleccionado</Typography>
      </Box>
    );
  }

  const cardColor =
    typeColorsGradients[
      pokemon.types[0].type.name as keyof typeof typeColorsGradients
    ] || "#FFFFFF";

  return (
    <>
      {loading && <Loading />}

      {pokemon && (
        <Box
          className={styles.pokemon__detail}
          // sx={{ backgroundColor: cardColor }}
          sx={{
            background: cardColor || "#FFFFFF", // Usar el degradado
          }}
        >
          {isPokemonReadyToBattle ? (
            <IconButton
              aria-label="delete"
              className={styles.card_button}
              onClick={handleDeletePokemon}
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="add"
              className={styles.card_button}
              onClick={handleAddPokemon}
              title="Agregar a la batalla"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          )}
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
          />
          <Typography variant="h4" className={styles.capitalize}>
            {pokemon.name}
          </Typography>
          <Typography variant="h5" className={styles.pokemon__number}>
            # {pokemon.id}
          </Typography>

          <Box className={styles.pokemon__types}>
            {pokemon.types.map((type) => (
              <Box
                key={type.type.name}
                className={styles.type__chip}
                sx={{
                  backgroundColor: typeColors[type.type.name] || "#FFFFFF",
                }}
              >
                <Typography variant="body1">{type.type.name}</Typography>
              </Box>
            ))}
          </Box>

          <Box className={styles.pokemon__size}>
            <Box className={styles.size}>
              <Typography variant="body1">Altura</Typography>
              <Typography variant="body1">{pokemon.height}</Typography>
            </Box>

            <Box className={styles.size}>
              <Typography variant="body1">Peso</Typography>
              <Typography variant="body1">{pokemon.weight}</Typography>
            </Box>
          </Box>

          <Box className={styles.pokemon__stats}>
            <Typography variant="h6">Estadísticas base</Typography>

            {pokemon.stats.map((stat) => (
              <Box key={stat.stat.name}>
                <Typography variant="subtitle1">
                  {statTranslations[stat.stat.name] || stat.stat.name}:
                </Typography>
                <Typography variant="body1">{stat.base_stat}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {error && <Box>Ha ocurrido un error</Box>}
    </>
  );
};

export default PokemonDetail;
