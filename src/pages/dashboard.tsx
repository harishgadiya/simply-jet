import { NextPage } from "next";
import { useRef, useState } from "react";
import Users from "../app/components/Users";
import Link from "next/link";
import Header from "@/app/components/Header";

const Dashboard: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<"users">("users");
  const stickyElement = useRef<HTMLDivElement | null>(null);
  return (
    <>
    <Header ref={stickyElement} />
    <div className="min-h-screen flex bg-slate-950 dark:bg-slate-950">
      <div className="w-3/4 p-4">{selectedTab === "users" && <Users />}</div>
      <div className="w-1/4 bg-slate-900 dark:bg-slate-900 text-white p-4">
        <nav>
          <ul>
            <li
              className={`p-2 cursor-pointer ${
                selectedTab === "users" ? "bg-slate-950 dark:bg-slate-950" : ""
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
    </>
  );
};

export default Dashboard;
