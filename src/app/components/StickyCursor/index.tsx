import { useEffect, useState, RefObject, useRef } from "react";
import "./stickyCursor.css";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useSpring,
} from "framer-motion";

interface StickyCursorProps {
  stickyElement: RefObject<HTMLElement>;
  cursorText: string;
  cursorVariant: string;
}

const StickyCursor: React.FC<StickyCursorProps> = ({
  stickyElement,
  cursorText,
  cursorVariant,
}) => {
  const cursor = useRef(null);
  const scale = {
    x: useMotionValue(1),

    y: useMotionValue(1),
  };
  const [isHovered, setIsHovered] = useState(false);

  let cursorSize = isHovered ? 60 : 40;

  if (cursorText !== "") {
    cursorSize = 100;
  }

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  // Smooth out the mouse values
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    if (stickyElement.current) {
      const { left, top, height, width } =
        stickyElement.current.getBoundingClientRect();

      // Center position of the stickyElement
      const center = { x: left + width / 2, y: top + height / 2 };

      if (isHovered) {
        // Distance between the mouse pointer and the center of the custom cursor
        const distance = { x: clientX - center.x, y: clientY - center.y };
        //rotate

        rotate(distance);
        //stretch based on the distance

        const absDistance = Math.max(
          Math.abs(distance.x),
          Math.abs(distance.y)
        );

        const newScaleX = transform(absDistance, [0, height / 2], [1, 1.3]);

        const newScaleY = transform(absDistance, [0, width / 2], [1, 0.8]);

        scale.x.set(newScaleX);

        scale.y.set(newScaleY);

        // Move mouse to center of stickyElement + slightly move it towards the mouse pointer
        mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
        mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);
      } else {
        // Move custom cursor to the mouse position
        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);
      }
    }
  };

  const manageMouseOver = () => {
    setIsHovered(true);
  };

  const manageMouseLeave = () => {
    setIsHovered(false);
    animate(cursor.current, { scaleX: 1, scaleY: 1 }, { duration: 0.1 });
  };

  const rotate = (distance: any) => {
    const angle = Math.atan2(distance.y, distance.x);

    animate(cursor.current, { rotate: `${angle}rad` }, { duration: 0 });
  };

  useEffect(() => {
    if (stickyElement.current) {
      stickyElement.current.addEventListener("mouseenter", manageMouseOver);
      stickyElement.current.addEventListener("mouseleave", manageMouseLeave);
    }

    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      if (stickyElement.current) {
        stickyElement.current.removeEventListener(
          "mouseenter",
          manageMouseOver
        );
        stickyElement.current.removeEventListener(
          "mouseleave",
          manageMouseLeave
        );
      }

      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [isHovered, stickyElement]);

  // @ts-ignore
  const template = ({ rotate, scaleX, scaleY }) => {
    return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;
  };

  return (
    <div className="cursorContainer">
      <motion.div
        ref={cursor}
        transformTemplate={template}
        // animate={cursorVariant}
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
          cursor: cursorText !== "" ? "pointer" : "default",
        }}
        animate={{
          width: cursorSize,
          height: cursorSize,
          fontVariant: cursorVariant,
        }}
        className={cursorText !== "" ? "cursor cursorWithText" : "cursor"}
      >
        <span className="cursorText">{cursorText}</span>
      </motion.div>
    </div>
  );
};

export default StickyCursor;
