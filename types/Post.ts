export type Post = {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    author: string;
    tags: string[] | null;
    featuredImage: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    isPublished: boolean | null;
    createdAt: Date;
    updatedAt: Date;
};
