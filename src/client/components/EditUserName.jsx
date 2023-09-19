import React, { useMemo, useState } from "react";
import { getRoomFromPath } from "../utils";
import { localPreferences } from "../LocalPreferences";
import { characterIds } from "../constants";
import { useCharacter } from "../context/CharacterContext";
import { updateRoomData } from "../userData";
import GameChangeCharacterUpdate from "./GameChangeCharacterUpdate.jsx";
import { MdModeEditOutline } from "react-icons/md";

const EditUserName = () => {
  const {
    characterData: { id: selectedId },
  } = useCharacter();
  const [triggerAction, setTriggerAction] = useState(false);

  const initUsername = useMemo(() => {
    let roomsData = localPreferences.get("rooms");
    let initUsername = roomsData[getRoomFromPath()]?.name;
    return initUsername;
  }, [triggerAction]);

  const [currentUsername, setCurrentUsername] = useState(initUsername);
  const onChangeInput = (e) => {
    setCurrentUsername(e.target.value);
  };

  const onClickFinishButton = () => {
    if (currentUsername === "") return;
    updateRoomData(getRoomFromPath(), { name: currentUsername });
    setTriggerAction(!triggerAction);
  };
  return (
    <div className="user-container">
      <div className="avatar">
        <button
          className="flex justify-between items-center"
          onClick={() => document.getElementById("my_modal_2").showModal()}>
          <img
            src={characterIds[selectedId]}
            className="object-cover !w-[30px] !h-[30px] object-left"
          />
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <GameChangeCharacterUpdate />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <button
        type="button"
        className="name"
        onClick={() =>
          document.getElementById("my_modal_edit_name").showModal()
        }>
        <p>{initUsername}</p>
        <p>Available</p>
        <MdModeEditOutline
          className="absolute top-2 right-2"
          size={14}
          color="white"
        />
        <dialog id="my_modal_edit_name" className="modal">
          <div className="modal-box !p-0">
            <form method="dialog">
              <button
                onClick={() => {
                  setCurrentUsername(initUsername);
                }}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="w-full h-52 flex justify-center items-center bg-[#333A64]">
              <img
                src={characterIds[selectedId]}
                className="object-cover !w-[80px] !h-[80px] object-left"
              />
            </div>
            <div className="w-full bg-[#202540] p-6 flex flex-col gap-6 items-center">
              <p className="text-white font-bold text-2xl text-start">
                What’s your name?
              </p>
              <p className="text-white font-medium text-lg text-start">
                Your name shows above your character. You’ll be able to change
                it anytime.
              </p>
              <input
                value={currentUsername}
                onChange={onChangeInput}
                type="text"
                placeholder="Username"
                className="input input-bordered w-full w-full !text-gray-700"
              />
              <form method="dialog">
                <button
                  className="btn btn-accent bg-[#06D6A0] text-[#202540] w-fit px-16"
                  onClick={onClickFinishButton}>
                  Finish
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </button>
    </div>
  );
};

export default EditUserName;
