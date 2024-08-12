// components/AnimatedHeading.js
import React from "react";
import { motion } from "framer-motion";
// import styled from "styled-components";
import './hero.css';

// const FullPageContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   width: 100vw;
//   background-color: #000; /* Background color of the page */
//   flex-direction: column;
// `;

// const HeadingContainer = styled.h1`
//   font-size: calc(1rem + 22.15vw);
//   color: white;
//   cursor: pointer;
//   font-family: "Six Caps", sans-serif;
//   font-weight: 400;
//   font-style: normal;
// `;

// const SubTitle = styled.p`
//   font-family: "Nunito Sans", sans-serif;
//   text-transform: uppercase;
//   width: 40%;
//   position: relative;
//   bottom: 24%;
//   opacity: 0.6;
// `;

// const Letter = styled(motion.span)`
//   display: inline-block;
// `;

// @ts-ignore
const AnimatedHeading = ({ text }) => {
  const hoverAnimation = {
    scale: 1.5,
    y: -70,
    color: "#FFD700", // Change to gold on hover
    transition: {
      type: "spring",
      stiffness: 300,
    },
  };

  return (
    <>
      <div className="fullPageContainer">
        <h1 className="headingContainer">
          {text.split("").map((letter: string, index: number) => (
            <motion.span
              key={index}
              whileHover={hoverAnimation}
              className="letter"
              style={{
                display: letter === " " ? "inline-block" : "inline-block",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
        <p className="subTitle">
          Simply Jet is a leading European private air charter specialist,
          providing global solutions for your private flight requirements.
        </p>
      </div>
    </>
  );
};

export default AnimatedHeading;
