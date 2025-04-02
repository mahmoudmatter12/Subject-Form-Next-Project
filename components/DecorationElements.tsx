// components/DecorationElements.tsx
import React from 'react'

function DecorationElements() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Vertical gradient elements */}
      <div className="absolute top-0 left-1/4 w-64 h-full bg-gradient-to-b from-indigo-500/10 to-transparent"></div>
      <div className="absolute top-0 right-1/4 w-64 h-full bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
      
      {/* Circular elements distributed vertically */}
      <div className="absolute top-1/4 -right-16 w-72 h-72 rounded-full bg-white/5"></div>
      <div className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-white/5"></div>
      <div className="absolute bottom-1/4 -right-24 w-64 h-64 rounded-full bg-white/5"></div>
      
      {/* Diagonal line pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_95%,_rgba(255,255,255,0.05)_95%)]"></div>
    </div>
  )
}

export default DecorationElements