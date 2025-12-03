'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Linkedin, MapPin, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { FadeInUp } from '../animations';
import { SectionTypewriter } from '../animations/SectionTypewriter';

const team = [
  {
    name: 'Giorgio Barbaglia',
    role: 'Co-Founder & Partner',
    bio: 'Entrepreneur and innovator with solid experience in building and growing tech and industrial companies. Founder of SBS S.p.a. and co-owner of Nuova Fina Group S.p.a.',
    image: '/images/Giorgio-Barbaglia.jpeg',
    linkedin: '#',
    tag: 'Industrial Vision',
  },
  {
    name: "Riccardo D'Iglio",
    role: 'Co-Founder & Innovation Manager',
    bio: 'Tech business advisor and innovation designer, focused on AI and exponential technologies. Founder of LiftyUp. Experience in corporate, venture building and startup mentorship.',
    image: '/images/Riccardo-D_Iglio.jpeg',
    linkedin: '#',
    tag: 'Tech & AI',
  },
  {
    name: 'Luca Bertolino',
    role: 'Scientific Advisor',
    bio: 'Agronomist with over 20 years of experience as an entrepreneur and researcher. Recognized expert in sustainable agronomy and precision food.',
    image: '/images/Luca Bertolino.jpeg',
    linkedin: '#',
    tag: 'Scientific Advisory',
  },
];

const locations = [
  { country: 'Italy', cities: 'Milan, Rome and key innovation ecosystems' },
  { country: 'United Kingdom', cities: 'London, Manchester and partner hubs' },
];

// Hook per rilevare dispositivi touch
function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    checkTouch();
  }, []);

  return isTouch;
}

