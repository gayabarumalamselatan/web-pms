'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollAnimation } from './ui/scroll-animation'

interface MemberCardProps {
  name: string
  position: string
  image: string
  index: number
}

export function MemberCard({ name, position, image, index }: MemberCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <ScrollAnimation
      delay={(index % 3) * 0.1}
      direction="up"
      amount={40}
      className="group"
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative border-4 border-black bg-white transition-all duration-300 transform hover:translate-x-[-8px] hover:translate-y-[-8px] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] aspect-[4/5] flex flex-col overflow-hidden"
      >
        {/* Grayscale on Default, Color on Hover */}
        <div className="relative w-full h-[70%] border-b-4 border-black bg-gray-100 overflow-hidden">
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
              isHovered ? 'grayscale-0 scale-105 rotate-1' : 'grayscale'
            }`}
          />
          {/* Brutalist Tag */}
          <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest z-20">
            ACTIVE MEMBER
          </div>
        </div>

        {/* Info Container */}
        <div className="flex-grow p-6 flex flex-col justify-center items-center text-center bg-white relative z-10 group-hover:bg-primary transition-colors duration-300">
          <h3 className={`text-2xl font-black uppercase tracking-tighter leading-tight mb-1 transition-colors ${isHovered ? 'text-white' : 'text-black'}`}>
            {name}
          </h3>
          <p className={`text-xs font-black uppercase tracking-[0.2em] transition-colors ${isHovered ? 'text-yellow-300' : 'text-primary'}`}>
            {position}
          </p>
          
          {/* Decorative bar */}
          <div className={`w-12 h-2 bg-secondary mt-4 transition-all duration-500 transform ${isHovered ? 'scale-x-150 rotate-3' : 'scale-x-100'}`} />
        </div>

        {/* Corner Accent */}
        <div className={`absolute bottom-0 right-0 w-8 h-8 bg-black transition-transform duration-300 translate-x-4 translate-y-4 ${isHovered ? 'translate-x-0 translate-y-0' : ''}`} />
      </div>
    </ScrollAnimation>
  )
}
