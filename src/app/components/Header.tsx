// src/components/Header.tsx
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-black text-white p-4">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold">SimplyJet</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
            <Link href="/dashboard">
            <button
              type="button"
              className="text-black bg-gray-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-white dark:hover:bg-white dark:focus:ring-black-800 flex align-center"
            >
              {" "}
              GO TO DASHBOARD
            </button>
          </Link>
            </li>
          </ul>
          
        </nav>
      </motion.div>
    </header>
  );
};

export default Header;
