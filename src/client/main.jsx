import axios from "axios";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./index.html";

import "./fonts.css";
import "./main.css";
import "./reset.css";

import { auth } from "./constants";

import { localPreferences } from "./LocalPreferences";
import { amplitudeInstance } from "./amplitude";
import CreatePrivate from "./components/CreatePrivate.jsx";
import EmailAuth from "./components/EmailAuth.jsx";
import Help from "./components/Help.jsx";
import Homepage from "./components/Homepage.jsx";
import PrivateRoom from "./components/PrivateRoom.jsx";
import { CharacterProvider } from "./context/CharacterContext";
import { createCookie, readCookie } from "./cookies";
import { dataOnSignIn } from "./userData";
import { getSubDomain, makeId } from "./utils";
import RoomPrivate from "./components/RoomPrivate.jsx";

// Add user cookie
let userStorage = localPreferences.get("user");
if (!userStorage) {
	let newId = makeId(20);
	let data = {
		id: newId,
		overAge: false,
		analytics: false,
		seenTutorial: false,
	};
	localPreferences.set("user", data);
	axios.post(window.location.origin + "/api/addId", {
		id: newId,
	});

	amplitudeInstance.setUserId(newId);
}

// Add subdomain cookie
if (getSubDomain()) {
	let toWrite = readCookie("publicRooms");
	if (toWrite && !toWrite.includes(getSubDomain())) {
		toWrite = toWrite + "," + getSubDomain();
		createCookie("publicRooms", toWrite, 3000);
	} else if (!toWrite) {
		createCookie("publicRooms", getSubDomain(), 3000);
	}
}

let App = () => {
	useEffect(() => {
		return auth.onAuthStateChanged((user) => {
			if (user) {
				dataOnSignIn();
			}
		});
	}, []);

	return (
		<CharacterProvider>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Homepage} />
					<Route path="/help" exact component={Help} />
					<Route path="/private" exact component={CreatePrivate} />
					<Route path="/zoom/:id" exact component={RoomPrivate} />
					<Route path="/auth" component={EmailAuth} />
					<Route path="/:room/:name" component={PrivateRoom} />
				</Switch>
			</BrowserRouter>
		</CharacterProvider>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
