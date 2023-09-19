import React, { useContext, useEffect, useState } from "react";
import { MdVideocam, MdVideocamOff } from "react-icons/md";

import { colors } from "../constants";

import ModContext from "./ModContext.jsx";

import { BsFillMicMuteFill, BsMicFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { TbLockOpen, TbLockOpenOff } from "react-icons/tb";
import "./GameVideo.css";
import "./GameVideoMenu.css";

function distToOpacity(distance) {
	let opacities = [1, 1, 1, 1, 0.8, 0.6, 0.4, 0.2, 0, 0, 0, 0, 0];
	return opacities[Math.floor(distance)];
}

function distToVolume(distance) {
	let volumes = [1, 1, 1, 1, 0.6, 0.5, 0.2, 0.2, 0.1, 0.1, 0.05, 0.05, 0.05];
	return volumes[Math.floor(distance)];
}

export default function GameVideo(props) {
	const [showMenu, setShowMenu] = useState(false);

	const { modPasswordCorrect } = useContext(ModContext);
	useEffect(() => {
		let video = document.getElementById("video-" + props.id);
		if ("srcObject" in video) {
			if (props.stream) {
				video.srcObject = props.stream;
			}
		} else {
			video.src = window.URL.createObjectURL(props.stream); // For older browsers
		}
		video.play();
		return () => {
			// Stop video playback and release resources if the component is unmounted
			video.pause();
			if ("srcObject" in video) {
				video.srcObject = null;
			} else {
				video.src = "";
			}
		};
	}, [props.stream]);

	useEffect(() => {
		let video = document.getElementById("video-" + props.id);
		if (props.distance) {
			if (distToOpacity(props.distance) !== undefined) {
				video.parentElement.parentElement.style.opacity = distToOpacity(
					props.distance
				);
			}
			if (distToVolume(props.distance) !== undefined) {
				video.volume = distToVolume(props.distance);
			}
		}
		return () => {
			// Reset styles and properties if the component is unmounted
			if (video && video.parentElement && video.parentElement.parentElement) {
				video.parentElement.parentElement.style.opacity = ""; // Reset opacity
			}
			if (video) {
				video.volume = 1; // Reset volume
			}
		};
	}, [props.distance]);

	function toggleVideoEnabled() {
		props.setVideoEnabled(!props?.videoEnabled);
	}

	function toggleAudioEnabled() {
		props.setAudioEnabled(!props.audioEnabled);
	}

	function toggleBlocked() {
		props.setBlocked(!props.blocked);
	}

	let color = colors[parseInt(props.id) % colors.length];

	let videoMenu = (
		<div className="selfvideo-stream-controls">
			<div
				className="menu-horizontal-container action"
				onClick={() => toggleVideoEnabled()}>
				{!props.videoEnabled ? (
					<MdVideocam size={24} color="#85E6C5" />
				) : (
					<MdVideocamOff size={24} color="#ff3049" />
				)}
			</div>
			<div
				className="menu-horizontal-container action"
				onClick={() => toggleAudioEnabled()}>
				{props.audioEnabled ? (
					<BsFillMicMuteFill size={20} color="#ff3049" />
				) : (
					<BsMicFill size={20} color="#85E6C5" />
				)}
			</div>
			<div
				className="menu-horizontal-container action"
				onClick={() => toggleBlocked()}>
				{props.blocked ? (
					<TbLockOpenOff size={20} color="#ff3049" />
				) : (
					<TbLockOpen size={20} color="#85E6C5" />
				)}
			</div>
		</div>
	);

	let name =
		props.playerInfo && props.playerInfo["name"]
			? props.playerInfo["name"]
			: "";
	let id =
		props.playerInfo && props.playerInfo["publicId"]
			? props.playerInfo["publicId"]
			: "";

	let displayName = name;
	if (modPasswordCorrect) displayName = name + "#" + id.substr(0, 6);
	return (
		<div
			className="vertical-container video-container"
			onMouseEnter={() => setShowMenu(true)}
			onMouseLeave={() => setShowMenu(false)}
			style={props.isFullScreen ? { flex: 1, height: "100%" } : {}}>
			<div style={{ position: "relative" }}>
				<video
					id={"video-" + props.id}
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
