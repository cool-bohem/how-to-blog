import { CATEGORIES, getPostsByCategory } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES[category];
  return {
    title: cat?.label ?? category,
    description: `${cat?.label} 관련 방법을 쉽게 알려드려요`,
  };
}

const TAG_COLORS: Record<string, string> = {
  "아이폰": "bg-blue-100 text-blue-700",
  "갤럭시": "bg-purple-100 text-purple-700",
  "카카오톡": "bg-yellow-100 text-yellow-700",
  "윈도우": "bg-sky-100 text-sky-700",
  "PC": "bg-sky-100 text-sky-700",
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

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES[category];
  const posts = getPostsByCategory(category);

  if (!cat) {
    return <div className="text-center py-20 text-gray-400">존재하지 않는 카테고리예요.</div>;
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl px-8 py-10 mb-10 text-white shadow-md">
        <p className="text-blue-200 text-sm mb-1">
          <Link href="/" className="hover:text-white">홈</Link> &rsaquo; {cat.label}
        </p>
        <h1 className="text-3xl font-bold">{cat.label}</h1>
        <p className="text-blue-100 text-base mt-1">총 {posts.length}개의 방법 안내</p>
      </div>

      {/* 카드 그리드 */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-400 py-20">아직 글이 없어요.</p>
      ) : (
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
                    📋
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
      )}
    </div>
  );
}
