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
  title: "Lê Tuấn Anh & Phạm Thì Kiều - Lễ Cưới 01/09",
  description: "Hãy cùng chúc phúc cho hành trình yêu thương của Lê Tuấn Anh và Phạm Thì Kiều trong ngày cưới đặc biệt - 01/09. Thiệp mời và thông tin chi tiết tại đây!",
  keywords: ["wedding", "Lê Tuấn Anh", "Phạm Thì Kiều", "cưới"],
  openGraph: {
    title: "Lê Tuấn Anh & Phạm Thì Kiều - Lễ Cưới 01/09",
    description: "Hãy cùng chúc phúc cho hành trình yêu thương của Lê Tuấn Anh và Phạm Thì Kiều trong ngày cưới đặc biệt - 01/09.",
    url: "https://your-domain.com", // Thay bằng domain thật
    siteName: "Thiệp cưới Lê Tuấn Anh & Phạm Thì Kiều",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg", // Đường dẫn ảnh đại diện khi share
        width: 1200,
        height: 630,
        alt: "Ảnh cưới Lê Tuấn Anh & Phạm Thì Kiều",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lê Tuấn Anh & Phạm Thì Kiều - Lễ Cưới 01/09",
    description: "Hãy cùng chúc phúc cho hành trình yêu thương của Lê Tuấn Anh và Phạm Thì Kiều trong ngày cưới đặc biệt - 01/09.",
    images: ["https://your-domain.com/og-image.jpg"], // Đường dẫn ảnh đại diện khi share
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${greatVibes.className}`}>
        <LoadingProvider>
          <Header/>
          <Loading />
          <div>
            {children}
          </div>
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