import http from "../http";

export class PokemonService {
  baseUrl: string;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_BASE_POKE_API}`;
  }

  getPokemons(limit: number = 151) {
    // fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const url = `${this.baseUrl}/pokemon?limit=${limit}`;
    console.log("url: ", url);
    return http.get(url);
  }
}
