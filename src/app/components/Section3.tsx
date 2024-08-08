// src/components/Section3.tsx
import React from 'react';
import { motion } from 'framer-motion';

const Section3: React.FC = () => {
  return (
    <section id="section3" className="bg-black text-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1 }}
        variants={{
            visible: { opacity: 1, scale: 1 },
            hidden: { opacity: 0, scale: 0 }
        }}
        className="container mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>
        <p className="mb-6">This is the third section of the Montoya landing page.</p>
        <motion.img 
          src="/assets/images/section3.jpg" 
          alt="Section 3" 
          className="w-full h-auto"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
      </motion.div>
    </section>
  );
};

export default Section3;
