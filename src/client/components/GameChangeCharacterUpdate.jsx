import React from "react";
import classNames from "classnames";

import { characterIds } from "../constants";
import { characterMap } from "../../common/maps";

import "./GameChangeCharacter.css";
import { useCharacter } from "../context/CharacterContext";

export default function GameChangeCharacterUpdate(props) {
  const {
    setCharacterId,
    characterData: { id: selectedId },
  } = useCharacter();
  console.log("characterData", selectedId);
  // console.log("props", props);
  // if (props.characterId && props.currentMap && characterMap[props.currentMap]) {
  let ids = characterMap[110];
  return (
    <div className="w-full flex gap-4 flex-wrap">
      {ids.map((id) => {
        return (
          <div key={id}>
            <img
              src={characterIds[id]}
              onClick={() => setCharacterId(id)}
              className={classNames(
                "object-cover w-[40px] h-[40px] object-left ring-2",
                {
                  "not-selected !ring-0": id !== selectedId,
                }
              )}
            />
          </div>
        );
      })}
    </div>
  );
  // } else {
  //   return <></>;
  // }
}
