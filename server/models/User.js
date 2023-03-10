const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
	{
		displayName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, "Must match an email address!"],
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		bookmarkedItems: [
			{
				type: Schema.Types.ObjectId,
				ref: "Item",
			},
		],
		sellingItems: [
			{
				type: Schema.Types.ObjectId,
				ref: "Item",
			},
		],
		purchasedItems: [
			{
				type: Schema.Types.ObjectId,
				ref: "Item",
			},
		],
		chats: [
			{
				type: Schema.Types.ObjectId,
				ref: "Chat",
			},
		],
		interests: [
			{
				type: Schema.Types.ObjectId,
				ref: "Tag",
			},
		],
	},
	{
		methods: {
			isCorrectPassword: async function (password) {
				return bcrypt.compare(password, this.password);
			},
		},
	}
);

userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	next();
});

const User = model("User", userSchema);
module.exports = User;
