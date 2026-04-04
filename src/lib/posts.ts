import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(".md", "");
      const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags ?? [],
        image: data.image,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const CATEGORIES: Record<string, { label: string; tags: string[] }> = {
  smartphone: {
    label: "스마트폰",
    tags: ["아이폰", "갤럭시", "안드로이드", "iOS", "웨어러블", "애플워치"],
  },
  app: {
    label: "앱 서비스",
    tags: ["카카오톡", "카카오페이", "네이버", "네이버지도", "유튜브", "인스타그램", "구글지도", "PASS", "삼성패스"],
  },
  pc: {
    label: "PC·윈도우",
    tags: ["윈도우", "PC", "크롬", "엑셀", "PDF", "브라우저", "PC속도"],
  },
  life: {
    label: "생활 민원",
    tags: ["정부24", "민원", "건강보험", "본인인증", "모바일신분증"],
  },
};

export function getPostsByCategory(category: string): PostMeta[] {
  const cat = CATEGORIES[category];
  if (!cat) return [];
  const all = getAllPosts();
  return all.filter((post) => post.tags.some((tag) => cat.tags.includes(tag)));
}

export function getPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(postsDir, `${slug}.md`), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags ?? [],
    image: data.image,
    content,
  };
}
