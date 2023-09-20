import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const RoomPrivate = () => {
	let { id } = useParams();
	const url = `https://app.zoom.us/wc/${id}/join`;
	return (
		<iframe
			src={url}
			style={{ width: "100vw", height: "100vh" }}
			frameBorder="0"></iframe>
	);
};

export default RoomPrivate;
