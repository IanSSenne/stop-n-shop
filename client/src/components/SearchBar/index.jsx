import React from "react";
import { InputGroup, Icon } from "@blueprintjs/core";
import Results from "../Results";

function BpSearchBar() {
	return (
		<>
			<InputGroup placeholder="Search" leftElement={<Icon icon="search" />} type="text" />
			<Results />
		</>
	);
}

export default BpSearchBar;
