import { Clock, DollarSign, Calendar } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AccountSidebar } from "@/components/AccountSideBar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { parseAsString, useQueryState } from "nuqs";
import Profile from "@/components/account/profile";

const Account = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [params, _] = useQueryState(
		"tab",
		parseAsString.withDefault("Profile")
	);

	return (
		<SidebarProvider>
			<main className="relative flex items-center justify-center">
				<AccountSidebar />
				<SidebarTrigger className="self-start mr-auto" />
				<Tabs defaultValue="Profile" value={params}>
					<TabsContent value="Profile">
						<Profile />
					</TabsContent>
					<TabsContent value="">2</TabsContent>
					<TabsContent value="Settings" className="max-w-4xl flex flex-col">
						<h1 className="text-2xl font-bold text-gray-900">Settings</h1>
						<div className="bg-white rounded-lg shadow-sm border border-gray-100">
							<div className="p-6">
								<h2 className="text-lg font-medium text-gray-900 mb-4">
									Business Hours
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{[
										"Monday",
										"Tuesday",
										"Wednesday",
										"Thursday",
										"Friday",
										"Saturday",
										"Sunday",
									].map((day) => (
										<div
											key={day}
											className="flex items-center justify-between p-3 border rounded-md"
										>
											<span className="text-gray-700">{day}</span>
											<div className="flex items-center space-x-2">
												<select className="form-select text-sm border-gray-300 rounded-md">
													<option>9:00 AM</option>
													<option>10:00 AM</option>
												</select>
												<span>to</span>
												<select className="form-select text-sm border-gray-300 rounded-md">
													<option>5:00 PM</option>
													<option>6:00 PM</option>
												</select>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="bg-white rounded-lg shadow-sm border border-gray-100">
							<div className="p-6">
								<h2 className="text-lg font-medium text-gray-900 mb-4">
									Services
								</h2>
								<div className="space-y-4">
									<div className="flex items-center justify-between p-4 border rounded-md">
										<div className="flex items-center space-x-3">
											<Clock className="text-gray-400" size={20} />
											<div>
												<p className="font-medium text-gray-900">Haircut</p>
												<p className="text-sm text-gray-500">45 minutes</p>
											</div>
										</div>
										<div className="flex items-center space-x-2">
											<DollarSign className="text-gray-400" size={20} />
											<span className="font-medium">45</span>
										</div>
									</div>
									<div className="flex items-center justify-between p-4 border rounded-md">
										<div className="flex items-center space-x-3">
											<Clock className="text-gray-400" size={20} />
											<div>
												<p className="font-medium text-gray-900">Massage</p>
												<p className="text-sm text-gray-500">60 minutes</p>
											</div>
										</div>
										<div className="flex items-center space-x-2">
											<DollarSign className="text-gray-400" size={20} />
											<span className="font-medium">80</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-white rounded-lg shadow-sm border border-gray-100">
							<div className="p-6">
								<h2 className="text-lg font-medium text-gray-900 mb-4">
									Booking Settings
								</h2>
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<Calendar className="text-gray-400" size={20} />
											<div>
												<p className="font-medium text-gray-900">
													Advance Booking Window
												</p>
												<p className="text-sm text-gray-500">
													How far in advance customers can book
												</p>
											</div>
										</div>
										<select className="form-select text-sm border-gray-300 rounded-md">
											<option>2 weeks</option>
											<option>1 month</option>
											<option>2 months</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</main>
		</SidebarProvider>
	);
};

export default Account;
