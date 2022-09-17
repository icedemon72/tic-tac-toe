import React, { useState } from "react";

//Components
import Board from "./board/Board";

const Game = (props) => {
  const [ isPlaying, setIsPlaying ] = useState(true);

  const hideTheNavbarHandler = () => {
    setIsPlaying(true);
    props.hideTheNavbar();
  }

  return (
    <>
    {!isPlaying && <button onClick={hideTheNavbarHandler}>PLAY</button>}
    {isPlaying && <Board />}
    </>
  )
}

export default Game;