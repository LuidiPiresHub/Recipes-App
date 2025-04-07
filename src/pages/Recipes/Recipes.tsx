import { useEffect, useState } from 'react'
import axios from 'axios'
import { Recipe } from '../../interfaces/Recipe.interface'
import { RecipeList } from '../../components/RecipeList/RecipeList'
import Header from '../../components/Header/Header'
import Loading from '../../components/Loading/Loading'

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getRecipes = async (): Promise<void> => {
      const { data } = await axios.get<{ meals: Recipe[] }>('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      setRecipes(data.meals)
      setIsLoading(false)
    }
    getRecipes()
  }, [])

  if (isLoading) {
    return (
      <>
        <Header title='Recipes App' />
        <Loading />
      </>
    )
  }

  return (
    <RecipeList
      title='Recipes App'
      recipes={recipes}
      emptyMessage='Não Foi possivel carregar receitas'
    />
  )
}
