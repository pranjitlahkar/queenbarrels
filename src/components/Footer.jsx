// components/Footer.jsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Domine, Poly } from 'next/font/google';
import styles from '@/css/footer.module.css';

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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/product', label: 'Product' },
    { href: '/directors', label: 'Directors' },
    { href: '/about', label: 'About Us' },
    { href: '/art', label: 'The Art' }
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
 
  ];

  const socialLinks = [
    { href: 'https://facebook.com', label: 'Facebook', icon: 'facebook' },
    { href: 'https://instagram.com', label: 'Instagram', icon: 'instagram' },
    { href: 'https://twitter.com', label: 'Twitter', icon: 'twitter' },
 
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.mainContent}>
          {/* Company Info Section */}
          <div className={styles.companySection}>
            <div className={styles.logoSection}>
              <Image
                src="/images/logo/logowhite.png" // Replace with your white logo
                alt="Queen Global Barrels"
                width={200}
                height={65}
                className={styles.logo}
              />
            </div>
            <div className={`${styles.companyDescription} ${poly.className}`}>
              <p>
                Crafting exceptional spirits with heritage, tradition, and uncompromising quality. 
                Queen Global Barrels represents the pinnacle of distillery excellence.
              </p>
            </div>
            <div className={styles.socialMedia}>
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className={styles.socialLink}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon type={social.icon} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className={styles.linkSection}>
            <h3 className={`${styles.sectionHeading} ${domine.className}`}>
              Quick Links
            </h3>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.href} className={styles.linkItem}>
                  <Link href={link.href} className={`${styles.footerLink} ${poly.className}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links Section */}
          <div className={styles.linkSection}>
            <h3 className={`${styles.sectionHeading} ${domine.className}`}>
              Legal
            </h3>
            <ul className={styles.linkList}>
              {legalLinks.map((link) => (
                <li key={link.href} className={styles.linkItem}>
                  <Link href={link.href} className={`${styles.footerLink} ${poly.className}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className={styles.contactSection}>
            <h3 className={`${styles.sectionHeading} ${domine.className}`}>
              Contact Us
            </h3>
            <div className={`${styles.contactInfo} ${poly.className}`}>
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <LocationIcon />
                </div>
                <div className={styles.contactText}>
                  <p>1-B , Ashirwad Apartment, Chandmari</p>
                  <p>Guwahati, Assam 781003</p>
                  <p>India</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <PhoneIcon />
                </div>
                <div className={styles.contactText}>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.contactIcon}>
                  <EmailIcon />
                </div>
                <div className={styles.contactText}>
                  <p>info@sevensistersdistilleries.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <h3 className={`${styles.sectionHeading} ${domine.className}`}>
              Stay Updated
            </h3>
            <p className={`${styles.newsletterText} ${poly.className}`}>
              Subscribe to our newsletter for exclusive offers and updates on new releases.
            </p>
          </div>
          <form className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email address"
              className={`${styles.emailInput} ${poly.className}`}
              required
            />
            <button type="submit" className={`${styles.subscribeButton} ${domine.className}`}>
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.bottomContent}>
            <div className={`${styles.copyright} ${poly.className}`}>
              <p>&copy; {currentYear} Queen Global Barrels. All rights reserved.</p>
            </div>
            <div className={`${styles.disclaimer} ${poly.className}`}>
              <p>Please drink responsibly. Must be 21+ to purchase.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social Media Icons Components
const SocialIcon = ({ type }) => {
  const iconProps = {
    width: 24,
    height: 24,
    fill: 'currentColor'
  };

  switch (type) {
    case 'facebook':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...iconProps} viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    default:
      return null;
  }
};

// Contact Icons
const LocationIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

export default Footer;
