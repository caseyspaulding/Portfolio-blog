'use client';


import dynamic from 'next/dynamic';

const BlogPostForm = dynamic(() => import('@/components/BlogPostForm'), {
    ssr: false
});

export default function BlogPost() {
    return (
        <div>
            <BlogPostForm />
          
        </div>
    );
}
