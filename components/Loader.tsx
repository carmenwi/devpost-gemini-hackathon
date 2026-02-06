
import React from 'react';
import { BrainCircuitIcon } from './Icons';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <BrainCircuitIcon className="w-20 h-20 text-cyan-500 animate-pulse mb-6" />
      <h3 className="text-xl font-semibold text-white mb-2">AI is Thinking...</h3>
      <p className="text-slate-400">{message}</p>
    </div>
  );
};

export default Loader;
