import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">쉽게 따라하기</h1>
      <p className="text-gray-500 mb-8">스마트폰, 앱, 생활 민원 — 누구나 따라할 수 있게 정리했어요</p>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="border rounded-lg p-5 hover:shadow-md transition-shadow">
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-xl font-semibold text-blue-700 hover:underline mb-1">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 text-sm mb-3">{post.description}</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{post.date}</span>
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
