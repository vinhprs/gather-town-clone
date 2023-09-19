import React, { useEffect, useRef } from "react";

import "./GameChat.css";
import { characterIds, colors } from "../constants";
import { useCharacter } from "../context/CharacterContext";

export default function GameChat(props) {
  console.error("props.chatMessages", props.chatMessages);
  const {
    characterData: { id: selectedId },
  } = useCharacter();
  const refLastIds = useRef([]);
  const inputRef = useRef();
  // useEffect(() => {
  //   let chatInput = document.getElementById("send-chat");
  //   console.error("chatInput", chatInput);
  //   chatInput.addEventListener("keyup", (event) => {
  //     if (event.key === "Enter") {
  //       console.error(" chatInput.value", chatInput.value);
  //       props.sendChatMessage(chatInput.value);
  //       chatInput.value = "";
  //     } else {
  //       chatInput.value = chatInput.value.slice(0, 500);
  //     }
  //   });
  // }, []);

  const onSubmitMessage = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    // console.error(" chatInput.value", chatInput.value);
    props.sendChatMessage(inputValue);
    inputRef.current.value = "";
  };

  let chatMessages = props.chatMessages.map((messageData, idx) => {
    console.error("messageData", messageData);
    let chatName = "NoName";
    if (messageData.id in props.playerInfoMap) {
      chatName = props.playerInfoMap[messageData.id].name;
    }
    const isContinueMessage =
      props.chatMessages?.[idx - 1]?.id &&
      props.chatMessages[idx]?.id == props.chatMessages[idx - 1]?.id;
    return (
      <div key={idx} className="ot-chat-message">
        <div className="flex gap-4">
          {!isContinueMessage ? (
            <img
              src={characterIds[messageData?.characterId]}
              className="object-cover !w-[30px] !h-[30px] object-left"
            />
          ) : (
            <div className=" !w-[30px] !h-[2px]"></div>
          )}

          <div className="flex-1 flex flex-col">
            {!isContinueMessage && (
              <span className="text-lg font-semibold">{chatName}</span>
            )}
            <p className="whitespace-pre-line w-[130px]">
              {messageData.message}
            </p>
          </div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    let chatMessagesContainer = document.getElementById("chat-messages");
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    refLastIds.current = [
      props?.chatMessages[props?.chatMessages?.length - 1]?.id || null,
      props?.chatMessages[props?.chatMessages?.length - 2]?.id || null,
    ];
  }, [props.chatMessages]);

  let newTop = 5;
  let newHeightA = 391;
  let newHeightB = 355;

  if (props.hasLinks) {
    newTop = 65;
    newHeightA = 331;
    newHeightB = 295;
  }

  return (
    <div
      className="ot-chat-container"
      style={{ top: newTop, height: newHeightA }}>
      <div
        id="chat-messages"
        className="ot-chat-message-container"
        style={{ height: newHeightB }}>
        {chatMessages}
      </div>

      <form className="input-search" onSubmit={onSubmitMessage}>
        <input ref={inputRef} type="text" />
      </form>
      {/* <input
        id="send-chat"
        className="ot-chat-input"
        placeholder="Enter message..."></input> */}
    </div>
  );
}
