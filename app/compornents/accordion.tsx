"use client"

import { useState } from 'react'

interface AccordionProps {
  title: string;
  colorStyle: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function Accordion({
  title,
  colorStyle,
  defaultOpen = false,
  children
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)} className={`text-2xl font-bold ${colorStyle} bg-slate-800 px-4 my-2 cursor-pointer select-none`}>
        <span>{isOpen ? "-" : "+"} {title}</span>
      </div>
      {isOpen && (
        <div className="p-4 text-gray-300">
          {children}
        </div>
      )}
    </div>
  );
}