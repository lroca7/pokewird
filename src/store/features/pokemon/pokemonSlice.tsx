import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
}

const initialState: PokemonState = {
  list: [],
  status: "idle",
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
  reducers: {},
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

export const selectPokemonList = (state: RootState) => state.pokemon.list;
export default pokemonSlice.reducer;
