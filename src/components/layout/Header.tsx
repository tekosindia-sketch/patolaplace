'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './Header.module.css';

const navLinks = [
    { label: 'Collections', href: '/collections', hasDropdown: true, items: ['Kanjivaram', 'Banarasi', 'Chanderi', 'Mysore Silk', 'Paithani', 'Bandhani'] },
    { label: 'Sarees', href: '/products', hasDropdown: false },
    { label: 'Bridal Edit', href: '/products?occasion=Bridal', hasDropdown: false },
    { label: 'New Arrivals', href: '/products?filter=new', hasDropdown: false },
    { label: 'About', href: '/about', hasDropdown: false },
    { label: 'Track Order', href: '/track', hasDropdown: false },
];

export default function Header() {
    const { totalItems, openCart } = useCart();
    const { count: wishlistCount } = useWishlist();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top announcement bar */}
            <div className={styles.announcements}>
                <div className={styles.announcementTrack}>
                    <span>✦ Free Shipping on orders above ₹2,999</span>
                    <span className={styles.dot}>◆</span>
                    <span>✦ Authenticity Guaranteed on Every Saree</span>
                    <span className={styles.dot}>◆</span>
                    <span>✦ 100% Pure Silk. GI Certified. Handcrafted in India</span>
                    <span className={styles.dot}>◆</span>
                    <span>✦ Free Shipping on orders above ₹2,999</span>
                    <span className={styles.dot}>◆</span>
                    <span>✦ Authenticity Guaranteed on Every Saree</span>
                    <span className={styles.dot}>◆</span>
                    <span>✦ 100% Pure Silk. GI Certified. Handcrafted in India</span>
                </div>
            </div>

            {/* Main Header */}
            <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
                <div className={styles.inner}>
                    {/* Left nav */}
                    <nav className={styles.navLeft}>
                        {navLinks.slice(0, 3).map(link => (
                            <div
                                key={link.label}
                                className={styles.navItem}
                                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.label)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link href={link.href} className={styles.navLink}>
                                    {link.label}
                                    {link.hasDropdown && <ChevronDown size={14} />}
                                </Link>
                                {link.hasDropdown && activeDropdown === link.label && (
                                    <div className={styles.dropdown}>
                                        {link.items?.map(item => (
                                            <Link
                                                key={item}
                                                href={`/products?category=${item.toLowerCase()}`}
                                                className={styles.dropdownItem}
                                            >
                                                {item}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Logo */}
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoOrnament}>✦</span>
                        <div>
                            <span className={styles.logoMain}>Patolaplace</span>
                            <span className={styles.logoTagline}>Est. 1952</span>
                        </div>
                        <span className={styles.logoOrnament}>✦</span>
                    </Link>

                    {/* Right nav */}
                    <div className={styles.navRight}>
                        {navLinks.slice(3).map(link => (
                            <Link key={link.label} href={link.href} className={styles.navLink}>
                                {link.label}
                            </Link>
                        ))}

                        {/* Icons */}
                        <div className={styles.icons}>
                            <button
                                className={styles.iconBtn}
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                aria-label="Search"
                            >
                                <Search size={20} />
                            </button>
                            <Link href="/wishlist" className={styles.iconBtn} aria-label="Wishlist">
                                <Heart size={20} />
                                {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
                            </Link>
                            <button className={styles.iconBtn} onClick={openCart} aria-label="Cart">
                                <ShoppingBag size={20} />
                                {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            className={styles.mobileMenuBtn}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Search bar */}
                {isSearchOpen && (
                    <div className={styles.searchBar}>
                        <div className={styles.searchInner}>
                            <Search size={18} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search for sarees, fabrics, occasions..."
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <button onClick={() => setIsSearchOpen(false)} className={styles.searchClose}>
                                <X size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={styles.mobileMenu}>
                    <div className={styles.mobileOverlay} onClick={() => setIsMenuOpen(false)} />
                    <div className={styles.mobileDrawer}>
                        <div className={styles.mobileHeader}>
                            <span className={styles.mobileLogo}>Patolaplace</span>
                            <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
                        </div>
                        <nav className={styles.mobileNav}>
                            {navLinks.map(link => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className={styles.mobileNavLink}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className={styles.mobileFooter}>
                            <Link href="/contact" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                            <p className={styles.mobileContact}>📞 +91 98765 43210</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
