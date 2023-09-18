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
  let ids = characterMap[110];
  return (
    <div className="w-full flex flex-wrap !w-auto !h-auto gap-4 ">
      {ids.map((id) => {
        return (
          <div key={id} className="h-fit">
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
