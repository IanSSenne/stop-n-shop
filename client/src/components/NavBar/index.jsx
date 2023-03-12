import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Button, Alignment } from "@blueprintjs/core";

function BpNavbar() {
	return (
		<Navbar>
			<Navbar.Group align={Alignment.LEFT}>
				<Navbar.Heading>Blueprint</Navbar.Heading>
				<Navbar.Divider />
				<Link to="/">
					<Button className="bp4-minimal" icon="home" text="Home" />
				</Link>
				<Link to="/profile">
					<Button className="bp4-minimal" icon="document" text="Profile" />
				</Link>
				<Link to="/create">
					<Button className="bp4-minimal" icon="document" text="Create New Listing" />
				</Link>
				<Link to="/search">
					<Button className="bp4-minimal" icon="document" text="Search" />
				</Link>
			</Navbar.Group>

			<Navbar.Group align={Alignment.RIGHT}>
				<Link to="/login">
					<Button className="bp4-minimal" icon="document" text="Login" />
				</Link>
			</Navbar.Group>
		</Navbar>
	);
}
export default BpNavbar;
