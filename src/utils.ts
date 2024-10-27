export const typeColors: { [key: string]: string } = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  poison: "#2d0a33",
  electric: "#af9012",
  ground: "#72602d",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  flying: "#A98FF0",
  // Agrega más tipos según sea necesario
};

export const typeColorsGradients = {
  normal:
    "linear-gradient(to right, rgba(168, 168, 120, 0.7), rgba(168, 168, 120, 0.3))",
  fire: "linear-gradient(to right, rgba(255, 99, 71, 0.7), rgba(255, 99, 71, 0.3))",
  water:
    "linear-gradient(to right, rgba(70, 130, 180, 0.7), rgba(70, 130, 180, 0.3))",
  electric:
    "linear-gradient(to right, rgba(255, 215, 0, 0.7), rgba(255, 215, 0, 0.3))",
  grass:
    "linear-gradient(to right, rgba(60, 179, 113, 0.7), rgba(60, 179, 113, 0.3))",
  ice: "linear-gradient(to right, rgba(173, 216, 230, 0.7), rgba(173, 216, 230, 0.3))",
  fighting:
    "linear-gradient(to right, rgba(255, 0, 0, 0.7), rgba(255, 0, 0, 0.3))",
  poison:
    "linear-gradient(to right, rgba(128, 0, 128, 0.7), rgba(128, 0, 128, 0.3))",
  ground:
    "linear-gradient(to right, rgba(222, 184, 135, 0.7), rgba(222, 184, 135, 0.3))",
  flying:
    "linear-gradient(to right, rgba(135, 206, 250, 0.7), rgba(135, 206, 250, 0.3))",
  psychic:
    "linear-gradient(to right, rgba(255, 182, 193, 0.7), rgba(255, 182, 193, 0.3))",
  bug: "linear-gradient(to right, rgba(0, 255, 0, 0.7), rgba(0, 255, 0, 0.3))",
  rock: "linear-gradient(to right, rgba(139, 137, 78, 0.7), rgba(139, 137, 78, 0.3))",
  ghost:
    "linear-gradient(to right, rgba(128, 0, 128, 0.7), rgba(128, 0, 128, 0.3))",
  dragon:
    "linear-gradient(to right, rgba(0, 0, 255, 0.7), rgba(0, 0, 255, 0.3))",
  dark: "linear-gradient(to right, rgba(105, 105, 105, 0.7), rgba(105, 105, 105, 0.3))",
  fairy:
    "linear-gradient(to right, rgba(255, 182, 193, 0.7), rgba(255, 182, 193, 0.3))",
  steel:
    "linear-gradient(to right, rgba(192, 192, 192, 0.7), rgba(192, 192, 192, 0.3))",
};

export const statTranslations: Record<string, string> = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque Especial",
  "special-defense": "Defensa Especial",
  speed: "Velocidad",
};
