export interface Pokemon {
  id: number;
  name: string;
  img: string;
  height: number;
  weight: number;

  stats: { name: string; value: number }[];
}
