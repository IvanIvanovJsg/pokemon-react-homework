import PokemonCard from "./PokemonCard";
import { Pokemon } from "../types";
import React, { useEffect, useRef, useState } from "react";

interface PokeApiResult {
  next: string; // the next link in pagination
  results: { url: string }[];
}
interface PokeApiPokemon {
  id: number;
  name: string;
  sprites: { front_default: string };
  height: number;
  weight: number;

  stats: [{ base_stat: number; stat: { name: string } }];
}

function Body() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loadPokemonsTrigger, setLoadPokemonsTrigger] = useState(false);
  const [isOverlayOn, setIsOverlayOn] = useState(false);
  const nextPokemonsLink = useRef<string>(
    "https://pokeapi.co/api/v2/pokemon/?limit=15&offset=0",
  );

  useEffect(() => {
    async function loadPokemon() {
      const res = await fetch(nextPokemonsLink.current);
      const pokeApiResult: PokeApiResult = await res.json();
      const pokeApiPokemonResult: { url: string }[] = pokeApiResult.results;
      nextPokemonsLink.current = pokeApiResult.next;

      const pokeApiPokemonPromises: Promise<PokeApiPokemon>[] =
        pokeApiPokemonResult.map(async (x) => {
          const url = x.url;
          const res = await fetch(url);
          const pokeApiPokemon: PokeApiPokemon = await res.json();
          return pokeApiPokemon;
        });

      const pokeApiPokemons: PokeApiPokemon[] = await Promise.all(
        pokeApiPokemonPromises,
      );
      const pokemonBuffer: Pokemon[] = pokeApiPokemons.map((pokemonObjRes) => {
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

        return obj;
      });

      setPokemons([...pokemons, ...pokemonBuffer]);
    }
    loadPokemon();
  }, [loadPokemonsTrigger]);

  const toggleOverlayCallback: (arg: boolean) => void = (setOverlay) => {
    setIsOverlayOn(setOverlay);
  };

  if (pokemons.length === 0) {
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
      <div className="bg-amber-200 pb-8">
        <div className="h-fit w-full  p-10 grid justify-items-center gap-y-10 xl:grid-cols-5 md:grid-cols-3 ">
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              toggleOverlayCallback={toggleOverlayCallback}
            />
          ))}
        </div>

        <button
          onClick={() => {
            setLoadPokemonsTrigger(!loadPokemonsTrigger);
          }}
          className="w-52 h-20 rounded-full mx-auto grid place-items-center text-2xl text-white bg-indigo-700 hover:bg-indigo-400"
        >
          Load more
        </button>
      </div>
    </>
  );
}

export default Body;
