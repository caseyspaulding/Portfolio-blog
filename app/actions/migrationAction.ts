import TurndownService from 'turndown';

import { eq, or, isNull } from 'drizzle-orm';
import { db } from '@/db';
import { blogPosts } from '@/db/schemas/schema';

export async function migrateHtmlToMarkdown ()
{
  // First install turndown: npm install turndown @types/turndown
  const turndown = new TurndownService( {
    codeBlockStyle: 'fenced',
    headingStyle: 'atx',
    bulletListMarker: '-'
  } );

  // Check all posts first for debugging
  const allPosts = await db
    .select()
    .from( blogPosts );

  console.log( `Total posts in database: ${ allPosts.length }` );
  console.log( `Content formats found: ${ [ ...new Set( allPosts.map( p => p.contentFormat ) ) ].join( ', ' ) }` );

  // Get all posts that are HTML or don't have a contentFormat
  const postsToMigrate = await db
    .select()
    .from( blogPosts )
    .where(
      or(
        eq( blogPosts.contentFormat, 'html' ),
        isNull( blogPosts.contentFormat )
      )
    );

  console.log( `Posts to migrate: ${ postsToMigrate.length }` );

  if ( postsToMigrate.length === 0 )
  {
    return { success: true, message: 'No posts to migrate' };
  }

  // Improve turndown conversion for code blocks
  turndown.addRule( 'codeBlocks', {
    filter: function ( node: HTMLElement )
    {
      return !!(
        node.nodeName === 'PRE' &&
        node.firstChild &&
        node.firstChild.nodeName === 'CODE'
      );
    },
    replacement: function ( content: any, node: HTMLElement )
    {
      // Extract language from class if available
      const codeElement = node.firstChild as HTMLElement;
      let language = '';

      if ( codeElement && codeElement.className )
      {
        const match = codeElement.className.match( /language-(\w+)/ );
        if ( match ) language = match[ 1 ];
      }

      const code = codeElement.textContent || '';
      return `\n\`\`\`${ language }\n${ code.trim() }\n\`\`\`\n`;
    }
  } );

  // Process each post
  let successCount = 0;
  let errorCount = 0;

  for ( const post of postsToMigrate )
  {
    try
    {
      // Convert HTML to Markdown
      const markdownContent = turndown.turndown( post.content );

      // Update in database
      await db
        .update( blogPosts )
        .set( {
          content: markdownContent,
          contentFormat: 'markdown',
          updatedAt: new Date()
        } )
        .where( eq( blogPosts.id, post.id ) );

      successCount++;
      console.log( `Migrated post ID ${ post.id }: "${ post.title.substring( 0, 30 ) }..."` );
    } catch ( error )
    {
      errorCount++;
      console.error( `Error migrating post ID ${ post.id }:`, error );
    }
  }

  return {
    success: true,
    message: `Migration complete: ${ successCount } posts migrated successfully, ${ errorCount } errors`,
    details: {
      total: postsToMigrate.length,
      success: successCount,
      errors: errorCount
    }
  };
}