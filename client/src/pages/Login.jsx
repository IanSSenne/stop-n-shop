import React, { useState } from "react";
import { useAuth } from "../contexts/Auth";
import { z } from "zod";
import BpNavbar from "../components/NavBar";
import Header from "../components/Header";

// TODO: remove this in favor of a standardized input component
function Input(props) {
	return (
		<div>
			<label htmlFor={props.name}>{props.label}</label>
			<input type={props.type} name={props.name} id={props.name} />
		</div>
	);
}

function arrayMatch(a, b) {
	if (a.length !== b.length) {
		return false;
	}
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			return false;
		}
	}
	return true;
}

// TODO: Refactor this
function ErrorMessage({ errors, path }) {
	const myErrors = errors.filter((e) => arrayMatch(e.path, path));
	if (myErrors.length === 0) {
		return null;
	}
	return (
		<div className="error">
			<ul>
				{myErrors.map((e) => (
					<li key={e.message}>{e.message}</li>
				))}
			</ul>
		</div>
	);
}
const loginValidator = z.object({
	email: z.string().email(),
	password: z
		.string()
		.min(6, "Password must be at least 8 characters")
		.refine((v) => /[a-z]/.test(v), {
			message: "Password must contain at least one lowercase letter",
		})
		.refine((v) => /[A-Z]/.test(v), {
			message: "Password must contain at least one uppercase letter",
		})
		.refine((v) => /[0-9]/.test(v), {
			message: "Password must contain at least one number",
		})
		.refine((v) => /[^a-zA-Z0-9]/.test(v), {
			message: "Password must contain at least one special character",
		}),
});

const signUpValidator = z
	.object({
		email: z.string().email(),
		password: z
			.string()
			.min(6, "Password must be at least 8 characters")
			.refine((v) => /[a-z]/.test(v), {
				message: "Password must contain at least one lowercase letter",
			})
			.refine((v) => /[A-Z]/.test(v), {
				message: "Password must contain at least one uppercase letter",
			})
			.refine((v) => /[0-9]/.test(v), {
				message: "Password must contain at least one number",
			})
			.refine((v) => /[^a-zA-Z0-9]/.test(v), {
				message: "Password must contain at least one special character",
			}),
		displayName: z.string().min(3, "Display name must be at least 3 characters"),
		confirmPassword: z.string(),
	})
	.refine(
		(data) => {
			return data.confirmPassword === data.password;
		},
		{
			message: "Passwords must match",
			path: ["confirmPassword"],
		}
	);

export const Login = () => {
	const auth = useAuth();

	const [error, setError] = useState(null);
	const [formMode, setFormMode] = useState("login");

	const signIn = (e) => {
		e.preventDefault();
		const data = {
			email: e.target.email.value,
			password: e.target.password.value,
		};
		const result = loginValidator.safeParse(data);
		if (result.success) {
			setError(null);
			auth.login(result.data);
		} else {
			setError(result.error);
		}
	};
	const signUp = (e) => {
		e.preventDefault();
		const data = {
			email: e.target.email.value,
			password: e.target.password.value,
			displayName: e.target.displayName.value,
			confirmPassword: e.target.confirmPassword.value,
		};
		const result = signUpValidator.safeParse(data);
		if (result.success) {
			setError(null);
			auth.signUp(result.data);
		} else {
			setError(result.error);
		}
	};
	return (
		<>
			<Header />
			<BpNavbar />
			<div>
				<div>
					<button onClick={() => setFormMode("login")}>Login</button>
					<button onClick={() => setFormMode("signup")}>Sign Up</button>
				</div>
				{formMode === "login" && (
					<form onSubmit={signIn}>
						<Input type="email" name="email" label="Email" />
						<ErrorMessage errors={error?.errors || []} path={["email"]} />
						<Input type="password" name="password" label="Password" />
						<ErrorMessage errors={error?.errors || []} path={["password"]} />
						<button type="submit">Login</button>
					</form>
				)}
				{formMode === "signup" && (
					<form onSubmit={signUp}>
						<Input type="email" name="email" label="Email" />
						<ErrorMessage errors={error?.errors || []} path={["email"]} />
						<Input type="password" name="password" label="Password" />
						<ErrorMessage errors={error?.errors || []} path={["password"]} />
						<Input type="password" name="confirmPassword" label="Confirm Password" />
						<ErrorMessage errors={error?.errors || []} path={["confirmPassword"]} />
						<Input type="text" name="displayName" label="Display Name" />
						<ErrorMessage errors={error?.errors || []} path={["displayName"]} />
						<button type="submit">Sign Up</button>
					</form>
				)}
			</div>
		</>
	);
};
