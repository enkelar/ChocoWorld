import { useFetch } from './useFetch';
import { fetchCategories } from '../lib/categories';

export function useCategories() {
  return useFetch('/categories', fetchCategories);
}