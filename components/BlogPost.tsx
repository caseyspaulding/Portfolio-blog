// components/BlogPost.tsx
import React from 'react';

interface BlogPostProps
{
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const BlogPost: React.FC<BlogPostProps> = ( { title, content, author, createdAt } ) =>
{
  return (
    <article>
      <h1>{ title }</h1>
      <div dangerouslySetInnerHTML={ { __html: content } } />
      <p>By { author } on { new Date( createdAt ).toLocaleDateString() }</p>
    </article>
  );
};

export default BlogPost;