import React from "react";
import BpNavbar from "../components/NavBar";
import Header from "../components/Header";
import BpSearchBar from "../components/SearchBar";

export const Search = () => {
	return (
		<>
			<Header />
			<BpNavbar />
			<div>
				<BpSearchBar />
			</div>
		</>
	);
};
