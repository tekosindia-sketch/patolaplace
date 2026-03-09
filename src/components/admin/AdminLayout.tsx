'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, ListOrdered, Settings, LogOut, ChevronRight } from 'lucide-react';
import styles from './AdminLayout.module.css';

interface SupabaseUser {
    id: string;
    email?: string;
}

export default function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser({ id: session.user.id, email: session.user.email });
            } else {
                setUser(null);
                const isAuthPage = pathname?.startsWith('/admin/login') || pathname?.startsWith('/admin/migrate');
                if (!isAuthPage) {
                    router.push('/admin/login');
                }
            }
            setIsLoading(false);
        });

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser({ id: session.user.id, email: session.user.email });
            } else {
                setUser(null);
                const isAuthPage = pathname?.startsWith('/admin/login') || pathname?.startsWith('/admin/migrate');
                if (!isAuthPage) {
                    router.push('/admin/login');
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [router, pathname]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    if (isLoading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ivory)' }}>
                <div style={{ width: 40, height: 40, border: '4px solid var(--ivory-dark)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            </div>
        );
    }

    const isAuthPage = pathname?.startsWith('/admin/login') || pathname?.startsWith('/admin/migrate');

    if (!user && !isAuthPage) {
        return null;
    }

    // If on login or migrate pages, just show the content without the layout
    if (isAuthPage) {
        return <>{children}</>;
    }

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { label: 'Products', icon: ShoppingBag, href: '/admin/products' },
        { label: 'Orders', icon: ListOrdered, href: '/admin/orders' },
        { label: 'Settings', icon: Settings, href: '/admin/settings' },
    ];

    return (
        <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <span className={styles.brand}>Patolaplace</span>
                    <span className={styles.badge}>Admin</span>
                </div>

                <nav className={styles.nav}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname === item.href + '/' || (item.href !== '/admin' && pathname?.startsWith(item.href));
                        return (
                            <Link key={item.href} href={item.href} className={`${styles.navItem} ${isActive ? styles.active : ''}`}>
                                <Icon size={20} />
                                <span>{item.label}</span>
                                {isActive && <ChevronRight size={16} className={styles.activeIndicator} />}
                            </Link>
                        );
                    })}
                </nav>

                <div className={styles.sidebarFooter}>
                    <button onClick={handleSignOut} className={styles.logoutBtn}>
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.headerInfo}>
                        <p className={styles.welcome}>Welcome back,</p>
                        <h2 className={styles.userName}>{user?.email}</h2>
                    </div>
                    <Link href="/" className={styles.viewSite}>View Storefront</Link>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </div>
    );
}
