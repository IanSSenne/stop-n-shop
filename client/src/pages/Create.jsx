import React from "react";
import CreateForm from "../components/CreateForm";

import Header from "../components/Header";

export const Create = () => {
	return (
		<>
			<Header />

			{/* <div>
		<h2>List Your Item:</h2>
		<CreateForm />
		</div> */}
			<CreateForm />
		</>
	);
};
