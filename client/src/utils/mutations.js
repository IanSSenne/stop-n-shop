import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
			}
		}
	}
`;

export const ADD_ITEM = gql`
	mutation AddItem($title: String, $photos: [String], $location: String, $datePosted: String, $ask: Float) {
		addItem(title: $title, photos: $photos, Location: $location, datePosted: $datePosted, ask: $ask) {
			_id
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
		addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
			token
			user {
				_id
			}
		}
	}
`;

export const SEND_MESSAGE = gql`
	mutation SendMessage($chatId: ID, $message: String) {
		sendMessage(chatId: $chatId, message: $message)
	}
`;
