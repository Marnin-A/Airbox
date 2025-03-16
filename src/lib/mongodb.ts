import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Request } from "express";

declare module "express-session" {
	interface SessionData {
		userId: string;
	}
}

const MONGODB_URI = import.meta.env.MONGODB_URI || "";

// Define Schemas
const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	googleId: { type: String, unique: true, sparse: true },
});

const profileSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	business_name: { type: String, required: true },
	contact_email: { type: String, required: true },
	phone: { type: String, required: true },
});

// Define Models
const User = mongoose.models.User || mongoose.model("User", userSchema);
const Profile =
	mongoose.models.Profile || mongoose.model("Profile", profileSchema);

// Connect to MongoDB
export const connectDB = async () => {
	try {
		if (mongoose.connection.readyState === 0) {
			await mongoose.connect(MONGODB_URI);
			console.log("Connected to MongoDB");
		}
	} catch (error) {
		console.error("MongoDB connection error:", error);
	}
};

// Register User Function
export const registerUser = async (values: {
	email: string;
	password: string;
	businessName: string;
	phone: string;
}) => {
	try {
		await connectDB();

		const { email, password, businessName, phone } = values;

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = new User({
			email,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();

		// Create a new profile
		const newProfile = new Profile({
			userId: savedUser._id,
			business_name: businessName,
			contact_email: email,
			phone: phone,
		});

		await newProfile.save();

		return { success: true, message: "User registered successfully" };
	} catch (error: unknown) {
		console.error("Error registering user:", error);
		return { success: false, message: (error as Error).message };
	}
};

// Login User Function
export const loginUser = async (
	values: { email: string; password: string },
	req: Request
) => {
	try {
		await connectDB();

		const { email, password } = values;

		// Find the user by email
		const user = await User.findOne({ email });

		if (!user) {
			return { success: false, message: "Invalid credentials" };
		}

		// Compare passwords
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return { success: false, message: "Invalid credentials" };
		}

		// Store user information in the session
		req.session.userId = user._id;

		return { success: true, message: "Login successful", user };
	} catch (error: unknown) {
		console.error("Error logging in user:", error);
		return { success: false, message: (error as Error).message };
	}
};

// Get Current User Function
export const getCurrentUser = async (req: Request) => {
	try {
		await connectDB();

		if (!req.session.userId) {
			return null; // No user in session
		}

		const userId = req.session.userId;
		const user = await User.findById(userId);

		if (!user) {
			return null; // User not found
		}

		return {
			email: user.email,
			_id: user._id,
			// ... other user properties
		};
	} catch (error) {
		console.error("Error getting current user:", error);
		return null;
	}
};
