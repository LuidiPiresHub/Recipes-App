import { RecipeList } from '../../components/RecipeList/RecipeList';
import { getDoneRecipes } from '../../utils/getLocalStorage';

export default function DoneRecipes() {
  const doneRecipes = getDoneRecipes();

  return (
    <RecipeList
      title='Receitas Concluídas'
      recipes={doneRecipes}
      emptyMessage='Nenhuma receita feita ainda!'
    />
  )
}
