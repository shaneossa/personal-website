export interface Post {
	slug: string;
	title: string;
	date: string;
	excerpt?: string;
	content: string;
}

// Blog posts are defined here. Add new posts to this array.
// To add a post: copy one of the existing entries and update slug, title, date, excerpt, and content.
const posts: Post[] = [
	{
		slug: "hello-world",
		title: "Hello, World",
		date: "2026-03-03",
		excerpt: "My first post — a quick introduction and what to expect from this blog.",
		content: `
Welcome to my blog! This is my first post.

I'm using this space to share things I'm learning, projects I'm working on, and ideas I want to explore in writing.

Stay tuned for more.
		`.trim(),
	},
];

export function getPosts(): Post[] {
	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post | undefined {
	return posts.find((p) => p.slug === slug);
}
