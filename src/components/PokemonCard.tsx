import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Pokemon } from "../types";

interface PokemonCardProps {
  pokemon: Pokemon;
  toggleOverlayCallback: (setOverlay: boolean) => void;
}

interface FlipAnimatableElement {
  element: Element;
  rectData: FlipAnimatableElementRectData;
}

interface FlipAnimatableElementRectData {
  collapsedRect: DOMRect | null;
  expandedRect: DOMRect | null;
}

function getDomRect(divEl: Element): DOMRect {
  return divEl.getBoundingClientRect();
}

function calculateTransfrom(
  collapsedRect: DOMRect,
  expandedRect: DOMRect,
): [number, number, number, number] {
  const deltaX =
    collapsedRect.x -
    expandedRect.x -
    (expandedRect.width - collapsedRect.width) / 2;
  const deltaY =
    collapsedRect.y -
    expandedRect.y -
    (expandedRect.height - collapsedRect.height) / 2;
  const scaleX = collapsedRect.width / expandedRect.width;
  const scaleY = collapsedRect.height / expandedRect.height;

  return [deltaX, deltaY, scaleX, scaleY];
}

function PokemonCard({ pokemon, toggleOverlayCallback }: PokemonCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const flipAnimatableElements = useRef<FlipAnimatableElement[]>([]);

  useEffect(() => {
    const flipAnimatable: NodeListOf<Element> = document
      .querySelector(`[data-pokemon-id="${pokemon.id}"]`)!
      .querySelectorAll(".flipTransitionable");

    flipAnimatable.forEach((el) => {
      if (!flipAnimatableElements.current.some((x) => x.element === el)) {
        flipAnimatableElements.current.push({
          element: el,
          rectData: { collapsedRect: getDomRect(el), expandedRect: null },
        });
      }
    });
  }, [pokemon.id]);

  useLayoutEffect(() => {
    if (!isExpanded) {
      return;
    }

    console.log(flipAnimatableElements);
    flipAnimatableElements.current.forEach((flipEl: FlipAnimatableElement) => {
      flipEl.rectData.expandedRect = getDomRect(flipEl.element);

      const [deltaX, deltaY, scaleX, scaleY] = calculateTransfrom(
        flipEl.rectData.collapsedRect!,
        flipEl.rectData.expandedRect,
      );

      console.log("I am here with pokemon id " + pokemon.id);

      flipEl.element.animate(
        [
          {
            transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`,
          },
          {
            transform: "translate(0, 0) scale(1)",
          },
        ],
        {
          duration: 1000, // Duration of the animation in milliseconds
        },
      );
    });
  }, [isExpanded]);

  function onCardClick() {
    toggleOverlayCallback(!isExpanded);
    setIsExpanded(!isExpanded);
  }

  const pokemonName = pokemon.name;
  const pokemonImg = pokemon.img;
  const pokemonWeight = (pokemon.weight / 10).toFixed(1);
  const pokemonHeight = (pokemon.height / 10).toFixed(1);

  return (
    <div data-pokemon-id={pokemon.id}>
      <div
        onClick={onCardClick}
        className={
          "pokemonCard flipTransitionable " + (isExpanded ? "expanded" : "")
        }
      >
        <img
          src={pokemonImg}
          alt="Pokemon img"
          className="pokemonCardImg flipTransitionable"
        />
        <span className="pokemonCardTitle flipTransitionable">
          {pokemonName}
        </span>
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

      {/*It takes the place of the card when expanded  */}
      <div className={isExpanded ? "" : "hidden"}></div>
    </div>
  );
}

export default PokemonCard;
