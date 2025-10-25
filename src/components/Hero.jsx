// components/HeroSection.jsx
'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Domine, Poly, Lato } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/css/hero.module.css';

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
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
});

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
  const heroRef = useRef(null);
  const backgroundRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const badgeRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create entrance timeline with proper visibility
      const tl = gsap.timeline({ delay: 0.3 });

      // Badge entrance
      tl.fromTo(badgeRef.current, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Title entrance with stagger
      tl.fromTo(titleRef.current.children, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.5");

      // Description entrance
      tl.fromTo(descriptionRef.current.children, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      }, "-=0.8");

      // Tagline and buttons
      tl.fromTo(subtitleRef.current, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.5");

      tl.fromTo(buttonsRef.current.children, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.3");

      // Smooth parallax effect for background (no blur)
      gsap.to(backgroundRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      });

      // Subtle content parallax
      gsap.to(contentRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2
        }
      });

      // Floating particles animation
      particlesRef.current.forEach((particle, index) => {
        if (particle) {
          gsap.to(particle, {
            y: "random(-30, 30)",
            x: "random(-20, 20)",
            rotation: "random(-10, 10)",
            duration: "random(4, 8)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3
          });
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className={styles.heroSection}>
      {/* Background Image Container */}
      <div className={styles.backgroundContainer}>
        <img
          ref={backgroundRef}
          src="/images/background/background.jpg"
          alt="Aged whiskey barrels in a rustic cellar"
          className={styles.backgroundImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/1920x1080/4F4C47/FFFFFF?text=Queen+Global+Barrels';
          }}
        />
        
        {/* Multi-layered Overlay */}
        <div className={styles.overlay}></div>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.textureOverlay}></div>
      </div>

      {/* Floating Particles */}
      <div className={styles.floatingElements}>
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            ref={(el) => particlesRef.current[index] = el}
            className={`${styles.floatingElement} ${styles[`element${index + 1}`]}`}
          ></div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          {/* Premium Badge */}
          <div ref={badgeRef} className={styles.heritageBadge}>
            <span className={`${styles.badgeText} ${lato.className}`}>
              Heritage Since Seven Sisters
            </span>
          </div>

          {/* Main Headline */}
          <h1 ref={titleRef} className={`${styles.mainHeadline} ${domine.className}`}>
            <span className={styles.headlinePrimary}>Honoring Tradition.</span>
            <span className={styles.headlineSecondary}>Crafting the Future.</span>
          </h1>

          {/* Heritage Description */}
          <div ref={descriptionRef} className={styles.contentBody}>
            <p className={`${styles.subtitleText} ${poly.className}`}>
              Queen Global Barrels is the proud new daughter company of the legendary 
              <strong className={styles.brandHighlight}> Seven Sisters Trade and Distilleries Private Limited</strong>. 
              We are honored to carry their legacy forward by stepping into the art of whiskey making.
            </p>
            
            <p className={`${styles.subtitleText} ${poly.className}`}>
              Our first brand launch, <strong className={styles.productHighlight}>Queens Crown Whiskey</strong>, 
              is a tribute to our heritage—a premium spirit crafted with the same passion and 
              integrity that has defined the Seven Sisters name for years.
            </p>
          </div>

          {/* Tagline and CTA Section */}
          <div className={styles.ctaSection}>
            <p ref={subtitleRef} className={`${styles.tagline} ${lato.className}`}>
              Taste the legacy. Welcome to Queen Global Barrels.
            </p>
            
            <div ref={buttonsRef} className={styles.buttonContainer}>
              <Link 
                href="#discover" 
                className={`${styles.ctaButton} ${styles.primaryButton} ${lato.className}`}
              >
                <span>Discover Queens Crown</span>
                <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </Link>
              
              <Link 
                href="#heritage" 
                className={`${styles.ctaButton} ${styles.secondaryButton} ${lato.className}`}
              >
                Our Heritage
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorativeCorners}>
        <div className={styles.cornerTL}></div>
        <div className={styles.cornerTR}></div>
        <div className={styles.cornerBL}></div>
        <div className={styles.cornerBR}></div>
      </div>
    </section>
  );
};

export default HeroSection;
