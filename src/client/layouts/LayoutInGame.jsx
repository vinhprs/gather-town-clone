import React from "react";
import toast, { ToastBar, Toaster, useToasterStore } from "react-hot-toast";
import { BiLogoAirbnb } from "react-icons/bi";
import {
	BsFillEmojiSmileFill,
	BsFillMicMuteFill,
	BsMicFill,
} from "react-icons/bs";
import { IoIosChatbubbles } from "react-icons/io";
import { LiaHandPaper } from "react-icons/lia";
import { MdVideocam, MdVideocamOff } from "react-icons/md";
import { PiChalkboardTeacherBold, PiClipboardTextFill } from "react-icons/pi";
import { SlScreenDesktop } from "react-icons/sl";
import EditUserName from "../components/EditUserName.jsx";
import "./LayoutInGame.css";
import { useEffect } from "react";
const LayoutInGame = ({ children, ...props }) => {
	const store = useToasterStore();
	useEffect(() => {
		store?.toasts
			?.filter((t) => t.visible) // Only consider visible toasts
			?.filter((_, i) => i >= 1) // Is toast index over limit?
			?.forEach((t) => toast?.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
	}, [store?.toasts]);
	return (
		<div className="main-game-container">
			<Toaster
				containerClassName="toast"
				toastOptions={{
					style: {
						maxWidth: "unset",
					},
					duration: 3000,
				}}>
				{(t) => (
					<ToastBar toast={t}>
						{({ icon, message }) => {
							return (
								<>
									{icon}
									<div
										dangerouslySetInnerHTML={{
											__html: message?.props?.children || "",
										}}
									/>
								</>
							);
						}}
					</ToastBar>
				)}
			</Toaster>
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
					<div className="logo" onClick={() => console.error(props?.refVideo)}>
						<BiLogoAirbnb size={20} color="white" />
					</div>
					<EditUserName />
					<div
						style={
							props.ownAudioEnabled
								? { background: `#ff304933` }
								: { background: `#30ffe733` }
						}
						className="control"
						onClick={() => props?.setOwnAudioEnabled((e) => !e)}>
						{props.ownAudioEnabled ? (
							<BsFillMicMuteFill size={20} color="#ff3049" />
						) : (
							<BsMicFill size={20} color="#85E6C5" />
						)}
						{/* <div className="arrow">
							<MdKeyboardArrowUp size={14} color="#ff3049" />
						</div> */}
					</div>
					<div
						style={
							props.ownVideoEnabled
								? { background: `#ff304933` }
								: { background: `#30ffe733` }
						}
						className="control"
						onClick={() => props?.setOwnVideoEnabled((e) => !e)}>
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
