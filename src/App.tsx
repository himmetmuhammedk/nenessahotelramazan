/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Calendar, ChevronLeft, ChevronRight, Info, UtensilsCrossed } from 'lucide-react';

// Menu data - 13 items as requested
const MENU_IMAGES = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  title: `Menü ${i + 1}`,
  description: "Çorba, Ana Yemek, Pilav, Tatlı ve İftariyelikler",
  url: `https://picsum.photos/seed/nenessa-menu-${i + 1}/800/1200`, // Placeholders
}));

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    })
  };

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < MENU_IMAGES.length) {
      setDirection(newDirection);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-amber-500/30 flex flex-col">
      {/* Immersive Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px]" />
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]" />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-6 pb-2 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <img 
            src="https://res.cloudinary.com/dejx0brol/image/upload/v1772106400/Ads%C4%B1z_tasar%C4%B1m_4_dpyzf2.png" 
            alt="Nenessa Hotel Logo" 
            className="h-16 w-auto object-contain mb-2"
            referrerPolicy="no-referrer"
          />
          <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-[0.3em]">
            Ramazan Ayı İftar Menüleri
          </p>
        </motion.div>
      </header>

      {/* Main Menu Slider */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center py-2 overflow-hidden">
        <div className="relative w-full max-w-[95vw] sm:max-w-lg aspect-[3/4.8] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 260, damping: 30 },
                opacity: { duration: 0.3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50 && currentIndex < MENU_IMAGES.length - 1) {
                  paginate(1);
                } else if (swipe > 50 && currentIndex > 0) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 w-full h-full p-2 touch-none"
            >
              <div className="w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] bg-slate-900 relative group">
                <img
                  src={MENU_IMAGES[currentIndex].url}
                  alt={MENU_IMAGES[currentIndex].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Day Badge */}
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-amber-400 text-sm font-bold shadow-lg">
                  MENÜ {currentIndex + 1}
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/60 to-transparent p-8 pt-20">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`text-${currentIndex}`}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl font-serif font-bold text-white mb-2">
                      {MENU_IMAGES[currentIndex].title}
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {MENU_IMAGES[currentIndex].description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Desktop Navigation Arrows */}
          <div className="hidden sm:block absolute inset-y-0 -left-16 flex items-center z-20">
            <button
              onClick={() => paginate(-1)}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 transition-all active:scale-90 ${
                currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-amber-500 hover:text-black'
              }`}
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="hidden sm:block absolute inset-y-0 -right-16 flex items-center z-20">
            <button
              onClick={() => paginate(1)}
              disabled={currentIndex === MENU_IMAGES.length - 1}
              className={`p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 transition-all active:scale-90 ${
                currentIndex === MENU_IMAGES.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-amber-500 hover:text-black'
              }`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8 px-6 w-full overflow-x-auto no-scrollbar py-2">
          {MENU_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 transition-all duration-300 rounded-full shrink-0 ${
                idx === currentIndex ? 'w-10 bg-amber-500' : 'w-2 bg-white/10 hover:bg-white/30'
              }`}
            />
          ))}
        </div>
      </main>

      {/* Footer / Call to Action */}
      <footer className="relative z-10 px-6 pb-6 pt-2">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-center gap-4 text-slate-500">
             <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-emerald-500" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Ramazan 2026</span>
             </div>
             <div className="h-3 w-px bg-white/10" />
             <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-amber-500" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Aksaray</span>
             </div>
          </div>

          <motion.a
            href="tel:+905321308368"
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center justify-between w-full p-4 rounded-[1.2rem] bg-gradient-to-br from-amber-400 to-amber-600 text-black font-bold shadow-[0_15px_30px_-10px_rgba(245,158,11,0.3)] group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-black/10">
                <Phone size={20} fill="currentColor" />
              </div>
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-[0.2em] text-black/60 font-black">Rezervasyon & İletişim</p>
                <p className="text-lg tracking-tight">+90 532 130 83 68</p>
              </div>
            </div>
            <div className="p-2 rounded-full bg-black/5 group-hover:bg-black/10 transition-colors">
              <ChevronRight size={20} />
            </div>
          </motion.a>

          <div className="text-center">
            <p className="text-[10px] text-slate-500 font-medium flex items-center justify-center gap-2">
              <Info size={12} className="text-amber-500/50" /> 
              Menüleri görmek için ekranı kaydırın
            </p>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 640px) {
          .aspect-[3/4.5] {
            aspect-ratio: 3/4.8;
          }
        }
      `}} />
    </div>
  );
}
