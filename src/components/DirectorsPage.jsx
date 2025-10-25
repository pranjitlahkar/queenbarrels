// components/DirectorsPage.jsx
'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Domine, Poly } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/css/directorspage.module.css';

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

const DirectorsPage = ({ 
  directors = [
    {
      id: 1,
      name: "Anurag Bharadwaj Borah",
      title: "Founder & Chairman",
      image: "/images/directors/director2.jpg",
      shortBio: "Visionary leader with over 25 years of experience in the liquor industry. Founded Seven Sisters Trade and Distilleries, establishing a legacy of excellence and innovation.",
      experience: "25+ Years",
      specialization: "Strategic Leadership"
    },
    {
      id: 2,
      name: "Prartthana Borah",
      title: "Managing Director",
      image: "/images/directors/director.jpeg",
      shortBio: "Expert in operations and business development, driving the expansion of Queen Global Barrels with innovative strategies and market insights.",
      experience: "20+ Years",
      specialization: "Operations & Growth"
    }
  ]
}) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const decorElementsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current, {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Director cards animation
      gsap.fromTo(cardsRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse"
        }
      });

      // Decorative elements floating
      decorElementsRef.current.forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            y: "random(-25, 25)",
            x: "random(-20, 20)",
            rotation: "random(-15, 15)",
            duration: "random(5, 8)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.5
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.directorsSection}>
      {/* Background Decorative Elements */}
      <div className={styles.decorativeBackground}>
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            ref={(el) => decorElementsRef.current[index] = el}
            className={`${styles.decorElement} ${styles[`decor${index + 1}`]}`}
          ></div>
        ))}
      </div>

      <div className={styles.container}>
        {/* Header Section */}
        <header ref={headerRef} className={styles.header}>
          <div className={styles.headerBadge}>
            <span className={`${styles.badgeText} ${poly.className}`}>
              <em>Leadership Excellence</em>
            </span>
          </div>
          <h1 className={`${styles.pageTitle} ${domine.className}`}>
            <span className={styles.titleLine1}>Our</span>
            <span className={styles.titleLine2}>Directors</span>
          </h1>
          <p className={`${styles.headerDescription} ${poly.className}`}>
            <em>Meet the visionary leaders driving Queen Global Barrels forward with passion, 
            expertise, and unwavering commitment to excellence in premium spirits.</em>
          </p>
          <div className={styles.headerUnderline}></div>
        </header>

        {/* Directors Grid */}
        <div className={styles.directorsGrid}>
          {directors.map((director, index) => (
            <div
              key={director.id}
              ref={(el) => cardsRef.current[index] = el}
              className={styles.directorCard}
            >
              {/* Director Image */}
              <div className={styles.imageContainer}>
                <Image
                  src={director.image}
                  alt={`${director.name} - ${director.title}`}
                  width={300}
                  height={400}
                  className={styles.directorImage}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.parentNode.querySelector('.image-fallback');
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                
                {/* Image Fallback */}
                <div className={`${styles.imageFallback} image-fallback`}>
                  <div className={styles.fallbackIcon}>👤</div>
                  <span className={styles.fallbackText}>Director Photo</span>
                </div>
                
                {/* Image Overlay */}
                <div className={styles.imageOverlay}>
                  <div className={styles.overlayContent}>
                    <span className={styles.experience}>{director.experience}</span>
                    <span className={styles.specialization}>{director.specialization}</span>
                  </div>
                </div>
              </div>

              {/* Director Info */}
              <div className={styles.directorInfo}>
                <h3 className={`${styles.directorName} ${domine.className}`}>
                  {director.name}
                </h3>
                <h4 className={`${styles.directorTitle} ${domine.className}`}>
                  {director.title}
                </h4>
                <p className={`${styles.directorBio} ${poly.className}`}>
                  <em>{director.shortBio}</em>
                </p>
                
                {/* Read More Button */}
                <Link 
                  href={`/directors/${director.id}`}
                  className={`${styles.readMoreButton} ${domine.className}`}
                >
                  <span>Read Director's Note</span>
                  <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </Link>
              </div>

              {/* Card Decorative Elements */}
              <div className={styles.cardDecorations}>
                <div className={styles.cornerDecor}></div>
                <div className={styles.sideAccent}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <div className={styles.bottomContent}>
            <h3 className={`${styles.bottomTitle} ${domine.className}`}>
              Collective Vision
            </h3>
            <p className={`${styles.bottomDescription} ${poly.className}`}>
              <em>Together, our directors bring decades of combined experience in crafting premium spirits, 
              building lasting partnerships, and maintaining the highest standards of quality that define 
              the Queen Global Barrels legacy.</em>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className={styles.bottomDecor}></div>
    </section>
  );
};

export default DirectorsPage;
