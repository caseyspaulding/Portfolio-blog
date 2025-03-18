'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Tabs, Tab } from '@nextui-org/tabs';

// Add this component inside your BlogPostForm
const MarkdownPreview = ( { content }: { content: string } ) =>
{
  // Convert HTML to Markdown (simplified)
  interface CodeBlockMatch {
    language: string;
    content: string;
  }

  interface HtmlToMarkdownFunction {
    (html: string): string;
  }

  const htmlToMarkdown: HtmlToMarkdownFunction = (html) => {
    // This is a basic implementation
    // For more comprehensive conversion, consider using a library like turndown
    let markdown: string = html;

    // Replace basic HTML elements with markdown equivalents
    markdown = markdown.replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n');
    markdown = markdown.replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n');
    markdown = markdown.replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n');
    markdown = markdown.replace(/<p>(.*?)<\/p>/g, '$1\n\n');
    markdown = markdown.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
    markdown = markdown.replace(/<em>(.*?)<\/em>/g, '*$1*');
    markdown = markdown.replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)');
    markdown = markdown.replace(/<ul>(.*?)<\/ul>/g, '$1\n');
    markdown = markdown.replace(/<li>(.*?)<\/li>/g, '- $1\n');
    markdown = markdown.replace(/<br>/g, '\n');

    // Handle code blocks (preserve them)
    markdown = markdown.replace(/<pre><code class="language-(.*?)">([\s\S]*?)<\/code><\/pre>/g,
      '```$1\n$2\n```\n\n');

    return markdown;
  };

  // Extract markdown from HTML content
  const markdownContent = htmlToMarkdown( content );

  return (
    <div className="markdown-preview">
      <div className="prose max-w-none">
        <ReactMarkdown
          remarkPlugins={ [ remarkGfm ] }
          rehypePlugins={ [ rehypeRaw ] }
        >
          { markdownContent }
        </ReactMarkdown>
      </div>
    </div>
  );
};

// Add a direct markdown content editor button to your editor
const markdownButton = {
  name: 'insertMarkdown',
  icon: 'M↓',
  tooltip: 'Insert Raw Markdown',
  exec: ( editor: { selection: { insertHTML: ( arg0: string ) => void; }; } ) =>
  {
    const markdownText = prompt( 'Enter markdown content:' );
    if ( markdownText )
    {
      // For demonstration, we're simply wrapping markdown in a special div
      // In a real implementation, you might want to use a custom renderer or process it differently
      const htmlContent = `<div class="raw-markdown" data-markdown="${ encodeURIComponent( markdownText ) }">
        ${ markdownText }
      </div>`;
      editor.selection.insertHTML( htmlContent );
    }
    return false;
  }
};

// Add CSS for markdown preview
const markdownStyles = `
.markdown-preview {
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #ffffff;
}

.markdown-preview h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.markdown-preview h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  margin-top: 1.5rem;
}

.markdown-preview h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  margin-top: 1.25rem;
}

.markdown-preview p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.markdown-preview ul, .markdown-preview ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.markdown-preview li {
  margin-bottom: 0.5rem;
}

.markdown-preview code {
  background-color: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: monospace;
}

.markdown-preview pre {
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.markdown-preview pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
}

.markdown-preview blockquote {
  border-left: 4px solid #d1d5db;
  padding-left: 1rem;
  font-style: italic;
  margin-bottom: 1rem;
}

.markdown-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.markdown-preview a {
  color: #2563eb;
  text-decoration: underline;
}

.raw-markdown {
  font-family: monospace;
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.375rem;
  white-space: pre-wrap;
}
`;