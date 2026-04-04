import { getAllPosts, getPost } from "@/lib/posts";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return { title: post.title, description: post.description };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  return (
    <div className="max-w-2xl mx-auto">
      {/* 뒤로가기 */}
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700 mb-6">
        ← 목록으로
      </Link>

      {/* 헤더 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 mb-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">{post.title}</h1>
        <p className="text-gray-500 text-sm">{post.description}</p>
        <p className="text-gray-300 text-xs mt-3">{post.date}</p>
      </div>

      {/* 상단 광고 */}
      <AdBanner slot="1234567890" format="horizontal" />

      {/* 본문 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
        />
      </div>

      {/* 하단 광고 */}
      <AdBanner slot="0987654321" format="rectangle" />

      {/* 하단 홈 링크 */}
      <div className="text-center mt-8">
        <Link href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
          다른 방법 보러가기
        </Link>
      </div>
    </div>
  );
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3 class='text-base font-bold mt-7 mb-2 text-gray-800'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class='text-lg font-bold mt-9 mb-3 text-gray-900 border-l-4 border-blue-400 pl-3'>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class='text-xl font-bold mt-8 mb-4 text-gray-900'>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong class='font-semibold text-gray-900'>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class='bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-sm font-mono'>$1</code>")
    .replace(/^\|(.+)\|$/gm, (row) => {
      const cells = row.split("|").filter(Boolean).map(c => c.trim());
      const isHeader = false;
      return `<tr>${cells.map(c => `<td class='border border-gray-200 px-3 py-2 text-sm'>${c}</td>`).join("")}</tr>`;
    })
    .replace(/^(\d+)\. (.+)$/gm, "<li class='ml-5 list-decimal mb-1 text-gray-700'>$2</li>")
    .replace(/^- (.+)$/gm, "<li class='ml-5 list-disc mb-1 text-gray-700'>$1</li>")
    .replace(/\n\n/g, "</p><p class='my-3 text-gray-700 leading-relaxed'>")
    .replace(/^(?!<)(.+)$/gm, "<p class='my-3 text-gray-700 leading-relaxed'>$1</p>");
}
