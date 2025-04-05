import { Home, Inbox, Settings } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { parseAsString, useQueryState } from "nuqs";

// Menu items.
const items = [
	{
		title: "Profile",
		url: "Profile",
		icon: Home,
	},
	{
		title: "Inbox",
		url: "",
		icon: Inbox,
	},
	{
		title: "Settings",
		url: "Settings",
		icon: Settings,
	},
];

export function AccountSidebar() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [activeTab, setActiveTab] = useQueryState(
		"tab",
		parseAsString.withDefault("Profile")
	);

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="hidden">Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Button
											variant="ghost"
											onClick={() => setActiveTab(item.url)}
										>
											<item.icon />
											<span>{item.title}</span>
										</Button>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
