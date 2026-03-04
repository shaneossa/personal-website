import { getPost, getPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = getPost(slug);
	if (!post) return {};
	return {
		title: `${post.title} — Iona OssaMain`,
		description: post.excerpt,
	};
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params;
	const post = getPost(slug);
	if (!post) notFound();

	return (
		<article>
			<Link href="/blog" className="text-sm text-gray-500 dark:text-gray-400 hover:underline mb-8 inline-block">
				← All posts
			</Link>
			<h1 className="text-3xl font-bold mb-3">{post.title}</h1>
			<time className="text-sm text-gray-500 dark:text-gray-400 block mb-10">
				{new Date(post.date).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			</time>
			<div className="prose dark:prose-invert prose-gray max-w-none leading-relaxed whitespace-pre-wrap text-gray-800 dark:text-gray-200">
				{post.content}
			</div>
		</article>
	);
}
