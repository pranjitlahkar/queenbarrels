// components/WhiskeyMakingArt.jsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Domine, Poly } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import whiskeyMakingProcess from '@/data/Whiskeyprocess';
import styles from '@/css/whiskeymaking.module.css';

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

// Process Step Component
const ProcessStep = ({ process, index, isReversed }) => {
  const stepRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!stepRef.current) return;

    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        x: isReversed ? 50 : -50
      }, {
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stepRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // Content animation
      gsap.fromTo(contentRef.current, {
        opacity: 0,
        y: 40,
        x: isReversed ? -30 : 30
      }, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: stepRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

    }, stepRef);

    return () => ctx.revert();
  }, [isReversed]);

  return (
    <article 
      ref={stepRef} 
      className={`${styles.processStep} ${isReversed ? styles.reversed : ''}`}
    >
      {/* Process Image */}
      <div className={styles.processImageContainer}>
        <div className={styles.stepNumber}>
          <span className={`${styles.stepText} ${domine.className}`}>
            {process.step}
          </span>
        </div>
        
        <div ref={imageRef} className={styles.processImage}>
          <Image
            src={process.image}
            alt={process.imageAlt}
            width={600}
            height={400}
            className={styles.image}
            priority={index < 2}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.style.display = 'none';
              const fallback = e.target.parentNode.querySelector('.image-fallback');
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          
          {/* Image Fallback */}
          <div className={`${styles.imageFallback} image-fallback`}>
            <div className={styles.fallbackIcon}>🥃</div>
            <span className={styles.fallbackText}>Process Image</span>
          </div>
          
          {/* Process Metadata Overlay */}
          <div className={styles.processMetadata}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Time:</span>
              <span className={styles.metaValue}>{process.processTime}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Expert:</span>
              <span className={styles.metaValue}>{process.expertise}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Process Content */}
      <div ref={contentRef} className={styles.processContent}>
        <header className={styles.processHeader}>
          <h3 className={`${styles.processTitle} ${domine.className}`}>
            {process.title}
          </h3>
          <h4 className={`${styles.processSubtitle} ${poly.className}`}>
            <em>{process.subtitle}</em>
          </h4>
        </header>

        <p className={`${styles.processDescription} ${poly.className}`}>
          <em>{process.description}</em>
        </p>

        {/* Process Details */}
        <div className={styles.processDetails}>
          <h5 className={`${styles.detailsTitle} ${domine.className}`}>
            Key Elements:
          </h5>
          <ul className={styles.detailsList}>
            {process.details.map((detail, detailIndex) => (
              <li key={detailIndex} className={`${styles.detailItem} ${poly.className}`}>
                <span className={styles.detailBullet}>•</span>
                <em>{detail}</em>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

// Craftsman Card Component
const CraftsmanCard = ({ craftsman, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className={styles.craftsmanCard}>
      <div className={styles.craftsmanImageContainer}>
        <Image
          src={craftsman.image}
          alt={`${craftsman.name} - ${craftsman.title}`}
          width={250}
          height={300}
          className={styles.craftsmanImage}
          onError={(e) => {
            e.target.style.display = 'none';
            const fallback = e.target.parentNode.querySelector('.craftsman-fallback');
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        
        <div className={`${styles.craftsmanFallback} craftsman-fallback`}>
          <div className={styles.craftsmanFallbackIcon}>👤</div>
          <span className={styles.craftsmanFallbackText}>{craftsman.name}</span>
        </div>
      </div>

      <div className={styles.craftsmanInfo}>
        <h4 className={`${styles.craftsmanName} ${domine.className}`}>
          {craftsman.name}
        </h4>
        <p className={`${styles.craftsmanTitle} ${domine.className}`}>
          {craftsman.title}
        </p>
        <div className={styles.craftsmanMeta}>
          <span className={styles.experience}>{craftsman.experience}</span>
          <span className={styles.specialty}>{craftsman.specialty}</span>
        </div>
      </div>
    </div>
  );
};

// Main Component
const WhiskeyMakingArt = () => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const philosophyRef = useRef(null);
  const decorElementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.fromTo(heroRef.current, {
        opacity: 0,
        y: 60
      }, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out"
      });

      // Introduction animation
      gsap.fromTo(introRef.current, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // Philosophy section animation
      gsap.fromTo(philosophyRef.current, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      // Floating decorative elements
      decorElementsRef.current.forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            y: "random(-30, 30)",
            x: "random(-25, 25)",
            rotation: "random(-20, 20)",
            duration: "random(6, 10)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.7
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.whiskeyArtSection}>
      {/* Background Decorative Elements */}
      <div className={styles.decorativeBackground} aria-hidden="true">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            ref={(el) => decorElementsRef.current[index] = el}
            className={`${styles.decorElement} ${styles[`decor${index + 1}`]}`}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <header ref={heroRef} className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <Image
            src={whiskeyMakingProcess.hero.backgroundImage}
            alt="Premium distillery showcasing the art of whiskey making"
            fill
            className={styles.heroImage}
            priority
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} ${domine.className}`}>
            {whiskeyMakingProcess.hero.title}
          </h1>
          <h2 className={`${styles.heroSubtitle} ${poly.className}`}>
            <em>{whiskeyMakingProcess.hero.subtitle}</em>
          </h2>
          <p className={`${styles.heroDescription} ${poly.className}`}>
            <em>{whiskeyMakingProcess.hero.description}</em>
          </p>
        </div>
      </header>

      <div className={styles.container}>
        {/* Introduction Section */}
        <section ref={introRef} className={styles.introSection}>
          <div className={styles.introGrid}>
            <div className={styles.introContent}>
              <h2 className={`${styles.introTitle} ${domine.className}`}>
                {whiskeyMakingProcess.introduction.title}
              </h2>
              <p className={`${styles.introText} ${poly.className}`}>
                <em>{whiskeyMakingProcess.introduction.content}</em>
              </p>
            </div>
            
            <div className={styles.introImageContainer}>
              <Image
                src={whiskeyMakingProcess.introduction.image}
                alt={whiskeyMakingProcess.introduction.imageAlt}
                width={500}
                height={600}
                className={styles.introImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.parentNode.querySelector('.intro-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              
              <div className={`${styles.introFallback} intro-fallback`}>
                <div className={styles.introFallbackIcon}>🥃</div>
                <span className={styles.introFallbackText}>Master Distiller</span>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className={styles.processSection}>
          <header className={styles.processSectionHeader}>
            <h2 className={`${styles.processSectionTitle} ${domine.className}`}>
              The Five Sacred Steps
            </h2>
            <p className={`${styles.processSectionSubtitle} ${poly.className}`}>
              <em>Each step in our process is a testament to our commitment to excellence</em>
            </p>
          </header>

          <div className={styles.processSteps}>
            {whiskeyMakingProcess.processes.map((process, index) => (
              <ProcessStep
                key={process.id}
                process={process}
                index={index}
                isReversed={index % 2 !== 0}
              />
            ))}
          </div>
        </section>

        {/* Philosophy Section */}
        <section ref={philosophyRef} className={styles.philosophySection}>
          <div className={styles.philosophyContent}>
            <header className={styles.philosophyHeader}>
              <h2 className={`${styles.philosophyTitle} ${domine.className}`}>
                {whiskeyMakingProcess.philosophy.title}
              </h2>
              <h3 className={`${styles.philosophySubtitle} ${poly.className}`}>
                <em>{whiskeyMakingProcess.philosophy.subtitle}</em>
              </h3>
            </header>

            <p className={`${styles.philosophyText} ${poly.className}`}>
              <em>{whiskeyMakingProcess.philosophy.content}</em>
            </p>

            <div className={styles.principlesGrid}>
              {whiskeyMakingProcess.philosophy.principles.map((principle, index) => (
                <div key={index} className={styles.principleCard}>
                  <div className={styles.principleIcon}>{principle.icon}</div>
                  <h4 className={`${styles.principleTitle} ${domine.className}`}>
                    {principle.title}
                  </h4>
                  <p className={`${styles.principleDescription} ${poly.className}`}>
                    <em>{principle.description}</em>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Master Craftsmen Section */}
        <section className={styles.craftsmenSection}>
          <header className={styles.craftsmenHeader}>
            <h2 className={`${styles.craftsmenTitle} ${domine.className}`}>
              {whiskeyMakingProcess.craftsmen.title}
            </h2>
            <h3 className={`${styles.craftsmenSubtitle} ${poly.className}`}>
              <em>{whiskeyMakingProcess.craftsmen.subtitle}</em>
            </h3>
            <p className={`${styles.craftsmenDescription} ${poly.className}`}>
              <em>{whiskeyMakingProcess.craftsmen.description}</em>
            </p>
          </header>

          
        </section>
      </div>

      {/* Bottom decorative line */}
      <div className={styles.bottomDecor} aria-hidden="true"></div>
    </section>
  );
};

export default WhiskeyMakingArt;