// 3D Tilt Card Component with touch awareness
function FounderCard({ member, index }: { member: typeof team[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const isTouch = useIsTouchDevice();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disabilita 3D tilt su touch devices
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    // Su touch devices, usa click per espandere
    if (isTouch) {
      setIsExpanded(!isExpanded);
    }
  };

  // Mostra contenuto espanso se hover (desktop) o expanded (mobile)
  const showExpanded = isTouch ? isExpanded : isHovered;

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isTouch && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        perspective: isTouch ? undefined : 1000,
      }}
    >
      <motion.div
        className="relative h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[400px] sm:min-h-[450px] md:min-h-[500px] max-h-[700px] w-full overflow-hidden rounded-2xl sm:rounded-[1.5rem] md:rounded-[2rem]"
        style={{
          // Disabilita effetto 3D su touch devices
          rotateX: !isTouch && isHovered ? rotateX : 0,
          rotateY: !isTouch && isHovered ? rotateY : 0,
          transformStyle: isTouch ? undefined : 'preserve-3d',
        }}
        transition={{ duration: 0.1 }}
      >
        {/* Image */}
        <div className="absolute inset-0">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
        </div>

        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(
              to top,
              rgba(0, 0, 0, 0.95) 0%,
              rgba(0, 0, 0, 0.7) 30%,
              rgba(0, 0, 0, 0.2) 60%,
              transparent 100%
            )`,
          }}
        />

        {/* Accent Line Animation */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: 'var(--accent-gradient)',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: showExpanded ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Tag Badge */}
        <motion.div
          className="absolute top-4 sm:top-5 md:top-6 left-4 sm:left-5 md:left-6 z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
        >
          <div 
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider backdrop-blur-md"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
            }}
          >
            {member.tag}
          </div>
        </motion.div>

        {/* Tap indicator on mobile */}
        {isTouch && !isExpanded && (
          <motion.div 
            className="absolute top-4 right-4 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-[10px] text-white/60 font-mono uppercase tracking-wider">
              Tap to expand
            </span>
          </motion.div>
        )}

        {/* Content */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 z-10"
          style={{ transform: isTouch ? undefined : 'translateZ(40px)' }}
        >
          {/* Role */}
          <motion.p
            className="text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 tracking-wide"
            style={{ color: 'var(--accent-synxay)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showExpanded ? 1 : 0.7, y: showExpanded ? 0 : 10 }}
            transition={{ duration: 0.4 }}
          >
            {member.role}
          </motion.p>

          {/* Name */}
          <motion.h3
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            }}
          >
            {member.name}
          </motion.h3>

          {/* Bio - appears on hover (desktop) or tap (mobile) */}
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: showExpanded ? 'auto' : 0, 
              opacity: showExpanded ? 1 : 0 
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 max-w-md">
              {member.bio}
            </p>

            {/* LinkedIn Button */}
            <motion.a
              href={member.linkedin}
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300"
              style={{
                background: 'var(--accent-gradient)',
                color: 'white',
              }}
              whileHover={{ scale: isTouch ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.a>
          </motion.div>
        </div>

        {/* Hover Glow Effect - solo desktop */}
        {!isTouch && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[2rem]"
            style={{
              boxShadow: isHovered 
                ? '0 0 80px rgba(79, 249, 222, 0.3), inset 0 0 80px rgba(79, 249, 222, 0.05)'
                : '0 0 0px rgba(79, 249, 222, 0)',
            }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export function TeamSection() {
  return (
    <section id="team" className="section relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-32">
      {/* Clean elegant background */}
      <div className="absolute inset-0">
        {/* Subtle top gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)',
          }}
        />
        
        {/* Animated diagonals */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 100px,
              rgba(255, 255, 255, 0.006) 100px,
              rgba(255, 255, 255, 0.006) 101px
            )`,
          }}
          animate={{
            backgroundPosition: ['0px 0px', '200px 200px'],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20 max-w-4xl mx-auto">
          <FadeInUp>
            <motion.span 
              className="eyebrow mb-4 sm:mb-6 inline-flex items-center gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="w-8 sm:w-12 h-[2px]" style={{ background: 'var(--accent-gradient)' }} />
              Team
              <span className="w-8 sm:w-12 h-[2px]" style={{ background: 'var(--accent-gradient)' }} />
            </motion.span>
          </FadeInUp>
          
          <FadeInUp delay={0.1}>
            <SectionTypewriter 
              text="Founders, venture partners & scientific network"
              highlightWords={['scientific', 'network']}
              className="mb-6 sm:mb-8"
            />
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto px-4">
              Fyndiax is led by entrepreneurs and venture architects, connected 
              with a growing network of researchers, labs and industry experts 
              across Italy and the UK.
            </p>
          </FadeInUp>
        </div>

        {/* Founders Grid - Layout 2+1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8 lg:mb-12">
          {/* Prime due card */}
          {team.slice(0, 2).map((member, index) => (
            <FounderCard key={member.name} member={member} index={index} />
          ))}
        </div>
        
        {/* Terza card centrata */}
        <div className="flex justify-center mb-16 sm:mb-20 md:mb-24">
          <div className="w-full md:w-1/2 lg:w-[45%]">
            <FounderCard member={team[2]} index={2} />
          </div>
        </div>

        {/* Locations Section - Global Presence */}
        <FadeInUp delay={0.3}>
          <motion.div 
            className="relative max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main Container with dramatic styling */}
            <div 
              className="relative rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(10, 15, 28, 0.95) 0%, rgba(15, 20, 35, 0.98) 100%)',
                border: '1px solid rgba(79, 249, 222, 0.15)',
                boxShadow: '0 0 100px rgba(79, 249, 222, 0.08), inset 0 0 60px rgba(79, 249, 222, 0.03)',
              }}
            >
              {/* Animated Grid Background */}
              <div className="absolute inset-0">
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(79, 249, 222, 0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(79, 249, 222, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                />
                {/* Radial glow from center */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] sm:h-[400px] opacity-30"
                  style={{
                    background: 'radial-gradient(ellipse, rgba(79, 249, 222, 0.15) 0%, transparent 70%)',
                  }}
                />
              </div>

              <div className="relative z-10 p-5 sm:p-6 md:p-10 lg:p-16">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-10 md:mb-14">
                  <motion.div
                    className="inline-flex items-center gap-4 mb-4 sm:mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="relative"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <div 
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(79, 249, 222, 0.2) 0%, rgba(177, 131, 255, 0.2) 100%)',
                          border: '2px solid rgba(79, 249, 222, 0.3)',
                          boxShadow: '0 0 30px rgba(79, 249, 222, 0.3)',
                        }}
                      >
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" style={{ color: 'var(--accent-synxay)' }} />
                      </div>
                      {/* Orbiting dots */}
                      <motion.div 
                        className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                        style={{ 
                          background: 'var(--accent-kirevya)',
                          top: '-3px',
                          left: '50%',
                          marginLeft: '-3px',
                          boxShadow: '0 0 10px rgba(177, 131, 255, 0.8)',
                        }}
                      />
                    </motion.div>
                  </motion.div>
                  
                  <motion.h4 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-2 sm:mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    Global Presence
                  </motion.h4>
                  
                  <motion.div
                    className="w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full"
                    style={{ background: 'var(--accent-gradient)' }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>

                {/* Location Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                  {locations.map((location, index) => (
                    <motion.div
                      key={location.country}
                      className="relative group"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.3 + index * 0.2 }}
                    >
                      {/* Card */}
                      <div 
                        className="relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 md:group-hover:scale-[1.02]"
                        style={{
                          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                          border: `1px solid ${index === 0 ? 'rgba(79, 249, 222, 0.2)' : 'rgba(177, 131, 255, 0.2)'}`,
                          boxShadow: index === 0 
                            ? '0 0 40px rgba(79, 249, 222, 0.08)' 
                            : '0 0 40px rgba(177, 131, 255, 0.08)',
                        }}
                      >
                        {/* Animated border gradient on hover */}
                        <motion.div
                          className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: index === 0
                              ? 'linear-gradient(135deg, rgba(79, 249, 222, 0.1) 0%, transparent 50%, rgba(79, 249, 222, 0.05) 100%)'
                              : 'linear-gradient(135deg, rgba(177, 131, 255, 0.1) 0%, transparent 50%, rgba(177, 131, 255, 0.05) 100%)',
                          }}
                        />

                        {/* Country Flag/Icon Area */}
                        <div className="flex items-start gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5">
                          <div className="relative">
                            {/* Pulsing beacon */}
                            <motion.div
                              className="absolute inset-0 rounded-lg sm:rounded-xl"
                              style={{
                                background: index === 0 
                                  ? 'rgba(79, 249, 222, 0.3)' 
                                  : 'rgba(177, 131, 255, 0.3)',
                              }}
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5],
                              }}
                              transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: index * 0.3,
                              }}
                            />
                            <div 
                              className="relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl flex items-center justify-center"
                              style={{
                                background: index === 0 
                                  ? 'linear-gradient(135deg, rgba(79, 249, 222, 0.2) 0%, rgba(79, 249, 222, 0.05) 100%)'
                                  : 'linear-gradient(135deg, rgba(177, 131, 255, 0.2) 0%, rgba(177, 131, 255, 0.05) 100%)',
                                border: `1px solid ${index === 0 ? 'rgba(79, 249, 222, 0.3)' : 'rgba(177, 131, 255, 0.3)'}`,
                              }}
                            >
                              <span className="text-xl sm:text-2xl">
                                {index === 0 ? '🇮🇹' : '🇬🇧'}
                              </span>
                            </div>
                          </div>

                          <div className="flex-1">
                            <h5 
                              className="text-lg sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1"
                              style={{ 
                                color: index === 0 ? 'var(--accent-synxay)' : 'var(--accent-kirevya)',
                              }}
                            >
                              {location.country}
                            </h5>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <motion.div
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                                style={{
                                  background: index === 0 ? 'var(--accent-synxay)' : 'var(--accent-kirevya)',
                                  boxShadow: index === 0 
                                    ? '0 0 8px rgba(79, 249, 222, 0.8)'
                                    : '0 0 8px rgba(177, 131, 255, 0.8)',
                                }}
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-text-muted font-medium">
                                Active Hub
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Cities */}
                        <div 
                          className="p-3 sm:p-4 rounded-lg sm:rounded-xl"
                          style={{
                            background: 'rgba(0, 0, 0, 0.2)',
                            border: '1px solid rgba(255, 255, 255, 0.03)',
                          }}
                        >
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                            <div 
                              className="w-1 h-3 sm:h-4 rounded-full"
                              style={{
                                background: index === 0 
                                  ? 'var(--accent-synxay)' 
                                  : 'var(--accent-kirevya)',
                              }}
                            />
                            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-text-muted">
                              Key Locations
                            </span>
                          </div>
                          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                            {location.cities}
                          </p>
                        </div>

                        {/* Corner accent */}
                        <div 
                          className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 opacity-30"
                          style={{
                            background: index === 0 
                              ? 'radial-gradient(circle at top right, rgba(79, 249, 222, 0.3), transparent 70%)'
                              : 'radial-gradient(circle at top right, rgba(177, 131, 255, 0.3), transparent 70%)',
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom text with network visualization */}
                <motion.div 
                  className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 text-center relative"
                  style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {/* Decorative nodes - fewer on mobile */}
                  <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-3 sm:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${i > 2 ? 'hidden sm:block' : ''}`}
                        style={{
                          background: i % 2 === 0 ? 'var(--accent-synxay)' : 'var(--accent-kirevya)',
                          opacity: 0.6,
                        }}
                        animate={{
                          y: [0, -5, 0],
                          opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-text-muted text-xs sm:text-sm tracking-wide px-4">
                    Connected to European and global scientific and venture networks
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </FadeInUp>
      </div>
    </section>
  );
}

export default TeamSection;
