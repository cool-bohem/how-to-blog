import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

const TAG_COLORS: Record<string, string> = {
  "아이폰": "bg-blue-100 text-blue-700",
  "갤럭시": "bg-purple-100 text-purple-700",
  "카카오톡": "bg-yellow-100 text-yellow-700",
  "윈도우": "bg-sky-100 text-sky-700",
  "PC": "bg-sky-100 text-sky-700",
  "민원": "bg-green-100 text-green-700",
  "정부24": "bg-green-100 text-green-700",
  "건강보험": "bg-green-100 text-green-700",
  "엑셀": "bg-emerald-100 text-emerald-700",
  "네이버": "bg-lime-100 text-lime-700",
  "유튜브": "bg-red-100 text-red-700",
  "인스타그램": "bg-pink-100 text-pink-700",
};

function tagColor(tag: string) {
  return TAG_COLORS[tag] ?? "bg-gray-100 text-gray-600";
}

const CATEGORY_ICONS: Record<string, string> = {
  "아이폰": "🍎",
  "갤럭시": "📱",
  "카카오톡": "💬",
  "윈도우": "💻",
  "PC": "💻",
  "민원": "🏛️",
  "정부24": "🏛️",
  "건강보험": "🏥",
  "엑셀": "📊",
  "네이버": "🔍",
  "유튜브": "▶️",
  "인스타그램": "📸",
};

function postIcon(tags: string[]) {
  for (const tag of tags) {
    if (CATEGORY_ICONS[tag]) return CATEGORY_ICONS[tag];
  }
  return "📋";
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      {/* 히어로 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl px-8 py-10 mb-10 text-white shadow-md">
        <h1 className="text-3xl font-bold mb-2">쉽게 따라하기</h1>
        <p className="text-blue-100 text-base">스마트폰 · 앱 · PC · 생활 민원까지 — 누구나 따라할 수 있게 정리했어요</p>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`}>
            <article className="bg-white rounded-xl shadow-sm border border-gray-100 h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col overflow-hidden">
              {post.image ? (
                <div className="relative w-full h-40">
                  <Image src={post.image} alt={post.title} fill className="object-cover" unoptimized />
                </div>
              ) : (
                <div className="w-full h-40 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-5xl">
                  {postIcon(post.tags)}
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
              <h2 className="text-base font-bold text-gray-800 mb-2 leading-snug line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{post.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColor(tag)}`}>
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-gray-300 ml-auto">{post.date}</span>
              </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
