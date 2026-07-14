import placeholderWaffle from '../assets/placeholder-waffle.svg';
import placeholderPancake from '../assets/placeholder-pancake.svg';
import placeholderCrepe from '../assets/placeholder-crepe.svg';
import placeholderDrink from '../assets/placeholder-drink.svg';

const PLACEHOLDERS_BY_CATEGORY = {
  waffles: placeholderWaffle,
  pancakes: placeholderPancake,
  crepes: placeholderCrepe,
  'cold-drinks': placeholderDrink,
};

export function getPlaceholderImage(category) {
  return PLACEHOLDERS_BY_CATEGORY[category] || placeholderWaffle;
}