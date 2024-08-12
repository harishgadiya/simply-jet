// src/pages/Home.tsx
import React, { useRef, useState } from "react";
import StickyCursor from "@/app/components/StickyCursor";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Hero from "../app/components/Hero";
import Portfolio from "@/app/components/Portfolio/Portfolio";

const Home: React.FC = () => {
  const stickyElement = useRef<HTMLDivElement | null>(null);
  const [cursorText, setCursorText] = useState<string>("");
  const [cursorVariant, setCursorVariant] = useState<string>("default");
  const projectEnter = () => {
    setCursorText("View");
    setCursorVariant("project");
  };

  const projectLeave = () => {
    setCursorText("");
    setCursorVariant("default");
  };
  return (
    <div>
      <Header ref={stickyElement} />
      <div style={{ textAlign: "center", backgroundColor: "#000" }}>
        <Hero text="SIMPLY JET" />
      </div>
      <StickyCursor
        stickyElement={stickyElement}
        cursorText={cursorText}
        cursorVariant={cursorVariant}
      />
      <Portfolio projectEnter={projectEnter} projectLeave={projectLeave} />
      {/* <Section1 />
      <Section2 />
      <Section3 /> */}
      <Footer />
    </div>
  );
};

export default Home;
