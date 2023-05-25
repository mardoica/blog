import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import Header from "../../components/header";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";

type Props = {
	post: PostType;
	morePosts: PostType[];
	preview?: boolean;
};

export default function Post({ post, morePosts, preview }: Props) {
	const router = useRouter();
	const title = `${post.title} | Mardoica ☭`;
	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}
	return (
		<Layout preview={preview}>
			<Container>
				<Header />
				{router.isFallback ? (
					<PostTitle>Loading…</PostTitle>
				) : (
					<>
						<article className="mb-32">
							<Head>
								<title>{title}</title>
								<meta property="og:image" content={post.ogImage.url} />
							</Head>
							<PostHeader
								title={post.title}
								coverImage={post.coverImage}
								date={post.date}
								author={post.author}
							/>
							{post.tiktok && (
								<div className="flex justify-center">
									<a
										href={post.tiktok}
										target="_blank"
										rel="noopener noreferrer"
										className="border-2 border-black rounded-md p-2 pr-3"
									>
										<h3 className="text-xl font-bold">
											📺 Assistir este post no TikTok
										</h3>
									</a>
								</div>
							)}
							<PostBody content={post.content} />
						</article>
					</>
				)}
			</Container>
		</Layout>
	);
}

type Params = {
	params: {
		slug: string;
	};
};

export async function getStaticProps({ params }: Params) {
	const post = getPostBySlug(params.slug, [
		"title",
		"date",
		"slug",
		"author",
		"content",
		"ogImage",
		"coverImage",
		"tiktok",
	]);
	const content = await markdownToHtml(post.content || "");

	return {
		props: {
			post: {
				...post,
				content,
			},
		},
	};
}

export async function getStaticPaths() {
	const posts = getAllPosts(["slug"]);

	return {
		paths: posts.map((post) => {
			return {
				params: {
					slug: post.slug,
				},
			};
		}),
		fallback: false,
	};
}
