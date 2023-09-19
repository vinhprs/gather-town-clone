import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { localPreferences } from '../LocalPreferences';
import { colors } from "../constants";
import { updateRoomData } from "../userData";
import { getRoomFromPath } from '../utils';

import { BsFillMicMuteFill, BsMicFill } from "react-icons/bs";
import { MdVideocam, MdVideocamOff } from "react-icons/md";
import "./GameSelfVideo.css";
import "./GameVideoMenu.css";

export default function GameSelfVideo(props) {
	const [nameValue, setNameValue] = useState("");
	const [showMenu, setShowMenu] = useState(false);

	let color = colors[parseInt(props.myPlayer) % colors.length];

	useEffect(() => {
		let initData = localPreferences.get("rooms")[getRoomFromPath()];
		if (initData && "name" in initData) {
			setNameValue(initData["name"]);
		}
	}, []);

	useEffect(() => {
		let inputEl = document.getElementById("self-name-input");
		if (inputEl) {
			inputEl.style.color = color;
		}
	}, [props.myPlayer]);

	useEffect(() => {
		let video = document.getElementById("self-video");
		if ("srcObject" in video) {
			if (props.stream) {
				video.srcObject = props.stream;
			}
		} else {
			video.src = window.URL.createObjectURL(props.stream); // For older browsers
		}
		var playPromise = video.play();

		if (playPromise !== undefined) {
			playPromise
				.then((_) => {
					// Automatic playback started!
					// Show playing UI.
				})
				.catch((error) => {
					// Auto-play was prevented
					// Show paused UI.
				});
		}
		video.muted = true;
	}, [props.stream]);

	function nameOnChange(e) {
		let newValue = e.target.value;
		if (newValue.length > 50) {
			newValue = newValue.slice(0, 50);
		}
		setNameValue(newValue);

		updateRoomData(getRoomFromPath(), { name: newValue });
	}

	function takePicture() {
		let ownVideo = document.getElementById("self-video");
		let canvas = document.getElementById("take-picture-canvas");
		if (ownVideo && canvas) {
			let context = canvas.getContext("2d");
			let width = ownVideo.videoWidth;
			let height = ownVideo.videoHeight;
			canvas.width = width;
			canvas.height = height;
			context.drawImage(ownVideo, 0, 0, width, height);
			props.setOwnImage(context.getImageData(0, 0, width, height));
		}
	}

	let videoMenu = (
		<div className="selfvideo-stream-controls">
			<div
				className="menu-horizontal-container action"
				onClick={() => props.setVideoEnabled(!props.videoEnabled)}>
				{!props.videoEnabled ? (
					<MdVideocam size={24} color="#85E6C5" />
				) : (
					<MdVideocamOff size={24} color="#ff3049" />
				)}
			</div>
			<div
				className="menu-horizontal-container action"
				onClick={() => props.setAudioEnabled(!props.audioEnabled)}>
				{props.audioEnabled ? (
					<BsFillMicMuteFill size={20} color="#ff3049" />
				) : (
					<BsMicFill size={20} color="#85E6C5" />
				)}
			</div>
		</div>
	);


	let roomsData = localPreferences.get("rooms");
	let initUsername = roomsData[getRoomFromPath()]?.name;

	let displayName = initUsername;
	return (
		<div
			style={props.isFullScreen ? { flex: 1, height: "100%" } : {}}
			className="vertical-container self-video-container"
			onMouseEnter={() => setShowMenu(true)}
			onMouseLeave={() => setShowMenu(false)}>
			<div style={{ position: "relative" }}>
				<video
					id="self-video"
					style={
						props.isFullScreen
							? { flex: 1, width: "100%", height: "100%", borderRadius: "10px" }
							: {}
					}></video>
				{showMenu ? videoMenu : null}
			</div>
			<div className="name-video-container">
				<GoDotFill size={20} color="#85E6C5" />
				<p>{displayName}</p>
			</div>
		</div>
	);
}
