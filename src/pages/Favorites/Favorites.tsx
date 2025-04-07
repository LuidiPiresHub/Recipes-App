import { RecipeList } from '../../components/RecipeList/RecipeList';
import { getFavoritesRecipes } from '../../utils/getLocalStorage';

export default function Favorites() {
  const favoritesRecipes = getFavoritesRecipes()

  return (
    <RecipeList
      title='Receitas Favoritas'
      recipes={favoritesRecipes}
      emptyMessage='Nenhuma receita favoritada ainda!'
    />
  )
}
