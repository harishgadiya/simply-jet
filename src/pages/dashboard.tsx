import { NextPage } from "next";
import { useState } from "react";
import Users from "../app/components/Users";
import Link from "next/link";

const Dashboard: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<"users">("users");

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <div className="w-3/4 p-4">{selectedTab === "users" && <Users />}</div>
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <nav>
          <ul>
            <li
              className={`p-2 cursor-pointer ${
                selectedTab === "users" ? "bg-gray-700" : ""
              }`}
              onClick={() => setSelectedTab("users")}
            >
              Users
            </li>
            <li className="p-2 cursor-pointer">
              <Link href="/">Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
