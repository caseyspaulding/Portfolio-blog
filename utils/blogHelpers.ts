// utils/blogHelpers.ts

export const DIFFICULTY_LEVELS = [ 'Beginner', 'Intermediate', 'Advanced' ] as const;
export type DifficultyLevel = typeof DIFFICULTY_LEVELS[ number ];

export const CATEGORIES = [
  'Software Engineering',
  'System Design',
  'AI/ML',
  'Cloud Computing',
  'DevOps',
  'Frontend',
  'Backend',
  'Data Science',
  'Security',
  'Best Practices'
] as const;
export type Category = typeof CATEGORIES[ number ];

interface ParsedTags
{
  difficulty?: DifficultyLevel;
  categories: Category[];
  technologies: string[];
  generalTags: string[];
}

export function parseTags ( tags: string | null ): ParsedTags
{
  if ( !tags )
  {
    return { categories: [], technologies: [], generalTags: [] };
  }

  const tagArray = tags.split( ',' ).map( t => t.trim() );

  return {
    difficulty: tagArray.find( tag =>
      DIFFICULTY_LEVELS.includes( tag as DifficultyLevel )
    ) as DifficultyLevel | undefined,

    categories: tagArray.filter( tag =>
      CATEGORIES.includes( tag as Category )
    ) as Category[],

    technologies: tagArray.filter( tag =>
      tag.startsWith( 'tech:' )
    ).map( tag => tag.replace( 'tech:', '' ) ),

    generalTags: tagArray.filter( tag =>
      !DIFFICULTY_LEVELS.includes( tag as DifficultyLevel ) &&
      !CATEGORIES.includes( tag as Category ) &&
      !tag.startsWith( 'tech:' )
    )
  };
}

export function estimateReadingTime ( content: string ): number
{
  const wordsPerMinute = 200;
  const wordCount = content.trim().split( /\s+/ ).length;
  return Math.ceil( wordCount / wordsPerMinute );
}

// Usage Example:
// Tags format: "Intermediate,System Design,AI/ML,tech:Python,tech:TensorFlow,cloud,security"
