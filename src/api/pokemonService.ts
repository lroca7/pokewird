import http from "../http";

export class PokemonService {
  baseUrl: string;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_BASE_POKE_API}`;
  }

  getPokemons(limit: number = 151) {
    const url = `${this.baseUrl}/pokemon?limit=${limit}`;

    return http.get(url);
  }

  getPokemonById(id: number) {
    const url = `${this.baseUrl}/pokemon/${id}`;

    return http.get(url);
  }

  searchPokemon(name: string) {
    const url = `${this.baseUrl}/pokemon/${name}`;

    return http.get(url);
  }
}
