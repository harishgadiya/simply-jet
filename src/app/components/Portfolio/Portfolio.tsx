import React, { useRef } from "react";
import { motion, useScroll, MotionValue } from "framer-motion";
import styled from "styled-components";
import Card from "../Card/Cards";

// Define the type for the project data
interface Project {
  title: string;
  year: string;
  src: string;
  color: string;
}

interface PortfolioProps {
  projectEnter: () => void;
  projectLeave: () => void;
}

export const projects: Project[] = [
  {
    title: "Matthias Leidinger",
    year: "2024",
    src: "section1.jpg",
    color: "transparent",
  },
  {
    title: "Clément Chapillon",
    year: "2024",
    src: "section2.jpg",
    color: "transparent",
  },
  {
    title: "Zissou",
    year: "2024",
    src: "section3.jpg",
    color: "transparent",
  },
  {
    title: "Matthias Leidinger",
    year: "2024",
    src: "section1.jpg",
    color: "transparent",
  },
  {
    title: "Clément Chapillon",
    year: "2024",
    src: "section2.jpg",
    color: "transparent",
  },
  {
    title: "Zissou",
    year: "2024",
    src: "section3.jpg",
    color: "transparent",
  },
];

const Main = styled.main`
  margin-top: 0;
  margin-bottom: 0;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
`;

const Portfolio: React.FC<PortfolioProps> = ({ projectEnter, projectLeave }) => {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <Main ref={container}>
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05;

        return (
          <Card
            key={`p_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
            projectEnter={projectEnter}
            projectLeave={projectLeave}
          />
        );
      })}
    </Main>
  );
};

export default Portfolio;
