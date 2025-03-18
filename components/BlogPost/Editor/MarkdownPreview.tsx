// components/BlogPost/Editor/MarkdownPreview.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { MarkdownPreviewProps } from '../types';

// Simple HTML to Markdown converter - for more robust conversion, consider using a library like turndown
const htmlToMarkdown = ( html: string ): string =>
{
  // This is a basic implementation
  let markdown = html;

  // Replace basic HTML elements with markdown equivalents
  markdown = markdown.replace( /<h1>(.*?)<\/h1>/g, '# $1\n\n' );
  markdown = markdown.replace( /<h2>(.*?)<\/h2>/g, '## $1\n\n' );
  markdown = markdown.replace( /<h3>(.*?)<\/h3>/g, '### $1\n\n' );
  markdown = markdown.replace( /<p>(.*?)<\/p>/g, '$1\n\n' );
  markdown = markdown.replace( /<strong>(.*?)<\/strong>/g, '**$1**' );
  markdown = markdown.replace( /<em>(.*?)<\/em>/g, '*$1*' );
  markdown = markdown.replace( /<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)' );
  markdown = markdown.replace( /<ul>(.*?)<\/ul>/g, '$1\n' );
  markdown = markdown.replace( /<li>(.*?)<\/li>/g, '- $1\n' );
  markdown = markdown.replace( /<br>/g, '\n' );

  // Handle code blocks (preserve them)
  markdown = markdown.replace( /<pre><code class="language-(.*?)">([\s\S]*?)<\/code><\/pre>/g,
    '```$1\n$2\n```\n\n' );

  return markdown;
};

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ( { content } ) =>
{
  return (
    <div className="markdown-preview">
      <ReactMarkdown
        remarkPlugins={ [ remarkGfm ] }
        rehypePlugins={ [ rehypeRaw ] }
        components={{
          div: ({node, ...props}) => <div className="prose max-w-none" {...props} />
        }}
      >
        { htmlToMarkdown( content ) }
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;