import React, { useState, useEffect } from 'react';
import axios from 'axios';
import gen from '../assets/icon-dice.svg';
import { FaReact } from 'react-icons/fa';

const AdviceGenerator = () => {
  const [advice, setAdvice] = useState('');
  const [adviceId, setAdviceId] = useState(null);
  const initialFetchDone = React.useRef(false);

  const getAdvice = async () => {
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      const { id, advice } = response.data.slip;
      setAdviceId(id);
      setAdvice(advice);
    } catch (error) {
      setAdviceId(null);
      setAdvice("Unable to fetch advice. Please try again later.");
      console.error("Error fetching advice:", error);
    }
  };

  useEffect(() => {
    if (!initialFetchDone.current) {
      getAdvice();
      initialFetchDone.current = true;
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-[#1f2632]">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-white font-bold text-4xl">Advice Generator</h1>
        <FaReact className="text-[#61DAFB] text-3xl animate-spin-slow" />
      </div>
      <div className="flex flex-col p-[5px] items-center w-[500px] h-[350px] rounded-[15px] bg-[#323a49] relative md:w-[400px]">
        <p className="text-[#52ffa8] text-center mt-8">
          Advice ID: {adviceId}
        </p>
        <p className="text-center mt-12 text-white text-[28px]">
          {advice}
        </p>
        
        {/* You can add your SVG divider here if needed */}
        <div className="mt-12 flex justify-center">
          {/* SVG content */}
        </div>

        <button 
          className="rounded-full p-[10px] bg-[#52ffa8] absolute -bottom-5 cursor-pointer hover:shadow-[0_3px_8px_0_#52ffa8] transition-all duration-500"
          onClick={getAdvice}
        >
          <img src={gen} alt="Generate Advice" />
        </button>
      </div>
    </div>
  );
};

export default AdviceGenerator; 