import { useState } from "react";
import { PokemonObj } from "../types";

interface PokemonCardProps {
  pokemonObj: PokemonObj;
  toggleOverlayCallback: (setOverlay: boolean) => void;
}

function PokemonCard({ pokemonObj, toggleOverlayCallback }: PokemonCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  function onCardClick() {
    toggleOverlayCallback(!isExpanded);
    setIsExpanded(!isExpanded);
  }

  const pokemonName = pokemonObj.name;
  const pokemonImg = pokemonObj.sprites.front_default;

  return (
    <div
      onClick={onCardClick}
      className={
        "rounded bg-red-500 " +
        (isExpanded ? "absolute w-8/12 h-4/6" : "h-fit w-52 p-3")
      }
    >
      <img
        src={pokemonImg}
        alt="Pokemon img"
        className={
          "w-full bg-white rounded-full " + (isExpanded ? "hidden" : "")
        }
      />
      <span className={"block w-fit mx-auto text-xl mt-2"}>{pokemonName}</span>
    </div>
  );
}

export default PokemonCard;
