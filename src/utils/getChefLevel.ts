export const getChefLevel = (completedRecipes: number): string => {
  const levels = [
    { min: 0, max: 4, name: "Aprendiz de Cozinha" },
    { min: 5, max: 9, name: "Cozinheiro Iniciante" },
    { min: 10, max: 19, name: "Aspirante a Chef" },
    { min: 20, max: 34, name: "Cozinheiro Habilidoso" },
    { min: 35, max: 49, name: "Chef Caseiro" },
    { min: 50, max: 74, name: "Chef de Restaurante" },
    { min: 75, max: 99, name: "Chef Gourmet" },
    { min: 100, max: 149, name: "Mestre Culinário" },
    { min: 150, max: 199, name: "Chef Estrela Michelin" },
    { min: 200, max: Infinity, name: "Lendário Chef Supremo" },
  ];

  return levels.find(level => completedRecipes >= level.min && completedRecipes <= level.max)?.name || "Desconhecido";
};
