import { speciesImageUrls } from '../data/speciesImageUrls';

// Slash is not allowed in a windoes filename
export function replaceSlashWithDash(name: string): string {
  return name.replaceAll('/', '-');
}

export function getItemImageURL(itemName: string): string {
  const speciesSrc = speciesImageUrls[itemName];
  if (speciesSrc) return speciesSrc;

  const fileName = encodeURIComponent(replaceSlashWithDash(itemName));
  return `/images/searchItems/${fileName}.webp`;
}
