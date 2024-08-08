import React from "react";
import { motion } from "framer-motion";

const text = "SIMPLY JET";

const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 5.5,
    },
  }),
};

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <motion.h1
        className="text-6xl font-bold text-white"
        initial="hidden"
        animate="visible"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        style={{ fontSize: "20.10448vw", letterSpacing: "-26px" }}
      >
        {text.split("").map((char, index) => (
          <motion.span key={index} custom={index} variants={letterAnimation}>
            {char}
          </motion.span>
        ))}
      </motion.h1>
      <div
        style={{
          marginTop: "10px",
        }}
      >
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex align-center"
        //   ="#section3"
        >
          {" "}
          Scroll Down
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            style={{ marginLeft: '4px'}}
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 9-7 7-7-7"
            />
          </svg>
          <span className="sr-only">Icon description</span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
