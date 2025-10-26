// app/directors/[id]/page.jsx
'use client';
import { useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Domine, Poly } from 'next/font/google';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/css/directordetail.module.css';

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

// Directors data (in production, this would come from a database or API)
const directorsData = {
  1: {
    name: "Anurag Bharadwaj Borah",
    title: "Director",
    image: "/images/directors/director2.jpg",
    experience: "15+ Years",
    specialization: "Strategic Leadership",
    directorsNote: `

<p>I am Anurag Bharadwaj Borah, and it gives me
immense pride to present this company as the next
chapter in our family's journey in the liquor industry.
This is
a venture that my sister and
 I are deeply committed to one that we wish to take forward with the
same values, dedication, and spirit that have defined
Seven Sisters Trade and Distilleries Pvt. Ltd. </p>
<p>     
While Seven Sisters Trade and Distilleries has been
primarily
 focused
 on
 manufacturing
 excellence,
 our
vision with this new company is to expand beyond
production to create and launch distinctive brands
that reflect our craftsmanship and passion. In doing
so, we carry forward the enduring legacy of our
mother, Queen Hazarika, whose strength, grace, and
entrepreneurial spirit continue to guide and inspire
us.</p>
<p>
As we move ahead, we are determined to take along
our shareholders and partners, ensuring that their
trust, confidence, and interests remain at the core of
our journey. Together, we aim to build a company that
not only honors our legacy but also creates lasting
value for everyone associated with us. </p>
   <p>With warm regards and gratitude,<br/>
      <strong>Anurag Bharadwaj Borah</strong><br/>
      Director</p>
    `,
    achievements: [
      "Founded Queen Global Barrels in 2025",
      "Led company to become a leading premium spirits manufacturer",
      "Pioneered sustainable packaging initiatives in the industry",
      "Led digital transformation initiatives across all business units"

    ]
  },
  2: {
    name: "Prartthana Borah",
    title: "Managing Director",
    image: "/images/directors/director.jpeg",
    experience: "15+ Years",
    specialization: "Operations & Growth",
    directorsNote: `
      <p> I am Prartthana Borah, and with this new venture, my
     vision is to carry forward my mother Queen Hazarika's
          indomitable spirit and enduring legacy. Her dedication,
       resilience, and passion for excellence have been the
        guiding forces behind everything we do, and it is this very
spirit that I wish to reflect in our journey ahead.</p> 
   <p>In this company, our focus is on creating new,
high-quality brands that uphold the values of craftsmanship and integrity our mother instilled in us.
Drawing upon her years of experience, we aim to take
our expertise beyond manufacturing and step into
the art of whiskey making crafting products that
resonate with quality and authenticity. </p> 
   <p>We also recognize that our growth and success are
deeply connected to the trust of our shareholders
and partners, whose unwavering support has made
this vision possible. Together, we hope to bring
exceptional whiskey to the pan-India market,
marking a new chapter in our family's journey from
manufacturing excellence to brand creation. </p> 
   <p> </p> 
   <p> </p> 
<p>Best regards,<br/>
      <strong>PRARTTHANA BORAH</strong><br/>
      Managing Director</p>
      
    `,
    achievements: [
      "Streamlined operations resulting in 40% efficiency improvement",
      "Implemented quality assurance protocols elevating product standards",
      "Developed leadership programs enhancing team performance"
    ]
  },

};

export default function DirectorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  const directorId = parseInt(params.id);
  const director = directorsData[directorId];

  useEffect(() => {
    if (!director) {
      router.push('/directors');
      return;
    }

    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(imageRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 50
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      });

      // Content animation
      gsap.fromTo(contentRef.current, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [director, router]);

  if (!director) {
    return (
      <div className={styles.notFound}>
        <h1>Director not found</h1>
        <Link href="/directors">Back to Directors</Link>
      </div>
    );
  }

  return (
    <section ref={sectionRef} className={styles.directorDetailSection}>
      <div className={styles.container}>
        {/* Back Button */}
        <Link href="/directors" className={`${styles.backButton} ${domine.className}`}>
          <svg className={styles.backIcon} viewBox="0 0 24 24" fill="none">
            <path d="M19 12h-14m7-7l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Back to Directors</span>
        </Link>

        <div className={styles.detailGrid}>
          {/* Director Image and Info */}
          <div className={styles.directorSidebar}>
            <div ref={imageRef} className={styles.directorImageContainer}>
              <Image
                src={director.image}
                alt={`${director.name} - ${director.title}`}
                width={400}
                height={500}
                className={styles.directorImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = e.target.parentNode.querySelector('.image-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />

              <div className={`${styles.imageFallback} image-fallback`}>
                <div className={styles.fallbackIcon}>👤</div>
                <span className={styles.fallbackText}>{director.name}</span>
              </div>
            </div>

            <div className={styles.directorMeta}>
              <h1 className={`${styles.directorName} ${domine.className}`}>
                {director.name}
              </h1>
              <h2 className={`${styles.directorTitle} ${domine.className}`}>
                {director.title}
              </h2>

              <div className={styles.metaInfo}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Experience:</span>
                  <span className={styles.metaValue}>{director.experience}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Specialization:</span>
                  <span className={styles.metaValue}>{director.specialization}</span>
                </div>
              </div>

              {/* Achievements */}
              <div className={styles.achievements}>
                <h3 className={`${styles.achievementsTitle} ${domine.className}`}>
                  Key Achievements
                </h3>
                <ul className={styles.achievementsList}>
                  {director.achievements.map((achievement, index) => (
                    <li key={index} className={`${styles.achievementItem} ${poly.className}`}>
                      <em>{achievement}</em>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Director's Note */}
          <div ref={contentRef} className={styles.directorNote}>
            <div className={styles.noteHeader}>
              <h3 className={`${styles.noteTitle} ${domine.className}`}>
                Director&apos;s Note
              </h3>
              <div className={styles.noteUnderline}></div>
            </div>

            <div
              className={`${styles.noteContent} ${poly.className}`}
              dangerouslySetInnerHTML={{ __html: director.directorsNote }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
