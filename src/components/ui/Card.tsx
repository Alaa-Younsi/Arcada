import { motion } from 'framer-motion';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, borderColor: '#FF0000' } : {}}
      onClick={onClick}
      className={`bg-[#0d0d0d] border border-[#1a1a1a] transition-shadow ${
        hover ? 'cursor-pointer hover:shadow-[0_0_20px_rgba(255,0,0,0.18)]' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
