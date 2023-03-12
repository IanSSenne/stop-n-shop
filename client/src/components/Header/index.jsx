import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Elevation } from "@blueprintjs/core";

function Header() {
	return (
		<header>
			<div>
				<Link to="/">
					<h1>Stop-n-Shop</h1>
				</Link>
			</div>
		</header>
	);
}

export default Header;
