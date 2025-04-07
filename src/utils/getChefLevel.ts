export const getChefLevel = (completedRecipes: number) => {
  const maxLevel = 25;
  const totalRecipes = 25;

  const level = Math.min(Math.floor((completedRecipes / totalRecipes) * maxLevel), maxLevel);

  const levels = [
    "🍳 Novato",
    "🥣 Aprendiz",
    "🔪 Iniciante",
    "🍲 Entusiasta",
    "🥘 Estudante de Chef",
    "🍝 Cozinheiro Júnior",
    "🥗 Praticante",
    "🧂 Cozinheiro Intermediário",
    "🍛 Culinário Curioso",
    "🍤 Explorador de Sabores",
    "🥩 Habilidoso",
    "🍜 Chef Amador",
    "🍱 Cozinheiro Expert",
    "🍖 Mestre da Grelha",
    "🧁 Docente de Delícias",
    "🍰 Chef Confeiteiro",
    "🍣 Mestre Sushi",
    "🍕 Pizza Pro",
    "🌮 Chef Internacional",
    "🍷 Chef Refinado",
    "🥇 Mestre Culinário",
    "🎖️ Chef Estrela",
    "🏆 Chef Supremo",
    "👑 Rei da Cozinha",
    "🔥 Lenda da Culinária",
    "💫 Chef Imortal"
  ];

  return {
    level,
    label: levels[level],
    progress: Math.min((completedRecipes / totalRecipes) * 100, 100),
  };
};
