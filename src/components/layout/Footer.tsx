'use client';
import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            {/* Newsletter */}
            <div className={styles.newsletter}>
                <div className={styles.newsletterInner}>
                    <div className={styles.newsletterText}>
                        <p className={styles.newsletterLabel}>Join Our Royal Circle</p>
                        <h3 className={styles.newsletterTitle}>Get Exclusive Access to New Collections</h3>
                        <p className={styles.newsletterSub}>Be the first to know about new arrivals, bridal collections, and exclusive offers.</p>
                    </div>
                    <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
                        <input type="email" placeholder="Enter your email address" className={styles.newsletterInput} />
                        <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
                    </form>
                </div>
            </div>

            {/* Main Footer */}
            <div className={styles.main}>
                <div className={styles.mainInner}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <p className={styles.brandOrnament}>✦ Patolaplace ✦</p>
                        <p className={styles.brandTagline}>Est. 1952 · Handcrafted in India</p>
                        <p className={styles.brandDesc}>
                            A heritage house of pure Indian silk sarees, curating the finest weaves from Kanchipuram, Varanasi, Chanderi, Mysore and beyond. Authenticity is our promise.
                        </p>
                        <div className={styles.social}>
                            <a href="#" className={styles.socialBtn} aria-label="Instagram"><Instagram size={18} /></a>
                            <a href="#" className={styles.socialBtn} aria-label="Facebook"><Facebook size={18} /></a>
                            <a href="#" className={styles.socialBtn} aria-label="YouTube"><Youtube size={18} /></a>
                            <a href="mailto:care@patolaplace.com" className={styles.socialBtn} aria-label="Email"><Mail size={18} /></a>
                        </div>
                    </div>

                    {/* Collections */}
                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Collections</h4>
                        <ul className={styles.colLinks}>
                            {['Kanjivaram', 'Banarasi Silk', 'Chanderi', 'Mysore Silk', 'Paithani', 'Bandhani', 'Pochampally', 'Designer'].map(c => (
                                <li key={c}><Link href={`/products?category=${c.toLowerCase()}`} className={styles.colLink}>{c}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Quick Links</h4>
                        <ul className={styles.colLinks}>
                            {[
                                { label: 'Bridal Edit', href: '/products?occasion=Bridal' },
                                { label: 'New Arrivals', href: '/products?filter=new' },
                                { label: 'Best Sellers', href: '/products?filter=bestseller' },
                                { label: 'About Us', href: '/about' },
                                { label: 'Contact', href: '/contact' },
                                { label: 'Size Guide', href: '/size-guide' },
                                { label: 'Care Instructions', href: '/care' },
                                { label: 'Track Order', href: '/track' },
                            ].map(l => (
                                <li key={l.label}><Link href={l.href} className={styles.colLink}>{l.label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Contact Us</h4>
                        <ul className={styles.contactList}>
                            <li className={styles.contactItem}>
                                <Phone size={15} className={styles.contactIcon} />
                                <div>
                                    <p>+91 98765 43210</p>
                                    <p className={styles.contactSub}>Mon–Sat, 10am–7pm IST</p>
                                </div>
                            </li>
                            <li className={styles.contactItem}>
                                <Mail size={15} className={styles.contactIcon} />
                                <div>
                                    <p>care@patolaplace.com</p>
                                    <p className={styles.contactSub}>Reply within 24 hours</p>
                                </div>
                            </li>
                            <li className={styles.contactItem}>
                                <MapPin size={15} className={styles.contactIcon} />
                                <div>
                                    <p>Patolaplace House</p>
                                    <p className={styles.contactSub}>Sindhu Bhavan Road, Ahmedabad, GJ 380054</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className={styles.bottom}>
                <div className={styles.bottomInner}>
                    <p className={styles.copyright}>© 2026 Patolaplace. All rights reserved. Handcrafted with ❤️ in India.</p>
                    <div className={styles.bottomLinks}>
                        <Link href="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
                        <Link href="/terms" className={styles.bottomLink}>Terms of Service</Link>
                        <Link href="/returns" className={styles.bottomLink}>Returns & Exchange</Link>
                    </div>
                    <div className={styles.payments}>
                        <span className={styles.paymentBadge}>Visa</span>
                        <span className={styles.paymentBadge}>Mastercard</span>
                        <span className={styles.paymentBadge}>UPI</span>
                        <span className={styles.paymentBadge}>Razorpay</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
