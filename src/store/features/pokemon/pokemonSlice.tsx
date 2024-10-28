import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { PokemonService } from "../../../api/pokemonService";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface PokemonState {
  list: Pokemon[];
  status: "idle" | "loading" | "failed" | "sucess";
  readyForBattle: Pokemon[];
  searchTerm: string;
}

const initialState: PokemonState = {
  list: [],
  status: "idle",
  readyForBattle: [],
  searchTerm: "",
};

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    try {
      const pokemonService = new PokemonService();
      const response = await pokemonService.getPokemons(151);
      if (response.status === 200) {
        const pokemons = response.data.results;

        const pokemonsWithImage = pokemons.map(
          (pokemon: Pokemon, index: number) => ({
            id: index + 1,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          })
        );

        return pokemonsWithImage;
      } else {
        return {};
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<Pokemon>) => {
      if (state.readyForBattle.length < 6) {
        // Verificar existencia
        const pokemonExist = state.readyForBattle.some(
          (pokemon) => pokemon.id === action.payload.id
        );
        if (!pokemonExist) {
          state.readyForBattle.push(action.payload);
        }
      }
    },
    deletePokemon: (state, action: PayloadAction<number>) => {
      state.readyForBattle = state.readyForBattle.filter(
        (pokemon) => pokemon.id !== action.payload
      );
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addPokemonToList(state, action: PayloadAction<Pokemon>) {
      const newPokemon = action.payload;

      const exists = state.list.some((pokemon) => pokemon.id === newPokemon.id);
      if (!exists) {
        state.list.push(newPokemon);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = "sucess";
        state.list = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addPokemon, deletePokemon, setSearchTerm, addPokemonToList } =
  pokemonSlice.actions;

export const selectPokemonList = (state: RootState) => state.pokemon.list;
export const selectPokemonReadyForBattle = (state: RootState) =>
  state.pokemon.readyForBattle;

export const selectFilteredPokemonList = (state: RootState) => {
  const { list, searchTerm } = state.pokemon;
  if (!searchTerm) return list;

  return list.filter((pokemon) => {
    const isNumberSearch = !isNaN(Number(searchTerm));
    if (isNumberSearch) {
      return pokemon.id === Number(searchTerm);
    } else {
      return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });
};

export default pokemonSlice.reducer;
