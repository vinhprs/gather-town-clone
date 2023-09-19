import React from "react";
import { BiLogoAirbnb } from "react-icons/bi";
import {
	BsFillEmojiSmileFill,
	BsFillMicMuteFill,
	BsSearch,
	BsMicFill
} from "react-icons/bs";
import { IoIosChatbubbles } from "react-icons/io";
import { LiaHandPaper } from "react-icons/lia";
import {
	MdKeyboardArrowUp,
	MdModeEditOutline,
	MdVideocamOff,
	MdVideocam
} from "react-icons/md";
import { PiChalkboardTeacherBold, PiClipboardTextFill } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { SlScreenDesktop } from "react-icons/sl";
import "./LayoutInGame.css";
const LayoutInGame = ({ children, ...props }) => {
	return (
		<div className="main-game-container">
			<div className="top-layout">
				<div className="game-body">{children}</div>
				<div className="bar-container">
					<h1>E6 1 U7 BIRTHDAY BASEBALL</h1>
					<div className="input-search">
						<div style={{ width: "20px", height: "20px" }}>
							<BsSearch size={20} color="#e0e0e0" />
						</div>
						<input type="text" />
					</div>
				</div>
			</div>
			<div className="control-container">
				<div className="v-flex gap-4">
					<div className="logo" onClick={() => console.error(props?.refVideo)}>
						<BiLogoAirbnb size={20} color="white" />
					</div>
					<div className="user-container">
						<div className="avatar">
							<RxAvatar size={20} color="white" />
						</div>
						<div className="name">
							<p>Huy</p>
							<p>Available</p>
						</div>
						<div className="edit">
							<MdModeEditOutline size={14} color="white" />
						</div>
					</div>
					<div style={props.ownAudioEnabled ? {background: `#ff304933`} : {background: `#30ffe733`}} className="control" onClick={() => props?.setOwnAudioEnabled((e) => !e)}>

						{props.ownAudioEnabled ? (
							<BsFillMicMuteFill size={20} color="#ff3049" />
						) : (
							<BsMicFill size={20} color="#85E6C5" />
						)}
						{/* <div className="arrow">
							<MdKeyboardArrowUp size={14} color="#ff3049" />
						</div> */}
					</div>
					<div style={props.ownVideoEnabled ? {background: `#ff304933`} : {background: `#30ffe733`}} className="control" onClick={() => props?.setOwnVideoEnabled((e) => !e)}>
						{!props.ownVideoEnabled ? (
							<MdVideocam size={24} color="#85E6C5" />
						) : (
							<MdVideocamOff size={24} color="#ff3049" />
						)}

						{/* <div className="arrow">
							<MdKeyboardArrowUp size={14} color="#ff3049" />
						</div> */}
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
