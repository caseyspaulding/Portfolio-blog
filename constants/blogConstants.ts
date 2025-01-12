export const DIFFICULTY_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced'
] as const;

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

export const TECHNOLOGIES = [
  'React',
  'Next.js',
  'TypeScript',
  'Python',
  'Node.js',
  'PostgreSQL',
  'AWS',
  'Docker',
  'Kubernetes',
  'TensorFlow',
  'PyTorch',
  'JavaScript',
  'GraphQL',
  'REST API',
  'Supabase'
] as const;

export type DifficultyLevel = typeof DIFFICULTY_LEVELS[ number ];
export type Category = typeof CATEGORIES[ number ];
export type Technology = typeof TECHNOLOGIES[ number ];

interface MetaData
{
  categories: Category[];
  technologies: string[];
  difficultyLevel: DifficultyLevel;
  readingTime?: number;
}

// Function to parse tags string into structured metadata
export function parseMetadataFromTags ( tags: string ): MetaData
{
  const tagArray = tags.split( ',' ).map( t => t.trim() );

  return {
    categories: tagArray.filter( tag =>
      CATEGORIES.includes( tag as Category )
    ) as Category[],
    technologies: tagArray.filter( tag =>
      TECHNOLOGIES.includes( tag as Technology )
    ),
    difficultyLevel: ( tagArray.find( tag =>
      DIFFICULTY_LEVELS.includes( tag as DifficultyLevel )
    ) as DifficultyLevel ) || 'Beginner',
  };
}

// Function to combine metadata into tags string
export function combineMetadataToTags ( metadata: MetaData ): string
{
  const allTags = [
    ...metadata.categories,
    ...metadata.technologies,
    metadata.difficultyLevel
  ];
  return allTags.join( ', ' );
}