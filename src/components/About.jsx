// components/LegacySection.jsx
'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Domine, Poly } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../css/about.module.css';

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

const About = ({ 
  backgroundImage = "/images/background/cask1.jpg",
  logo = "/images/logo/logo.png", // Company logo prop
  productImage = "/images/background/background.png" // Product image prop
}) => {
  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const productImageRef = useRef(null);
  const statsRef = useRef(null);
  const decorElementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Header animation
      tl.fromTo(headerRef.current, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      // Content stagger animation
      tl.fromTo(contentRef.current.children, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.8");

      // Product image entrance animation - simplified
      tl.fromTo(productImageRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 30
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out"
      }, "-=1");

      // Stats animation
      tl.fromTo(statsRef.current.children, {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=0.5");

      // Very subtle floating animation for product image - reduced intensity
      gsap.to(productImageRef.current, {
        y: -10, // Reduced from -20
        duration: 4, // Increased duration for slower movement
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Decorative elements floating
      decorElementsRef.current.forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            y: "random(-20, 20)",
            x: "random(-15, 15)",
            rotation: "random(-10, 10)",
            duration: "random(4, 6)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.3
          });
        }
      });

      // Parallax effect for background image
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

      // Parallax effect for decorative shapes
      gsap.to(`.${styles.backgroundShape}`, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.legacySection}>
      {/* Background Image */}
      <div className={styles.backgroundImageContainer}>
        <Image
          ref={backgroundRef}
          src={backgroundImage}
          alt="Premium distillery heritage background"
          fill
          sizes="100vw"
          className={styles.backgroundImage}
          priority={false}
          quality={90}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        {/* Reduced opacity overlays for better background visibility */}
        <div className={styles.backgroundOverlay}></div>
        <div className={styles.backgroundGradient}></div>
      </div>

      {/* Background Decorative Shapes */}
      <div className={styles.backgroundShapes}>
        <div className={`${styles.backgroundShape} ${styles.shape1}`}></div>
        <div className={`${styles.backgroundShape} ${styles.shape2}`}></div>
        <div className={`${styles.backgroundShape} ${styles.shape3}`}></div>
      </div>

      {/* Floating Decorative Elements */}
      <div className={styles.decorativeElements}>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            ref={(el) => decorElementsRef.current[index] = el}
            className={`${styles.decorElement} ${styles[`decor${index + 1}`]}`}
          ></div>
        ))}
      </div>

      <div className={styles.container}>
        {/* Header Section with Company Logo */}
        <header ref={headerRef} className={styles.header}>
          <div className={styles.logoContainer}>
            <Image
              src={logo}
              alt="Queen Global Barrels Logo"
              width={120}
              height={80}
              className={styles.companyLogo}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h2 className={`${styles.sectionTitle} ${domine.className}`}>
            <span className={styles.titleLine1}>A Legacy of</span>
            <span className={styles.titleLine2}>Excellence</span>
          </h2>
          <div className={styles.titleUnderline}></div>
        </header>

        <div className={styles.contentGrid}>
          {/* Content Section */}
          <div ref={contentRef} className={styles.content}>
            <div className={styles.foundationStory}>
              <h3 className={`${styles.storyTitle} ${domine.className}`}>
                Founded on Heritage
              </h3>
              <p className={`${styles.storyText} ${poly.className}`}>
                <strong className={styles.highlight}>Queen Global Barrels Private Limited</strong> <em>is a tribute to our mother</em>, 
                <strong className={styles.founderHighlight}> Queen Hazarika</strong>, <em>who founded Seven Sisters Trade and Distilleries</em>, 
                an exceptional manufacturing and bottling unit with over <strong className={styles.yearHighlight}>23 years of excellence</strong> <em>in the liquor industry</em>.
              </p>
            </div>

            <div className={styles.legacyContinuation}>
              <h3 className={`${styles.storyTitle} ${domine.className}`}>
                Crafting the Future
              </h3>
              <p className={`${styles.storyText} ${poly.className}`}>
                <em>Carrying forward her legacy</em>, Queen Global Barrels marks our foray into the art of quality whiskey making, 
                <em>crafted for both</em> <strong className={styles.highlight}>national and international connoisseurs</strong>. 
                Our flagship brand, <strong className={styles.brandHighlight}>Queen's Crown</strong>, <em>stands as a symbol of this enduring legacy</em>.
              </p>
            </div>

            <div className={styles.commitment}>
              <h3 className={`${styles.storyTitle} ${domine.className}`}>
                Innovation & Responsibility
              </h3>
              <p className={`${styles.storyText} ${poly.className}`}>
                <em>Committed to</em> <strong className={styles.highlight}>responsible drinking and sustainable packaging</strong>, 
                <em>we aim to blend tradition with innovation</em>. With distinctive flavours and craftsmanship, <em>our brands promise an 
                exciting future as we continue to expand our portfolio with more</em> <strong className={styles.premiumHighlight}>premium offerings</strong>.
              </p>
            </div>

            {/* Call to Action */}
            <div className={styles.ctaContainer}>
              <button className={`${styles.ctaButton} ${domine.className}`}>
                <span>Discover Our Heritage</span>
                <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Larger Product Image Section - Simplified */}
          <div className={styles.visualSection}>
            <div className={styles.productContainer}>
              {/* Larger Product Image with Subtle Animation */}
              <div ref={productImageRef} className={styles.floatingImageContainer}>
                <Image
                  src={productImage}
                  alt="Queen's Crown Premium Whiskey Bottle"
                  width={500} // Increased from 350
                  height={700} // Increased from 500
                  className={styles.productImage}
                  priority={false}
                  quality={95}
                  onError={(e) => {
                    // Fallback to placeholder if image fails
                    e.target.style.display = 'none';
                    const fallback = e.target.parentNode.querySelector('.fallback-placeholder');
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                
                {/* Fallback placeholder (hidden by default) */}
                <div className={`${styles.fallbackPlaceholder} fallback-placeholder`}>
                  <div className={styles.placeholderIcon}>🥃</div>
                  <span className={`${styles.placeholderText} ${domine.className}`}>Queen's Crown</span>
                </div>
              </div>

              {/* Reduced Glow Effects */}
              <div className={styles.glowEffects}>
                <div className={styles.glow1}></div>
                <div className={styles.glow2}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div ref={statsRef} className={styles.statsSection}>
          <div className={styles.stat}>
            <div className={`${styles.statNumber} ${domine.className}`}>23+</div>
            <div className={`${styles.statLabel} ${poly.className}`}><em>Years of Excellence</em></div>
          </div>
          <div className={styles.stat}>
            <div className={`${styles.statNumber} ${domine.className}`}>1</div>
            <div className={`${styles.statLabel} ${poly.className}`}><em>Flagship Brand</em></div>
          </div>
          <div className={styles.stat}>
            <div className={`${styles.statNumber} ${domine.className}`}>∞</div>
            <div className={`${styles.statLabel} ${poly.className}`}><em>Legacy Continues</em></div>
          </div>
          <div className={styles.stat}>
            <div className={`${styles.statNumber} ${domine.className}`}>100%</div>
            <div className={`${styles.statLabel} ${poly.className}`}><em>Premium Quality</em></div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className={styles.bottomDecor}></div>
    </section>
  );
};

export default About;
