import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Account from "./pages/Account";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-gray-50 flex flex-col items-center">
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route
						path="/*"
						element={
							<ProtectedRoute>
								<>
									<Navbar />
									<main className="container pt-16">
										<Routes>
											<Route path="/" element={<Dashboard />} />
											<Route path="/schedule" element={<Schedule />} />
											<Route path="/account" element={<Account />} />
										</Routes>
									</main>
								</>
							</ProtectedRoute>
						}
					/>
				</Routes>
				<Toaster position="bottom-right" />
			</div>
		</Router>
	);
}

export default App;
