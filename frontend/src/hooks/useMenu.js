import { useFetch } from './useFetch';

export function useMenu() {
  return useFetch('/menu');
}