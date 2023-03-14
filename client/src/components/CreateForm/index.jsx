import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FileInput, FormGroup, InputGroup, TextArea, ButtonGroup, Button } from "@blueprintjs/core";
import { ADD_ITEM } from "../../utils/mutations";
import { z } from "zod";

function CreateForm() {
	const navigator = useNavigate();
	const [createNewItem, { loading: creatingItem }] = useMutation(ADD_ITEM);

	const createFormValidator = z.object({
		price: z.number(),
		tags: z.string(),
	});

	function saveItem(event) {
		event.preventDefault();
		const formData = new FormData(event.target.value);
		const title = formData.get("title");
		const description = formData.get("description");
		const price = formData.get("price");
		const tags = formData.get("tag");
		const location = formData.get("location");
		// TODO: figure out cloudinary
		const itemData = {
			title,
			description,
			price,
			tags,
			location,
		};

		createNewItem({
			variables: itemData,
		}).then(() => {
			event.target.navigator("/profile");
		});
	}

	return (
		<>
			<h1> Create Form</h1>
			<FormGroup>
				<form onSubmit={saveItem}>
					<h3>Item Title</h3>
					<InputGroup name="title" placeholder="Enter the title of your new item..." type="text" />
					<h3>Item Price</h3>
					<InputGroup name="price" placeholder="Enter the price of your new item..." type="text" />
					<h3>Item Description</h3>
					<TextArea name="description" placeholder="Description..." type="text" />
					<h3>Tags</h3>
					<InputGroup name="tags" placeholder="Add tags..." type="text" />
					<h3>Location</h3>
					<InputGroup name="location" placeholder="Enter your location..." type="text" />
					<h3>Add Item Images</h3>
					<FileInput name="images" text="Choose file..." icon="Document" buttonText="Upload..." />
					<h3>Sell Your New Item</h3>
					<Button type="submit" text="CONFIRM" rightIcon="tick" />
				</form>
			</FormGroup>
		</>
	);
}

export default CreateForm;
