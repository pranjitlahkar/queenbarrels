// components/QueensCrownPremium.jsx
'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Domine, Poly } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
;
import styles from '@/css/queenscrownshowcase.module.css';
import queenscrownshowcase from '@/data/queenscrownshowcase';

// Font configurations
const domine = Domine({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const poly = Poly({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  style: ['normal', 'italic'],
});

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const QueensCrownShowcase = ({ 
  backgroundImage = "/images/background/greenbg.jpg" // Default distillery background
}) => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const bottleRef = useRef(null);
  const contentRef = useRef(null);
  const backgroundRef = useRef(null);
  const decorElementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax effect
      gsap.to(backgroundRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });

      // Hero content animation
      gsap.fromTo(heroRef.current, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out"
      });

      // Bottle entrance animation
      gsap.fromTo(bottleRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 60
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.8,
        delay: 0.3,
        ease: "power3.out"
      });

      // Content animation
      gsap.fromTo(contentRef.current, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.6,
        ease: "power3.out"
      });

      // Subtle bottle floating
      gsap.to(bottleRef.current, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Decorative elements animation
      decorElementsRef.current.forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            y: `random(-25, 25)`,
            x: `random(-20, 20)`,
            rotation: `random(-15, 15)`,
            duration: `random(6, 10)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.8
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.premiumSection}>
      {/* Background Image */}
      <div className={styles.backgroundContainer}>
        <Image
          ref={backgroundRef}
          src={backgroundImage}
          alt="Premium distillery background"
          fill
          sizes="100vw"
          className={styles.backgroundImage}
          priority={false}
          quality={85}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className={styles.backgroundOverlay}></div>
        <div className={styles.backgroundGradient}></div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorativeBackground} aria-hidden="true">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            ref={(el) => decorElementsRef.current[index] = el}
            className={`${styles.decorElement} ${styles[`decor${index + 1}`]}`}
          ></div>
        ))}
      </div>

      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <header ref={heroRef} className={styles.heroHeader}>
                <h1 className={`${styles.title} ${domine.className}`}>
                  {queenscrownshowcase.hero.title}
                </h1>
                <h2 className={`${styles.subtitle} ${domine.className}`}>
                  {queenscrownshowcase.hero.subtitle}
                </h2>
              </header>
            </div>

            <div className={styles.heroImage}>
              <div ref={bottleRef} className={styles.bottleContainer}>
                <div className={styles.bottleGlow}></div>
                <Image
                  src={queenscrownshowcase.images.bottle}
                  alt="Queen's Crown Premium Whiskey Bottle"
                  width={400}
                  height={600}
                  className={styles.bottleImage}
                  priority
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.parentNode.querySelector('.bottle-fallback');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                
                <div className={`${styles.bottleFallback} bottle-fallback`}>
                  <div className={styles.fallbackIcon}>👑</div>
                  <span className={styles.fallbackText}>Queen's Crown</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div ref={contentRef} className={styles.contentSection}>
          <div className={styles.contentContainer}>
            <p className={`${styles.mainContent} ${poly.className}`}>
              <em>{queenscrownshowcase.content}</em>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className={styles.bottomDecor} aria-hidden="true"></div>
    </section>
  );
};

export default QueensCrownShowcase;

