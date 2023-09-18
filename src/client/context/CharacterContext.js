import React, { createContext, useContext, useState } from "react";

// Create a context for character data
const CharacterContext = createContext();

// Create a CharacterProvider component to wrap your application
export function CharacterProvider({ children }) {
  const [characterData, setCharacterData] = useState({
    id: 1,
    username: null,
  });

  const setCharacterUsername = (username) => {
    setCharacterData({ ...characterData, username });
  };

  const setCharacterId = (id) => {
    setCharacterData({ ...characterData, id });
  };

  return (
    <CharacterContext.Provider
      value={{ setCharacterUsername, setCharacterId, characterData }}>
      {children}
    </CharacterContext.Provider>
  );
}

// Create a custom hook to use the character data
export function useCharacter() {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacter must be used within a CharacterProvider");
  }
  return context;
}
