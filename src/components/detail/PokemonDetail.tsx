// PokemonDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import { PokemonService } from "../../api/pokemonService";

import styles from "./PokemonDetail.module.css";
import {
  addPokemon,
  deletePokemon,
  selectPokemonReadyForBattle,
} from "../../store/features/pokemon/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
// Pokemon.ts
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
  height: number; // En decímetros
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: {
    front_default: string; // URL de la imagen
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
      dispatch(addPokemon(pokemon));
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
        const pokemonService = new PokemonService();

        const response = await pokemonService.getPokemonById(id);

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
  }, [id]);

  return (
    <Box>
      {loading && <Box>Cargando...</Box>}

      {isPokemonReadyToBattle ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeletePokemon}
        >
          Remover de la Batalla
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleAddPokemon}>
          Agregar a la Batalla
        </Button>
      )}
      {pokemon && (
        <Box className={styles.pokemon__detail}>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <Typography variant="h4">{pokemon.name}</Typography>
          <Typography variant="body1">Número: {pokemon.id}</Typography>
          <Typography variant="body1">
            Altura: {pokemon.height} dm
          </Typography>{" "}
          {/* Convertir a metros */}
          <Typography variant="body1">
            Tipo: {pokemon.types.map((type) => type.type.name).join(", ")}
          </Typography>
          <Typography variant="body1">Estadísticas base:</Typography>
          {pokemon.stats.map((stat) => (
            <Typography key={stat.stat.name} variant="body1">
              {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}
              : {stat.base_stat}
            </Typography>
          ))}
        </Box>
      )}

      {}
      {error && <Box>Ha ocurrido un error</Box>}
    </Box>
  );
};

export default PokemonDetail;
