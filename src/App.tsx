import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-gray-50">
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/*"
						element={
							<ProtectedRoute>
								<>
									<Navbar />
									<main className="container mx-auto px-4 py-8">
										<Routes>
											<Route path="/" element={<Dashboard />} />
											<Route path="/schedule" element={<Schedule />} />
											<Route path="/settings" element={<Settings />} />
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
