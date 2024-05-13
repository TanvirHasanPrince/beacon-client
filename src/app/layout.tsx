import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beacon",
  description:
    " Social networking app designed to help people find genuine connections and combat loneliness. The app uses advanced algorithms and personalized matching to connect users with others who share similar interests, values, and life experiences. This will also help users to connect with verified psychiatrist/therapist/counselors. Certain features of this app will notify nearby users of any suicidal risk and prevention steps. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     
      <body className={inter.className}>{children}</body>
    </html>
  );
}
