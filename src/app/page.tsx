import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default function Home() {
	const recentPosts = getPosts().slice(0, 3);

	return (
		<div>
			{/* Hero */}
			<section className="mb-20">
				<h1 className="text-4xl font-bold mb-4">Hi, I&apos;m Iona OssaMain</h1>
				<p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
					Welcome to my personal corner of the internet. I write about things I&apos;m learning, working on, and thinking about.
				</p>
				<div className="flex gap-4 mt-8">
					<Link
						href="/blog"
						className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:opacity-80 transition-opacity"
					>
						Read the blog
					</Link>
					<a
						href="https://github.com/shaneossa"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
					>
						GitHub
					</a>
				</div>
			</section>

			{/* Recent posts */}
			{recentPosts.length > 0 && (
				<section>
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-semibold">Recent posts</h2>
						<Link href="/blog" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
							All posts →
						</Link>
					</div>
					<div className="space-y-6">
						{recentPosts.map((post) => (
							<article key={post.slug} className="group">
								<Link href={`/blog/${post.slug}`} className="block">
									<h3 className="font-medium group-hover:underline">{post.title}</h3>
									<time className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
										{new Date(post.date).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</time>
									{post.excerpt && (
										<p className="text-gray-600 dark:text-gray-400 text-sm mt-2 leading-relaxed">
											{post.excerpt}
										</p>
									)}
								</Link>
							</article>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
