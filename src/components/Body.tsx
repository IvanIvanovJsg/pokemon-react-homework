import PokemonCard from "./PokemonCard";
import { PokemonObj } from "../types";
import React, { useEffect, useState } from "react";

function Body() {
  const [pokemonObj, setPokemonObj] = useState<PokemonObj | null>(null);

  useEffect(() => {
    async function loadPokemon() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/1");
      const pokemonObjRes = await res.json();
      setPokemonObj(pokemonObjRes);
    }
    loadPokemon();
  }, []);

  if (pokemonObj === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-fit w-full bg-amber-200 p-10 grid justify-items-center gap-y-10 xl:grid-cols-5 md:grid-cols-3 ">
      {Array.from({ length: 15 }).map((_, i) => (
        <PokemonCard pokemonObj={pokemonObj} />
      ))}
    </div>
  );
}

export default Body;
