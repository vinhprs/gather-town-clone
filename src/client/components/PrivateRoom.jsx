import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import GameComponent from "./GameComponent.jsx";
import GameHeader from "./GameHeader.jsx";
import PasswordPrompt from "./PasswordPrompt.jsx";
import AltGameComponent from "./alternate/AltGameComponent.jsx";

import { localPreferences } from "../LocalPreferences.js";
import { amplitudeAnonInstance, amplitudeInstance } from "../amplitude";
import { auth, characterIds } from "../constants";
import { getRoomFromPath } from "../utils";

const OGPreview = "/images/site/test.jpg";

import GameChangeCharacterUpdate from "./GameChangeCharacterUpdate.jsx";
import "./PrivateRoom.css";
import { useCharacter } from "../context/CharacterContext.js";
import { characterMap } from "../../common/maps.js";
import LayoutInGame from "../layouts/LayoutInGame.jsx";

const EnterPrivateText = ({ onYes }) => {
  const { setCharacterUsername } = useCharacter();
  const inputRef = useRef();
  const roomName = getRoomFromPath().split(/\\/).join(" - ");
  const {
    characterData: { id },
  } = useCharacter();
  return (
    <div className="ot-privateroom-overlay" style={{ margin: "50px" }}>
      <div className="vertical-center-container" style={{ width: "600px" }}>
        <h3 className="text-4xl text-white font-black text-center">
          Welcome to <span className="text-[#CAD8FF]">{roomName}</span>
        </h3>
        <div className="w-full border-2 border-white flex items-center gap-10 mt-8">
          <img className="w-[300px] object-cover flex-1" src={OGPreview}></img>
          <div className="w-full flex-1 !text-white">
            <div className="flex gap-4">
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }>
                <img
                  src={characterIds[id]}
                  className="object-cover w-[40px] h-[40px] object-left"
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

              <input
                ref={inputRef}
                type="text"
                placeholder="Username"
                className="input input-bordered w-full max-w-xs !text-gray-700"
              />
            </div>
            <button
              className="btn btn-accent bg-[#06D6A0] w-full mt-6"
              onClick={() => {
                const text = inputRef.current.value;
                setCharacterUsername(text);
                onYes();
              }}>
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EnterPrivateIntro = (props) => {
  let [wantToUse, setWantToUse] = useState(false);
  let [user, setUser] = useState(localPreferences.get("user"));
  useEffect(() => {
    let handle = localPreferences.on("user", (info) => {
      setUser(user);
    });
    return () => {
      localPreferences.remove("user", handle);
    };
  }, []);

  return (
    <div style={{ marginBottom: "50px" }} className="vertical-center-container">
      <EnterPrivateText onYes={props.onYes} />
      {/* {wantToUse ? (
        <YesNoPrompt
          prompt={
            <>
              Are you above the age of 18?{" "}
              <span className="bold">(required)</span>
            </>
          }
          onYes={() => {
            updateUserData({ overAge: true });
            props.onYes();
          }}
          onNo={() => props.onNo()}
        />
      ) : (
        <YesNoPrompt
          prompt={<>Do you want to enter this room?</>}
          onYes={() => {
            setWantToUse(true);
            if (user.overAge) {
              props.onYes();
            }
          }}
          onNo={() => props.onNo()}
        />
      )} */}
    </div>
  );
};

export default function PrivateRoom() {
  const [doneWithIntro, setDoneWithIntro] = useState(false);
  const [hasPassword, setHasPassword] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [password, setPassword] = useState();
  const [showHeader, setShowHeader] = useState(true);
  const [hasAlternateLayout, setHasAlternateLayout] = useState(false);

  const [hasLinks, setHasLinks] = useState(false);
  const [url1, setURL1] = useState();
  const [url2, setURL2] = useState();
  const [name1, setName1] = useState();
  const [name2, setName2] = useState();
  useEffect(() => {
    axios
      .get(window.location.origin + "/api/hasPassword", {
        params: { roomId: getRoomFromPath() },
      })
      .then((response) => {
        console.log("responded with ", response.status, " ", response.data);
        if (response.status === 200 && response.data) {
          setHasPassword(true);
        } else {
          setHasPassword(false);
        }
      });
  }, []);
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        user
          .getIdToken(true)
          .then((token) => {
            return axios.get(window.location.origin + "/api/hasAccess", {
              params: {
                roomId: getRoomFromPath(),
                authToken: token,
              },
            });
          })
          .then((response) => {
            console.log(
              "hasaccess responded with ",
              response.status,
              response.data
            );
            if ((response.status === 200) & response.data) {
              setHasAccess(true);
            } else {
              setHasAccess(false);
            }
          });
      }
    });
  }, []);

  function startGame(password) {
    if (password) {
      setPassword(password);
    }
    amplitudeAnonInstance.logEvent("Enter Private", {
      room: getRoomFromPath(),
    });
    amplitudeAnonInstance.setUserId(null);
    amplitudeAnonInstance.regenerateDeviceId();
    amplitudeInstance.logEvent("Enter Private Identified", {});
  }

  useEffect(() => {
    if (doneWithIntro) {
      if (!hasPassword || hasAccess) {
        startGame();
      }
    }
  }, [doneWithIntro]);
  console.log("doneWithIntro", doneWithIntro);

  return (
    <div className="vertical-center-container">
      {doneWithIntro ? (
        hasPassword && !password && !hasAccess ? (
          <div>
            <GameHeader />
            <PasswordPrompt gotPassword={(password) => startGame(password)} />
          </div>
        ) : (
          <>
            {hasAlternateLayout ? (
              <AltGameComponent
                inGame={true}
                isPrivate={true}
                password={password}
                setHasAlternateLayout={setHasAlternateLayout}
              />
            ) : (
              <>
                {/* {showHeader ? <GameHeader /> : <div> </div>} */}
                <LayoutInGame>
                  <GameComponent
                    inGame={true}
                    isPrivate={true}
                    password={password}
                    setHasAlternateLayout={setHasAlternateLayout}
                    setShowHeader={setShowHeader}
                    setHasLinks={setHasLinks}
                    setName1={setName1}
                    setName2={setName2}
                    setURL1={setURL1}
                    setURL2={setURL2}
                    hasLinks={hasLinks}
                    name1={name1}
                    name2={name2}
                    url1={url1}
                    url2={url2}
                  />
                </LayoutInGame>
              </>
            )}
          </>
        )
      ) : (
        <div>
          <GameHeader />
          <EnterPrivateIntro
            onYes={() => {
              setDoneWithIntro(true);
            }}
            onNo={() => {
              window.location.href = "/";
            }}
          />
        </div>
      )}
    </div>
  );
}
