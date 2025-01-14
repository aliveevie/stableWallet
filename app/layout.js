import { Inter } from "next/font/google";
import "./globals.css";
import styles from './styles/Mobile.module.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stable Wallet",
  description: "Cross Border Transfer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.container}`}>{children}</body>
    </html>
  );
}
