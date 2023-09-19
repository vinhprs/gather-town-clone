import React from "react";
import { BiLogoAirbnb } from "react-icons/bi";
import {
	BsFillEmojiSmileFill,
	BsFillMicMuteFill,
	BsSearch,
} from "react-icons/bs";
import { IoIosChatbubbles } from "react-icons/io";
import { LiaHandPaper } from "react-icons/lia";
import { MdKeyboardArrowUp, MdVideocamOff } from "react-icons/md";
import { PiChalkboardTeacherBold, PiClipboardTextFill } from "react-icons/pi";
import { SlScreenDesktop } from "react-icons/sl";
import EditUserName from "../components/EditUserName.jsx";
import { useCharacter } from "../context/CharacterContext";
import "./LayoutInGame.css";
const LayoutInGame = ({ children }) => {
	const {
		characterData: { id: selectedId },
	} = useCharacter();
	return (
		<div className="main-game-container">
			<div className="top-layout">
				<div className="game-body">{children}</div>
				{/* <div className="bar-container">
          <h1>E6 1 U7 BIRTHDAY BASEBALL</h1>
          <div className="input-search">
            <div style={{ width: "20px", height: "20px" }}>
              <BsSearch size={20} color="#e0e0e0" />
            </div>
            <input type="text" />
          </div>
        </div> */}
			</div>
			<div className="control-container">
				<div className="v-flex gap-4">
					<div className="logo">
						<BiLogoAirbnb size={20} color="white" />
					</div>
					<EditUserName />
					<div className="control">
						<BsFillMicMuteFill size={20} color="#ff3049" />
						<div className="arrow">
							<MdKeyboardArrowUp size={14} color="#ff3049" />
						</div>
					</div>
					<div className="control">
						<MdVideocamOff size={30} color="#ff3049" />
						<div className="arrow">
							<MdKeyboardArrowUp size={14} color="#ff3049" />
						</div>
					</div>
					<div className="action-game">
						<BsFillEmojiSmileFill size={20} color="#e0e0e0" />
					</div>
					<div className="action-game">
						<SlScreenDesktop size={20} color="#e0e0e0" />
					</div>
					<div className="action-game">
						<LiaHandPaper size={20} color="#e0e0e0" />
					</div>
				</div>
				<div className="notification">
					<div className="item">
						<PiChalkboardTeacherBold size={24} color="#e0e0e0" />
					</div>
					<div className="item">
						<PiClipboardTextFill size={24} color="#e0e0e0" />
					</div>
					<div className="item">
						<IoIosChatbubbles size={24} color="#e0e0e0" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default LayoutInGame;
