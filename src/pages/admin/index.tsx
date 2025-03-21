import { Sidebar } from "flowbite-react";
import { ReactElement, Suspense, lazy } from "react";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import UserMangement from "./pages/UserMangement";
import Requests from "./pages/Requests";
import Wallet from "./pages/Wallet";
import Contracts from "./pages/Contracts";
import WithdrawRequest from "./pages/WithdrawRequest";
import {
  HiChartPie,
  HiOutlineUsers,
  HiTable,
  HiOutlineCurrencyDollar,
  HiOutlinePaperAirplane,
  HiOutlineUser,
  HiViewBoards,
} from "react-icons/hi";

function Component() {
  const [activeItem, setActiveItem] = useState<string>("Dashboard");
  const [activeComponent, setActiveComponent] = useState<ReactElement>(
    <Dashboard />
  );
  const ClientMangement = lazy(() => import("./pages/ClientMangement"));

  const components = {
    Dashboard: <Dashboard />,
    UserManagement: <UserMangement />,
    ClientManagement: (
      <Suspense fallback={<div>loading ...</div>}>
        <ClientMangement />
      </Suspense>
    ),
    Requests: <Requests />,
    Wallet: <Wallet />,
    Contracts: <Contracts />,
    TransferMoney: <WithdrawRequest />,
    "Sign In": (
      <div>
        <h2>Sign In Form</h2>
        <p>Login form would appear here</p>
      </div>
    ),
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setActiveComponent(components[itemName]);
  };

  return (
    <div className="flex arsenal-sc-regular">
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
              },
              {
                name: "ClientManagement",
                icon: HiOutlineUser,
              },
              { name: "Requests", icon: HiOutlinePaperAirplane },
              { name: "TransferMoney", icon: HiOutlinePaperAirplane },
              { name: "Wallet", icon: HiOutlineCurrencyDollar },
              { name: "Contracts", icon: HiOutlineUsers },
              { name: "Logout", icon: HiTable },
            ].map((item) => (
              <Sidebar.Item
                key={item.name}
                href="#"
                icon={item.icon}
                active={activeItem === item.name}
                onClick={() => handleItemClick(item.name)}
                className={`mb-1 transition-all duration-200 no-underline text-md
                   text-black py-3 rounded-xl  ${activeItem === item.name
                    ? "bg-[#3342e7] text-white font-bold hover:bg-[#3342e7]"
                    : "hover:bg-blue-100"
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
