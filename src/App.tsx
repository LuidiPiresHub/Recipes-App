import { Routes, Route } from 'react-router-dom';
import Recipes from './pages/Recipes/Recipes';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import Profile from './pages/Profile/Profile';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import Favorites from './pages/Favorites/Favorites';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Recipes />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/done-recipes" element={<DoneRecipes />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  )
}
