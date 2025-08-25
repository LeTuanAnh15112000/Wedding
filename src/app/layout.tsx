import type { Metadata } from "next";
import { Great_Vibes } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { LoadingProvider } from "@/contexts/LoadingContext";

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
});

export const metadata: Metadata = {
  title: "Lê Tuấn Anh & Phạm Thị Kiều - Lễ Cưới 01/09",
  description: "Hãy cùng chúc phúc cho hành trình yêu thương của Lê Tuấn Anh và Phạm Thị Kiều trong ngày cưới đặc biệt - 01/09/2025.",
  icons: {
    icon: '/favicon.png',
  },
  metadataBase: new URL("https://anh-kieu-wedding.vercel.app"),
  alternates: {
    canonical: "https://anh-kieu-wedding.vercel.app/",
  },
  openGraph: {
    title: "Lê Tuấn Anh & Phạm Thị Kiều - Lễ Cưới 01-02/09/2025",
    description: "Hãy cùng chúc phúc cho hành trình yêu thương của Lê Tuấn Anh và Phạm Thị Kiều trong ngày cưới đặc biệt - 01-02/09/2025.",
    url: "https://anh-kieu-wedding.vercel.app/",
    siteName: "Thiệp cưới Lê Tuấn Anh & Phạm Thị Kiều",
    images: [
      {
        url: "https://anh-kieu-wedding.vercel.app/og-image.jpg",
        secureUrl: "https://anh-kieu-wedding.vercel.app/og-image.jpg",
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: "Thiệp cưới Lê Tuấn Anh & Phạm Thị Kiều - 01-02/09/2025",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  other: {
    'fb:app_id': '1343862593826258',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <meta name="google-site-verification" content="0WpFy2ftfyyE3oN1YwEpnnG_QyuEhN-Hdo8W6R95574" />
      <body className={`${greatVibes.className}`}>
        <LoadingProvider>
          <Header/>
          <Loading />
          <main>
            {children}
          </main>
          <Footer/>
          <ToastContainer
            limit={1}
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </LoadingProvider>
      </body>
    </html>
  );
}