// src/pages/Home.tsx
import React from 'react';
import Header from '../app/components/Header';
import Footer from '../app/components/Footer';
import Section1 from '../app/components/Section1';
import Section2 from '../app/components/Section2';
import Section3 from '../app/components/Section3';
import Hero from '../app/components/Hero';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Section1 />
      <Section2 />
      <Section3 />
      <Footer />
    </div>
  );
};

export default Home;
