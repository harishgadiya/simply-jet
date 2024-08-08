// src/components/Section1.tsx
import React from 'react';
import { motion } from 'framer-motion';

const Section1: React.FC = () => {
    return (
      <section id="section1" className="bg-black text-white">
        <motion.div
        //   initial={{ opacity: 0 }}
        //   animate={{ opacity: 1 }}
        //   transition={{ duration: 1 }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1 }}
            variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0 }
            }}
          className="container mx-auto text-center"
        >
          <h1 className="text-3xl font-bold mb-6">SimplyJet</h1>
          <motion.img
            src="/assets/images/section1.jpg"
            alt="Section 1"
            className="w-full h-auto"
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </section>
    );
};

export default Section1;
