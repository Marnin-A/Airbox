import { BarChart3, Users, Calendar, TrendingUp } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const Dashboard = () => {
	const chartData = {
		labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		datasets: [
			{
				label: "Weekly Bookings",
				data: [12, 19, 15, 17, 14, 23, 25],
				borderColor: "rgb(79, 70, 229)",
				tension: 0.4,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Weekly Booking Trends",
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	return (
		<div className="space-y-6 py-6">
			<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-500">Total Bookings</p>
							<p className="text-2xl font-semibold text-gray-900">125</p>
						</div>
						<Calendar className="text-indigo-600" size={24} />
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-500">Active Customers</p>
							<p className="text-2xl font-semibold text-gray-900">48</p>
						</div>
						<Users className="text-indigo-600" size={24} />
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-500">Weekly Revenue</p>
							<p className="text-2xl font-semibold text-gray-900">$2,845</p>
						</div>
						<TrendingUp className="text-indigo-600" size={24} />
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-500">Avg. Booking Value</p>
							<p className="text-2xl font-semibold text-gray-900">$75</p>
						</div>
						<BarChart3 className="text-indigo-600" size={24} />
					</div>
				</div>
			</div>

			<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
				<Line options={chartOptions} data={chartData} />
			</div>
		</div>
	);
};

export default Dashboard;
