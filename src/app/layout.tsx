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
  title: {
    default: "Lê Tuấn Anh & Phạm Thì Kiều - Lễ Cưới 01/09",
    template: "%s | Thiệp cưới Lê Tuấn Anh & Phạm Thì Kiều"
  },
  description: "Hãy cùng chúc phúc cho hành trình yêu thương của Lê Tuấn Anh và Phạm Thì Kiều trong ngày cưới đặc biệt - 01/09/2024. Thiệp mời điện tử, thông tin chi tiết về lễ cưới, địa điểm và thời gian tổ chức.",
  keywords: [
    "wedding", 
    "Lê Tuấn Anh", 
    "Phạm Thì Kiều", 
    "cưới", 
    "thiệp cưới", 
    "lễ cưới", 
    "wedding invitation", 
    "đám cưới", 
    "01/09/2024",
    "thiệp mời điện tử",
    "wedding card"
  ],
  authors: [{ name: "Lê Tuấn Anh & Phạm Thì Kiều" }],
  creator: "Lê Tuấn Anh & Phạm Thì Kiều",
  publisher: "Wedding Invitation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://anh-kieu-wedding.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Thay thế bằng mã xác thực Google Search Console
  },
  category: "wedding",
  openGraph: {
    title: "Lê Tuấn Anh & Phạm Thì Kiều - Lễ Cưới 01/09/2024",
    description: "Hãy cùng chúc phúc cho hành trình yêu thương của Lê Tuấn Anh và Phạm Thì Kiều trong ngày cưới đặc biệt - 01/09/2024. Thiệp mời điện tử với đầy đủ thông tin về lễ cưới.",
    url: "https://anh-kieu-wedding.vercel.app/",
    siteName: "Thiệp cưới Lê Tuấn Anh & Phạm Thì Kiều",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thiệp cưới Lê Tuấn Anh & Phạm Thì Kiều - 01/09/2024",
        type: "image/jpeg",
      },
      // Thêm image cho Facebook (tỷ lệ vuông)
      {
        url: "/og-image-square.jpg",
        width: 1080,
        height: 1080,
        alt: "Thiệp cưới Lê Tuấn Anh & Phạm Thì Kiều - 01/09/2024",
        type: "image/jpeg",
      },
    ],
    locale: "vi_VN",
    type: "website",
    countryName: "Vietnam",
    // Thêm thông tin cho Facebook
    emails: ["contact@anh-kieu-wedding.vercel.app"],
    phoneNumbers: ["+84984597514"], // Thay số điện thoại thật
    faxNumbers: [],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lê Tuấn Anh & Phạm Thì Kiều - Lễ Cưới 01/09/2024",
    description: "Hãy cùng chúc phúc cho hành trình yêu thương của Lê Tuấn Anh và Phạm Thì Kiều trong ngày cưới đặc biệt - 01/09/2024.",
    images: ["/og-image.jpg"],
    creator: "@TuanAnhPhamKieu",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Thiệp cưới Lê Tuấn Anh & Phạm Thì Kiều",
  },
  other: {
    "theme-color": "#ffffff",
    "color-scheme": "light",
    // Facebook specific meta tags
    "fb:app_id": "your-facebook-app-id", // Thay bằng Facebook App ID thật
    "fb:admins": "your-facebook-admin-id", // Thay bằng Facebook Admin ID
    "article:author": "Lê Tuấn Anh & Phạm Thì Kiều",
    "article:publisher": "https://www.facebook.com/your-page", // Thay bằng Facebook Page thật
    // Zalo specific meta tags
    "zalo-platform-site-verification": "your-zalo-verification-code", // Mã xác thực Zalo
    // Additional Open Graph for better sharing
    "og:updated_time": new Date().toISOString(),
    "og:see_also": [
      "https://anh-kieu-wedding.vercel.app/gallery",
      "https://anh-kieu-wedding.vercel.app/rsvp"
    ],
    // Rich snippets for wedding
    "event:start_time": "2025-09-01T10:00:00+07:00", // Thời gian bắt đầu lễ cưới
    "event:end_time": "2025-09-01T22:00:00+07:00", // Thời gian kết thúc
    "event:location": "78 Ấp Mỹ Thành, Xã Định Mỹ, H.Thoại Sơn - An Giang",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" dir="ltr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light" />
        <link rel="canonical" href="https://anh-kieu-wedding.vercel.app/" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${greatVibes.className}`}>
        <LoadingProvider>
          <Header/>
          <Loading />
          <main role="main">
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