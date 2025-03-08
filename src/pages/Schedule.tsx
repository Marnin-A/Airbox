import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Clock, User } from "lucide-react";
import "react-day-picker/dist/style.css";

const Schedule = () => {
	const [selected, setSelected] = useState<Date>();

	const bookings = [
		{
			id: 1,
			customerName: "John Doe",
			time: "09:00 AM",
			service: "Haircut",
			duration: "1 hour",
		},
		{
			id: 2,
			customerName: "Jane Smith",
			time: "11:30 AM",
			service: "Massage",
			duration: "1.5 hours",
		},
		{
			id: 3,
			customerName: "Mike Johnson",
			time: "02:00 PM",
			service: "Facial",
			duration: "1 hour",
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div className="md:col-span-1">
				<div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
					<DayPicker
						mode="single"
						selected={selected}
						onSelect={setSelected}
						className="!w-full"
					/>
				</div>
			</div>

			<div className="md:col-span-2">
				<div className="bg-white rounded-lg shadow-sm border border-gray-100">
					<div className="p-4 border-b border-gray-100">
						<h2 className="text-lg font-semibold text-gray-900">
							{selected ? format(selected, "MMMM d, yyyy") : "Select a date"}
						</h2>
					</div>

					<div className="divide-y divide-gray-100">
						{bookings.map((booking) => (
							<div key={booking.id} className="p-4 hover:bg-gray-50">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-4">
										<div className="flex-shrink-0">
											<User className="h-10 w-10 text-gray-400" />
										</div>
										<div>
											<p className="text-sm font-medium text-gray-900">
												{booking.customerName}
											</p>
											<div className="flex items-center space-x-2 text-sm text-gray-500">
												<Clock size={14} />
												<span>{booking.time}</span>
												<span>•</span>
												<span>{booking.duration}</span>
											</div>
											<p className="text-sm text-gray-500">{booking.service}</p>
										</div>
									</div>
									<button className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md">
										Edit
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Schedule;
