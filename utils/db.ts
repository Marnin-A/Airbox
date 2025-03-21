import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../../models/userls/user";
import { Profile } from "../../models/profileprofile";

const MONGODB_URI = import.meta.env.MONGODB_URI || "";

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
export const registerUser = async (values: any) => {
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
	} catch (error: any) {
		console.error("Error registering user:", error);
		return { success: false, message: error.message };
	}
};

// Login User Function
export const loginUser = async (
	values: {
		email: string;
		password: string;
	},
	req: any
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
	} catch (error: any) {
		console.error("Error logging in user:", error);
		return { success: false, message: error.message };
	}
};

// Get Current User Function
export const getCurrentUser = async (req: any) => {
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
