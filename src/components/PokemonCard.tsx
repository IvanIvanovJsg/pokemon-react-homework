import { PokemonObj } from "../types";

interface PokemonCardProps {
  pokemonObj: PokemonObj;
}

function PokemonCard({ pokemonObj }: PokemonCardProps) {
  const pokemonName = pokemonObj.name;
  const pokemonImg = pokemonObj.sprites.front_default;

  return (
    <div className="h-fit w-52 rounded bg-red-500 p-3">
      <img
        src={pokemonImg}
        alt="Pokemon img"
        className="w-full bg-white rounded-full"
      />
      <span className="block w-fit mx-auto text-xl mt-2">{pokemonName}</span>
    </div>
  );
}

export default PokemonCard;
