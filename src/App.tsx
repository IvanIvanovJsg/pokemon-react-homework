import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [pokemonImg, setPokemonImg] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/1");
      const pokemonObj = await res.json();
      // let pokemonImg = pokemonObj;
      console.log(pokemonObj.sprites["front_default"]);
      setPokemonImg(pokemonObj.sprites["front_default"]);
    }
    fetchData();
  }, []);

  if (pokemonImg === null) {
    return <h1>No pokemon img</h1>;
  }
  console.log(pokemonImg);
  return <img src={pokemonImg} alt="Pokemon img" />;
}

export default App;
