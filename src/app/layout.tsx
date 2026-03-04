import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Iona OssaMain",
	description: "Personal website of Iona OssaMain — portfolio and blog.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen`}>
				<Nav />
				<main className="max-w-3xl mx-auto px-6 py-12">
					{children}
				</main>
				<footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
					<div className="max-w-3xl mx-auto px-6 py-6 text-sm text-gray-500 dark:text-gray-400">
						© {new Date().getFullYear()} Iona OssaMain
					</div>
				</footer>
			</body>
		</html>
	);
}
