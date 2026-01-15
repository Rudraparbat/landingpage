import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export const BackgroundBeams = () => {
  const [beams, setBeams] = useState({ vertical: [], stars: [] });

  useEffect(() => {
    // Generate random values only once on mount
    const vertical = [...Array(4)].map((_, i) => ({
      id: i,
      left: `${20 + i * 20 + (Math.random() * 10 - 5)}%`, // Distribute across width roughly: 20%, 40%, 60%, 80% +/- jitter
      delay: i * 2,
      duration: Math.random() * 5 + 5 // 5-10s duration
    }));

    const stars = [...Array(5)].map((_, i) => ({
      id: i,
      initialY: Math.random() * 400,
      initialX: Math.random() * -100,
      targetY: Math.random() * 400 + (Math.random() > 0.5 ? 100 : -100),
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 5,
      top: `${Math.random() * 100}%`
    }));

    setBeams({ vertical, stars });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl z-0">
       {/* Ambient Gradient Background */}
       <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-slate-50/50 dark:from-blue-900/10 dark:via-transparent dark:to-slate-900/10 opacity-50" />
       
       {/* Central Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-400/5 blur-[80px] rounded-full mix-blend-multiply dark:mix-blend-screen" />

       {/* Animated Beams Container */}
       <div className="absolute inset-0">
          {/* Vertical Lines (Up to Down) */}
          {beams.vertical.map((beam) => (
            <motion.div
              key={`vert-${beam.id}`}
              initial={{ 
                opacity: 0,
                y: -300, // Start above the container
                rotate: -15, // Slight tilt
                x: 0
              }}
              animate={{ 
                opacity: [0, 1, 0],
                y: "1000px", // Move well below
                x: 100 // Drift right to match the tilt angle
              }}
              transition={{ 
                duration: beam.duration,
                repeat: Infinity,
                delay: beam.delay,
                ease: "linear"
              }}
              style={{ left: beam.left }}
              className="absolute top-0 w-[2px] h-[300px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"
            />
          ))}

          {/* Shooting Stars / Thin Beams */}
          {beams.stars.map((beam) => (
            <motion.div
              key={`star-${beam.id}`}
              initial={{ 
                opacity: 0,
                x: beam.initialX, 
                y: beam.initialY
              }}
              animate={{ 
                opacity: [0, 1, 0],
                x: "120%", 
                y: beam.targetY
              }}
              transition={{ 
                duration: beam.duration,
                repeat: Infinity,
                delay: beam.delay,
                ease: "easeInOut"
              }}
              className="absolute left-0 h-px w-[100px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              style={{ top: beam.top }}
            />
          ))}
       </div>
    </div>
  );
};

export default BackgroundBeams;
