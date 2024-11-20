import PokemonCard from "./PokemonCard";
import { Pokemon } from "../types";
import React, { useEffect, useState } from "react";

interface PokemonApiObj {
  id: number;
  name: string;
  sprites: { front_default: string };
  height: number;
  weight: number;

  stats: [{ base_stat: number; stat: { name: string } }];
}

function Body() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isOverlayOn, setIsOverlayOn] = useState(false);

  useEffect(() => {
    async function loadPokemon() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/1");
      const pokemonObjRes: PokemonApiObj = await res.json();

      let obj: Pokemon = {
        id: pokemonObjRes.id,
        name: pokemonObjRes.name,
        img: pokemonObjRes.sprites.front_default,
        height: pokemonObjRes.height,
        weight: pokemonObjRes.weight,

        stats: pokemonObjRes.stats.map((s) => {
          return {
            name: s.stat.name,
            value: s.base_stat,
          };
        }),
      };

      setPokemon(obj);
    }
    loadPokemon();
  }, []);

  const toggleOverlayCallback: (arg: boolean) => void = (setOverlay) => {
    setIsOverlayOn(setOverlay);
  };

  if (pokemon === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div
        className={
          "fixed inset-0 bg-black transition-opacity duration-1000 " +
          (isOverlayOn
            ? "opacity-80 pointer-events-auto"
            : "opacity-0 pointer-events-none")
        }
      ></div>
      <div className="h-fit w-full bg-amber-200 p-10 grid justify-items-center gap-y-10 xl:grid-cols-5 md:grid-cols-3 ">
        {Array.from({ length: 15 }).map((_, i) => (
          <PokemonCard
            pokemon={pokemon}
            toggleOverlayCallback={toggleOverlayCallback}
          />
        ))}
      </div>
    </>
  );
}

export default Body;
