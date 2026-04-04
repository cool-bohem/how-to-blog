import { getAllPosts, getPost } from "@/lib/posts";
import AdBanner from "@/components/AdBanner";
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
    <article>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-400 text-sm mb-6">{post.date}</p>

      {/* 상단 광고 */}
      <AdBanner slot="1234567890" format="horizontal" />

      {/* 본문 */}
      <div
        className="prose prose-blue max-w-none"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
      />

      {/* 하단 광고 */}
      <AdBanner slot="0987654321" format="rectangle" />
    </article>
  );
}

// 간단한 마크다운 → HTML 변환 (별도 라이브러리 없이)
function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3 class='text-lg font-semibold mt-6 mb-2'>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2 class='text-xl font-bold mt-8 mb-3'>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class='text-2xl font-bold mt-8 mb-4'>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code class='bg-gray-100 px-1 rounded text-sm'>$1</code>")
    .replace(/^\d+\. (.+)$/gm, "<li class='ml-5 list-decimal'>$1</li>")
    .replace(/^- (.+)$/gm, "<li class='ml-5 list-disc'>$1</li>")
    .replace(/\n\n/g, "</p><p class='my-4'>")
    .replace(/^(?!<)(.+)$/gm, "<p class='my-4'>$1</p>");
}
