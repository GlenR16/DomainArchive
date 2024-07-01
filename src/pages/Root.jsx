import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { UsernameProvider } from "../contexts/UsernameProvider";

export default function Root() {
	return (
		<UsernameProvider>
			<Navbar>
				<Outlet />
			</Navbar>
		</UsernameProvider>
	);
}
