import Link from "next/link";

export default function Nav() {
	return (
		<nav className="border-b border-gray-200 dark:border-gray-800">
			<div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
				<Link href="/" className="font-semibold text-lg hover:opacity-75 transition-opacity">
					Iona OssaMain
				</Link>
				<div className="flex gap-6 text-sm">
					<Link href="/" className="hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
						Home
					</Link>
					<Link href="/blog" className="hover:text-gray-500 dark:hover:text-gray-400 transition-colors">
						Blog
					</Link>
				</div>
			</div>
		</nav>
	);
}
