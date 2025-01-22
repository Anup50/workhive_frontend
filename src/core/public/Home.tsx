import React from "react";
import Navbar from "../../components/Navbar";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main className="flex-grow">
        <div className="text-red-500">This text should be red</div>
      </main>
    </div>
  );
};

export default Home;
