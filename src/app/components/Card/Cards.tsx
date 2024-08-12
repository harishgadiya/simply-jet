// @ts-nocheck

import "./card.css";

import { useTransform, useScroll, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Card = ({
  i,
  title,
  year,
  src,
  // url,
  color,
  progress,
  range,
  targetScale,
  projectEnter,
  projectLeave
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  const sectionRef = useRef(null);
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBlurred(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.3, // Adjust threshold to control when the blur happens
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  return (
    <div ref={container} className={"cardContainer container"}>
      <motion.div
        className={`card scroll-section ${isBlurred ? "blurred" : ""}`}
        ref={sectionRef}
        initial={{ opacity: 1 }}
        animate={{ opacity: isBlurred ? 0.8 : 1 }} // Reduce opacity when blurred
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
      >
        <div
          className={"body"}
          onMouseEnter={projectEnter}
          onMouseLeave={projectLeave}
        >
          <div className={"imageContainer"}>
            <div className={"description absolute"}>
              <h2>{title}</h2>
              <div className="chip">{year}</div>
            </div>
            <motion.div className={"inner"} style={{ scale: imageScale }}>
              <img fill src={`/assets/images/${src}`} alt="image" />
            </motion.div>
            <div className="chip right">PHOTO</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
