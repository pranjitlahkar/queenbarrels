'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { Domine, Poly } from 'next/font/google';
import styles from '@/css/herotwo.module.css';

// Font configurations
const domine = Domine({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-domine',
});

const poly = Poly({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-poly',
});

const Herotwo = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const badgeRef = useRef(null);
  const headlinePrimaryRef = useRef(null);
  const headlineSecondaryRef = useRef(null);
  const subtitleRefs = useRef([]);
  const taglineRef = useRef(null);
  const buttonsRef = useRef([]);
  const floatingElementsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const background = backgroundRef.current;
    const badge = badgeRef.current;
    const headlinePrimary = headlinePrimaryRef.current;
    const headlineSecondary = headlineSecondaryRef.current;
    const tagline = taglineRef.current;

    if (!section || !container) return;

    // Set initial states (invisible)
    gsap.set([badge, headlinePrimary, headlineSecondary, tagline], {
      opacity: 0,
      y: 30,
    });
    gsap.set(subtitleRefs.current.filter(Boolean), { opacity: 0, y: 20 });
    gsap.set(buttonsRef.current.filter(Boolean), { opacity: 0, y: 25 });
    gsap.set(floatingElementsRef.current.filter(Boolean), { opacity: 0, scale: 0.8 });

    // Create main timeline
    const tl = gsap.timeline({ delay: 0.3 });

    // Animate elements in sequence
    tl.to(badge, { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" })
      .to(headlinePrimary, { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" }, "-=0.4")
      .to(headlineSecondary, { duration: 0.8, opacity: 1, y: 0, ease: "power2.out" }, "-=0.6")
      .to(subtitleRefs.current.filter(Boolean), { 
        duration: 0.6, 
        opacity: 1, 
        y: 0, 
        stagger: 0.1, 
        ease: "power2.out" 
      }, "-=0.4")
      .to(tagline, { duration: 0.6, opacity: 1, y: 0, ease: "power2.out" }, "-=0.2")
      .to(buttonsRef.current.filter(Boolean), { 
        duration: 0.6, 
        opacity: 1, 
        y: 0, 
        stagger: 0.1, 
        ease: "power2.out" 
      }, "-=0.3")
      .to(floatingElementsRef.current.filter(Boolean), { 
        duration: 1, 
        opacity: 0.4, 
        scale: 1, 
        stagger: 0.05, 
        ease: "power2.out" 
      }, "-=0.8");

    // Floating animation for decorative elements
    floatingElementsRef.current.forEach((element, index) => {
      if (element) {
        gsap.to(element, {
          y: "random(-15, 15)",
          x: "random(-10, 10)",
          rotation: "random(-5, 5)",
          duration: "random(3, 5)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
        });
      }
    });

    // Enhanced parallax effect for background (restored and improved)
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5; // Stronger effect
      const opacity = 1 - scrolled * 0.0015; // Fade effect
      
      if (background) {
        background.style.transform = `translate3d(0, ${parallax}px, 0)`;
        background.style.opacity = Math.max(opacity, 0.3);
      }

      // Parallax for floating elements (desktop only)
      if (window.innerWidth > 768) {
        floatingElementsRef.current.forEach((element, index) => {
          if (element) {
            const speed = 0.1 + (index * 0.02);
            const yPos = scrolled * speed;
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
          }
        });
      }
    };

    // Throttled scroll handler for better performance
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.heroSection} ${domine.variable} ${poly.variable}`}
    >
      {/* Background Image Container */}
      <div className={styles.backgroundContainer}>
        <Image
          ref={backgroundRef}
          src="/images/background/background.jpg"
          alt="Premium Distillery Background"
          className={styles.backgroundImage}
          fill
          sizes="100vw"
          priority
          quality={85}
        />
        <div className={styles.overlay}></div>
        <div className={styles.gradientOverlay}></div>
        <div className={styles.textureOverlay}></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className={styles.floatingElements}>
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            ref={(el) => { if (el) floatingElementsRef.current[index] = el; }}
            className={`${styles.floatingElement} ${styles[`element${index + 1}`]}`}
          />
        ))}
      </div>

      {/* Decorative Corner Elements */}
      <div className={styles.decorativeCorners}>
        <div className={styles.cornerTL}></div>
        <div className={styles.cornerTR}></div>
        <div className={styles.cornerBL}></div>
        <div className={styles.cornerBR}></div>
      </div>

      {/* Main Content Container */}
      <div ref={containerRef} className={styles.container}>
        <div className={styles.content}>
          {/* Heritage Badge */}
          <div ref={badgeRef} className={styles.heritageBadge}>
            <span className={styles.badgeText}>Est. Heritage Collection</span>
          </div>

          {/* Main Headline */}
          <h1 className={styles.mainHeadline}>
            <span ref={headlinePrimaryRef} className={styles.headlinePrimary}>
              Welcome to
            </span>
            <span ref={headlineSecondaryRef} className={styles.headlineSecondary}>
              Queen Global Barrels
            </span>
          </h1>

          {/* Content Body - Original Text Content Preserved */}
          <div className={styles.contentBody}>
            <p ref={(el) => { if (el) subtitleRefs.current[0] = el; }} className={styles.subtitleText}>
              Queen Global Barrels is the proud new daughter company of the legendary
              {' '}
              <a 
                href="https://www.sevensistersdistilleries.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.brandHighlight}
              >
                Seven Sisters Trade and Distilleries Private Limited
              </a>.
            </p>
            
            <p ref={(el) => { if (el) subtitleRefs.current[1] = el; }} className={styles.subtitleText}>
              We are honored to carry their legacy forward by stepping into the art of whiskey making.
            </p>
            
            <p ref={(el) => { if (el) subtitleRefs.current[2] = el; }} className={styles.subtitleText}>
              Our first brand launch, <span className={styles.productHighlight}>Queens Crown Whiskey</span>,
              is a tribute to our heritage—a premium spirit crafted with the same passion and
              integrity that has defined the Seven Sisters name for years.
            </p>
            
            <p ref={(el) => { if (el) subtitleRefs.current[3] = el; }} className={styles.subtitleText}>
              Taste the legacy. Welcome to Queen Global Barrels.
            </p>
          </div>

          {/* CTA Section */}
          <div className={styles.ctaSection}>
            <h2 ref={taglineRef} className={styles.tagline}>
              Experience Premium Craftsmanship in Every Drop
            </h2>
            
            <div className={styles.buttonContainer}>
              <a 
                href="/product" 
                ref={(el) => { if (el) buttonsRef.current[0] = el; }}
                className={`${styles.ctaButton} ${styles.primaryButton}`}
              >
                <span>Explore Collection</span>
                <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"/>
                </svg>
              </a>
              
              <a 
                href="/about" 
                ref={(el) => { if (el) buttonsRef.current[1] = el; }}
                className={`${styles.ctaButton} ${styles.secondaryButton}`}
              >
                <span>Our Heritage</span>
                <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 18H13V16H11V18ZM12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8S14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herotwo;
