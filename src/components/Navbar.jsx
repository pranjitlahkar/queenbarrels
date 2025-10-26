// components/Navbar.jsx
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Domine, Poly } from 'next/font/google';
import styles from '@/css/navbar.module.css';

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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/directors', label: 'Directors' },
    { href: '/product', label: 'Product' },
    { href: '/art', label: 'The Art' },
 
  ];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/images/logo/logo.png" // Replace with your actual logo path
              alt="Queen Global Barrels"
              width={180}
              height={60}
              className={styles.logo}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className={`${styles.desktopNav} ${domine.className}`}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href} className={styles.navItem}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuContent}>
          <div className={styles.mobileHeader}>
            <Image
              src="/images/logo/logo.png" // Replace with your actual logo path
              alt="Queen Global Barrels"
              width={160}
              height={53}
              className={styles.mobileLogo}
            />
            <button
              className={styles.closeButton}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <ul className={`${styles.mobileNavList} ${domine.className}`}>
            {navLinks.map((link) => (
              <li key={link.href} className={styles.mobileNavItem}>
                <Link
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={closeMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
