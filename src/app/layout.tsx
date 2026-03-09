import type { Metadata } from 'next';
import './globals.css';
import '@/styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { VideoCallProvider } from '@/context/VideoCallContext';
import VideoCallRoom from '@/components/video/VideoCallRoom';

export const metadata: Metadata = {
  title: 'Patolaplace — Luxury Indian Sarees | Pure Silk, Handcrafted in India',
  description: 'Discover India\'s finest collection of pure Kanjivaram, Banarasi, Chanderi, Mysore Silk and Paithani sarees. Handcrafted by master weavers. Authenticity guaranteed. Free shipping above ₹2,999.',
  keywords: 'saree, silk saree, kanjivaram, banarasi, chanderi, mysore silk, paithani, indian saree, bridal saree',
  openGraph: {
    title: 'Patolaplace — Luxury Indian Sarees',
    description: 'India\'s finest collection of handcrafted silk sarees. Authentic. Premium. Timeless.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <WishlistProvider>
          <CartProvider>
            <VideoCallProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <CartDrawer />
              <VideoCallRoom />
            </VideoCallProvider>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
