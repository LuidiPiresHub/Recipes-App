import { Dispatch, SetStateAction } from 'react';
import { Recipe } from './Recipe.interface';

export interface HeaderProps {
  title: string;
  showIcons?: boolean;
  isFavorite?: boolean;
  setIsFavorite?: Dispatch<SetStateAction<boolean>>
  recipe?: Recipe;
  showProile?: boolean
}