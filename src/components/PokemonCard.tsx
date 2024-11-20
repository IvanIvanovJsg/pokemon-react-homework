import { useState } from "react";
import { Pokemon } from "../types";

interface PokemonCardProps {
  pokemon: Pokemon;
  toggleOverlayCallback: (setOverlay: boolean) => void;
}

function PokemonCard({ pokemon, toggleOverlayCallback }: PokemonCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  function onCardClick() {
    toggleOverlayCallback(!isExpanded);
    setIsExpanded(!isExpanded);
  }

  const pokemonName = pokemon.name;
  const pokemonImg = pokemon.img;
  const pokemonWeight = (pokemon.weight / 10).toFixed(1);
  const pokemonHeight = (pokemon.height / 10).toFixed(1);

  return (
    <div
      onClick={onCardClick}
      className={"pokemonCard " + (isExpanded && "expanded")}
    >
      <img src={pokemonImg} alt="Pokemon img" className="pokemonCardImg" />
      <span className="pokemonCardTitle">{pokemonName}</span>
      <div className="pokemonCardContent">
        <div>Id: {pokemon.id}</div>
        <div>Height: {pokemonHeight} m</div>
        <div>Weight: {pokemonWeight} kg</div>

        <div className="mt-8">Base stats:</div>
        {Array.from({ length: pokemon.stats.length }).map((_, i) => (
          <div className="ml-8">
            {pokemon.stats[i].name}: {pokemon.stats[i].value}{" "}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
