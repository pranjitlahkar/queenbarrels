// components/QueensCrownProduct.jsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Domine, Poly } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import queensCrownProduct from '@/data/queenscrown';
import styles from '@/css/product.module.css';

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

// Tasting Notes Interactive Component
const TastingExperience = () => {
  const [activeNote, setActiveNote] = useState('appearance');
  const tastingRef = useRef(null);
  const controlsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(tastingRef.current, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: tastingRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
    }, tastingRef);

    return () => ctx.revert();
  }, []);

  const tastingData = queensCrownProduct.tastingNotes;

  return (
    <section ref={tastingRef} className={styles.tastingSection}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2 className={`${styles.sectionTitle} ${domine.className}`}>
            {tastingData.title}
          </h2>
          <p className={`${styles.sectionSubtitle} ${poly.className}`}>
            <em>{tastingData.subtitle}</em>
          </p>
        </header>

        <div className={styles.tastingExperience}>
          <div className={styles.tastingControls}>
            {Object.entries(tastingData.notes).map(([key, note], index) => (
              <button
                key={key}
                ref={(el) => controlsRef.current[index] = el}
                className={`${styles.tastingButton} ${activeNote === key ? styles.active : ''} ${domine.className}`}
                onClick={() => setActiveNote(key)}
              >
                <span className={styles.buttonText}>{note.title}</span>
                <div className={styles.buttonIndicator}></div>
              </button>
            ))}
          </div>

          <div className={styles.tastingDisplay}>
            <div className={styles.tastingCard}>
              {tastingData.notes[activeNote].color && (
                <div 
                  className={styles.colorSwatch}
                  style={{ backgroundColor: tastingData.notes[activeNote].color }}
                ></div>
              )}
              <h3 className={`${styles.noteTitle} ${domine.className}`}>
                {tastingData.notes[activeNote].title}
              </h3>
              <p className={`${styles.noteDescription} ${poly.className}`}>
                <em>{tastingData.notes[activeNote].description}</em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Product Component
const QueensCrownProduct = () => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const bottleRef = useRef(null);
  const contentRef = useRef(null);
  const sectionsRef = useRef([]);
  const decorElementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(contentRef.current, {
        opacity: 0,
        x: -60
      }, {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power3.out"
      });

      gsap.fromTo(bottleRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 50
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.8,
        delay: 0.4,
        ease: "power3.out"
      });

      // Elegant floating animation for bottle
      gsap.to(bottleRef.current, {
        y: -20,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Rotation effect on hover-like behavior
      gsap.to(bottleRef.current, {
        rotationY: 5,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Section animations
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          gsap.fromTo(section, {
            opacity: 0,
            y: 60
          }, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });

      // Decorative elements animation
      decorElementsRef.current.forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            y: "random(-30, 30)",
            x: "random(-25, 25)",
            rotation: "random(-20, 20)",
            duration: "random(8, 12)",
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
    <div ref={sectionRef} className={styles.productPage}>
      {/* Background Decorative Elements */}
      <div className={styles.decorativeBackground} aria-hidden="true">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            ref={(el) => decorElementsRef.current[index] = el}
            className={`${styles.decorElement} ${styles[`decor${index + 1}`]}`}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className={styles.productHero}>
        <div className={styles.heroContainer}>
          <div ref={contentRef} className={styles.heroContent}>
            <div className={styles.productBadge}>
              <span className={`${styles.badgeText} ${poly.className}`}>
                <em>Premium Collection</em>
              </span>
            </div>
            
            <h1 className={`${styles.productName} ${domine.className}`}>
              {queensCrownProduct.hero.productName}
            </h1>
            
            <h2 className={`${styles.productTagline} ${domine.className}`}>
              {queensCrownProduct.hero.tagline}
            </h2>
            
            <p className={`${styles.productSubtitle} ${poly.className}`}>
              <em>{queensCrownProduct.hero.subtitle}</em>
            </p>
            
            <p className={`${styles.heroDescription} ${poly.className}`}>
              <em>{queensCrownProduct.hero.description}</em>
            </p>

            {/* Elegant Specs Display */}
            <div className={styles.productSpecs}>
              <div className={styles.specGroup}>
                <div className={styles.spec}>
                  <span className={styles.specIcon}>🍯</span>
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Alcohol</span>
                    <span className={styles.specValue}>{queensCrownProduct.product.abv}</span>
                  </div>
                </div>
                <div className={styles.spec}>
                  <span className={styles.specIcon}>🍷</span>
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Volume</span>
                    <span className={styles.specValue}>{queensCrownProduct.product.volume}</span>
                  </div>
                </div>
                <div className={styles.spec}>
                  <span className={styles.specIcon}>⏳</span>
                  <div className={styles.specContent}>
                    <span className={styles.specLabel}>Maturation</span>
                    <span className={styles.specValue}>{queensCrownProduct.product.age}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Bottle Display */}
          <div ref={bottleRef} className={styles.heroBottle}>
            <div className={styles.bottleContainer}>
              <div className={styles.bottleGlow}></div>
              <Image
                src={queensCrownProduct.product.bottleImage}
                alt="Queen's Crown Premium Whiskey Bottle"
                width={450}
                height={650}
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

              {/* Floating Elements around bottle */}
              <div className={styles.bottleEffects}>
                <div className={styles.floatingParticle} style={{top: '10%', left: '10%'}}></div>
                <div className={styles.floatingParticle} style={{top: '20%', right: '15%'}}></div>
                <div className={styles.floatingParticle} style={{bottom: '30%', left: '5%'}}></div>
                <div className={styles.floatingParticle} style={{bottom: '20%', right: '10%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.mainContent}>
        {/* Product Story */}
        <section 
          ref={(el) => sectionsRef.current[0] = el}
          className={styles.storySection}
        >
          <div className={styles.container}>
            <div className={styles.storyContent}>
              <h2 className={`${styles.sectionTitle} ${domine.className}`}>
                {queensCrownProduct.story.title}
              </h2>
              <p className={`${styles.storyText} ${poly.className}`}>
                <em>{queensCrownProduct.story.content}</em>
              </p>
            </div>
          </div>
        </section>

        {/* Crafting Process */}
        <section 
          ref={(el) => sectionsRef.current[1] = el}
          className={styles.craftingSection}
        >
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <h2 className={`${styles.sectionTitle} ${domine.className}`}>
                {queensCrownProduct.craftingProcess.title}
              </h2>
              <p className={`${styles.sectionSubtitle} ${poly.className}`}>
                <em>{queensCrownProduct.craftingProcess.subtitle}</em>
              </p>
            </header>

            <div className={styles.processGrid}>
              {queensCrownProduct.craftingProcess.steps.map((step, index) => (
                <div key={index} className={styles.processCard}>
                  <div className={styles.processIcon}>{step.icon}</div>
                  <h3 className={`${styles.processTitle} ${domine.className}`}>
                    {step.title}
                  </h3>
                  <p className={`${styles.processDescription} ${poly.className}`}>
                    <em>{step.description}</em>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tasting Experience */}
        <TastingExperience />

        {/* Serving Suggestions */}
        <section 
          ref={(el) => sectionsRef.current[2] = el}
          className={styles.servingSection}
        >
          <div className={styles.container}>
            <header className={styles.sectionHeader}>
              <h2 className={`${styles.sectionTitle} ${domine.className}`}>
                {queensCrownProduct.servingSuggestions.title}
              </h2>
              <p className={`${styles.sectionSubtitle} ${poly.className}`}>
                <em>{queensCrownProduct.servingSuggestions.subtitle}</em>
              </p>
            </header>

            <div className={styles.servingGrid}>
              {queensCrownProduct.servingSuggestions.serves.map((serve, index) => (
                <div key={index} className={styles.servingCard}>
                  <div className={styles.servingIcon}>{serve.icon}</div>
                  <h3 className={`${styles.servingName} ${domine.className}`}>
                    {serve.name}
                  </h3>
                  <p className={`${styles.servingDescription} ${poly.className}`}>
                    <em>{serve.description}</em>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Specifications */}
        <section 
          ref={(el) => sectionsRef.current[3] = el}
          className={styles.specsSection}
        >
          <div className={styles.container}>
            <h2 className={`${styles.sectionTitle} ${domine.className}`}>
              {queensCrownProduct.specifications.title}
            </h2>
            <div className={styles.specsGrid}>
              {Object.entries(queensCrownProduct.specifications.details).map(([key, value], index) => (
                <div key={index} className={styles.specItem}>
                  <span className={`${styles.specKey} ${domine.className}`}>{key}</span>
                  <span className={`${styles.specValueText} ${poly.className}`}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Bottom decorative line */}
      <div className={styles.bottomDecor} aria-hidden="true"></div>
    </div>
  );
};

export default QueensCrownProduct;
