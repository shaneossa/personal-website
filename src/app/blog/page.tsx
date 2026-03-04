import Link from "next/link";
import { getPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog — Iona OssaMain",
	description: "Writing by Iona OssaMain.",
};

export default function BlogPage() {
	const posts = getPosts();

	return (
		<div>
			<h1 className="text-3xl font-bold mb-10">Blog</h1>
			{posts.length === 0 ? (
				<p className="text-gray-500 dark:text-gray-400">No posts yet. Check back soon.</p>
			) : (
				<div className="space-y-8">
					{posts.map((post) => (
						<article key={post.slug} className="group border-b border-gray-100 dark:border-gray-800 pb-8 last:border-0">
							<Link href={`/blog/${post.slug}`} className="block">
								<h2 className="text-xl font-semibold group-hover:underline">{post.title}</h2>
								<time className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
									{new Date(post.date).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</time>
								{post.excerpt && (
									<p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
										{post.excerpt}
									</p>
								)}
							</Link>
						</article>
					))}
				</div>
			)}
		</div>
	);
}
