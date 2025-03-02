import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiChat,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { useState } from "react";
import UserMangement from "./pages/UserMangement";
import ClientMangement from "./pages/ClientMangement";

function Component() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [activeComponent, setActiveComponent] = useState(null);

  const components = {
    UserManagement: <UserMangement />,
    ClientManagement: <ClientMangement />,
    Dashboard: (
      <div>
        <h2>Dashboard Content</h2>
        <p>Welcome to your dashboard</p>
      </div>
    ),
    Wallet: (
      <div>
        <h2>Users Content</h2>
        <p>User listing would appear here</p>
      </div>
    ),
    Products: (
      <div>
        <h2>Products Content</h2>
        <p>Product listing would appear here</p>
      </div>
    ),
    "Sign In": (
      <div>
        <h2>Sign In Form</h2>
        <p>Login form would appear here</p>
      </div>
    ),
    Footer: (
      <div>
        <h2>Footer Settings</h2>
        <p>Footer configuration would appear here</p>
      </div>
    ),
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setActiveComponent(components[itemName]);
  };

  return (
    <div className="flex h-screen arsenal-sc-regular">
      <Sidebar
        aria-label="Beautiful sidebar"
        className=" border-r border-gray-300 w-[25rem] shadow-lg bg-gradient-to-b from-blue-50 to-indigo-50"
      >
        <div className="mb-5 p-4 text-start">
          <h2 className="text-3xl font-bold text-[#0000ff]">DevLink</h2>
        </div>

        <Sidebar.Items>
          <Sidebar.ItemGroup className="grid gap-3">
            {[
              { name: "Dashboard", icon: HiChartPie },
              {
                name: "UserManagement",
                icon: HiViewBoards,
                label: "Pro",
                labelColor: "indigo",
              },
              {
                name: "ClientManagement",
                icon: HiChat,
                label: "3",
                labelColor: "blue",
              },
              { name: "Users", icon: HiUser },
              { name: "Wallet", icon: HiShoppingBag },
              { name: "Sign In", icon: HiArrowSmRight },
              { name: "Footer", icon: HiTable },
            ].map((item) => (
              <Sidebar.Item
                key={item.name}
                href="#"
                icon={item.icon}
                label={item.label}
                labelColor={item.labelColor}
                active={activeItem === item.name}
                onClick={() => handleItemClick(item.name)}
                className={`mb-1 transition-all duration-200 no-underline text-md
                   text-black py-3 rounded-xl  ${
                  activeItem === item.name
                    ? "bg-[#3342e7] text-white font-bold "
                    : "hover:bg-blue-50"
                }`}
              >
                {item.name}
              </Sidebar.Item>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar.Items>

        {/* <div className="mt-auto p-4">
          <div className="flex items-center p-2 rounded-lg bg-blue-600 bg-opacity-10">
            <img
              src="/api/placeholder/32/32"
              alt="User"
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
        </div> */}
      </Sidebar>

      <div className="flex-1 overflow-hidden bg-gray-50">
        {/* <h1 className="text-2xl font-semibold text-gray-800 mb-4">{activeItem}</h1> */}
        <div className="bg-transparent rounded-lg  ">{activeComponent}</div>
      </div>
    </div>
  );
}

export default Component;
