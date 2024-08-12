// src/components/Header.tsx
import React, { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import "./header.css";
import Image from "next/image";

interface HamburgerMenuProps {
  // You can add props here if needed
  ref: HTMLDivElement
}

// @ts-ignore
const Header = forwardRef<HTMLDivElement, HamburgerMenuProps>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const item = {
    hidden: {
      y: "200%",
      color: "#0055FF",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      color: "#FF0088",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };
  return (
    <header className="bg-black text-white p-4">
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="container-fluid mx-auto flex justify-between items-center"
      >
        <div className="">
        <Link href="/"><Image src="/assets/images/logo-typeface.svg" width={150} alt="logo"/></Link>
        </div>
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
            <li>
              <div className="menuButton" onClick={toggleMenu} ref={ref}>
                <motion.div
                  className="line"
                  animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                />
                <motion.div
                  className="line"
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.div
                  className="line"
                  animate={
                    isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }
                  }
                />
              </div>
            </li>
          </ul>
          <motion.div
            className="overlay"
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? 0 : "100%" }}
            transition={{ duration: 0.9 }}
            variants={item}
          >
            <motion.div variants={item} style={{ display: "inline-block" }}>
              <motion.div
                className="menuItem"
                whileHover={{ scale: 1.1 }}
                onClick={toggleMenu}
              >
                <Link href="/">
                HOME
                </Link>
              </motion.div>
              <motion.div
                className="menuItem"
                whileHover={{ scale: 1.1 }}
                onClick={toggleMenu}
              >
                PORTFOLIO
              </motion.div>
              <motion.div
                className="menuItem"
                whileHover={{ scale: 1.1 }}
                onClick={toggleMenu}
              >
                ABOUT
              </motion.div>
              <motion.div
                className="menuItem"
                whileHover={{ scale: 1.1 }}
                onClick={toggleMenu}
              >
                CONTACT
              </motion.div>
            </motion.div>
          </motion.div>
        </nav>
      </motion.div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
