// scripts/migrate-content.ts

import { migrateHtmlToMarkdown } from "@/app/actions/migrationAction";




async function run ()
{
  console.log( 'Starting HTML to Markdown migration...' );

  try
  {
    const result = await migrateHtmlToMarkdown();
    console.log( result.message );
  } catch ( error )
  {
    console.error( 'Migration failed:', error );
  } finally
  {
    // Close database connection
   
  }
}

run();