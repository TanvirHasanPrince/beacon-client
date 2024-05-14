import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";


const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-nunito",
});

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
      <body className={`${nunito.className}`}>{children}</body>
    </html>
  );
}
