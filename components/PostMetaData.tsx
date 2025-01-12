// PostMetadata.tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Constants for dropdown options
const DIFFICULTY_LEVELS = [ 'Beginner', 'Intermediate', 'Advanced' ] as const;
type DifficultyLevel = typeof DIFFICULTY_LEVELS[ number ];

const CATEGORIES = [
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
type Category = typeof CATEGORIES[ number ];

interface PostMetadataProps
{
  title: string;
  setTitle: ( title: string ) => void;
  slug: string;
  setSlug: ( slug: string ) => void;
  metaTitle: string;
  setMetaTitle: ( metaTitle: string ) => void;
  metaDescription: string;
  setMetaDescription: ( metaDescription: string ) => void;
  featuredImage: File | null;
  setFeaturedImage: ( file: File | null ) => void;
  featuredImageURL: string;
  setFeaturedImageURL: ( url: string ) => void;
  isPublished: boolean;
  setIsPublished: ( isPublished: boolean ) => void;
  excerpt: string;
  setExcerpt: ( excerpt: string ) => void;
  tags: string[];
  setTags: ( tags: string[] ) => void;
  // New props
  difficultyLevel: DifficultyLevel | '';
  setDifficultyLevel: ( level: DifficultyLevel | '' ) => void;
  categories: Category[];
  setCategories: ( categories: Category[] ) => void;
  technologies: string[];
  setTechnologies: ( technologies: string[] ) => void;
  readingTime: number;
  setReadingTime: ( time: number ) => void;
}

export function PostMetadata ( {
  title,
  setTitle,
  slug,
  setSlug,
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
  featuredImage,
  setFeaturedImage,
  featuredImageURL,
  setFeaturedImageURL,
  isPublished,
  setIsPublished,
  excerpt,
  setExcerpt,
  tags,
  setTags,
  difficultyLevel,
  setDifficultyLevel,
  categories,
  setCategories,
  technologies,
  setTechnologies,
  readingTime,
  setReadingTime
}: PostMetadataProps )
{
  const handleImageChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>
  {
    const file = e.target.files?.[ 0 ];
    if ( file )
    {
      setFeaturedImage( file );
      const tempUrl = URL.createObjectURL( file );
      setFeaturedImageURL( tempUrl );
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */ }
      <div className="space-y-2">
        <Label htmlFor="title">Post Title</Label>
        <Input
          id="title"
          name="title"
          value={ title }
          onChange={ ( e ) => setTitle( e.target.value ) }
          placeholder="Post Title"
          required
        />
      </div>

      {/* Difficulty and Reading Time */ }
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty Level</Label>
          <Select
            value={ difficultyLevel }
            onValueChange={ ( value ) => setDifficultyLevel( value as DifficultyLevel ) }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              { DIFFICULTY_LEVELS.map( ( level ) => (
                <SelectItem key={ level } value={ level }>
                  { level }
                </SelectItem>
              ) ) }
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="readingTime">Reading Time (minutes)</Label>
          <Input
            id="readingTime"
            type="number"
            value={ readingTime }
            onChange={ ( e ) => setReadingTime( Number( e.target.value ) ) }
            min={ 1 }
          />
        </div>
      </div>

      {/* Categories */ }
      <div className="space-y-2">
        <Label htmlFor="categories">Categories</Label>
        <div className="flex flex-wrap gap-2 p-2 border rounded-md">
          { CATEGORIES.map( ( category ) => (
            <div
              key={ category }
              className={ `px-3 py-1 rounded-full cursor-pointer ${ categories.includes( category )
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
                }` }
              onClick={ () =>
              {
                setCategories(
                  categories.includes( category )
                    ? categories.filter( ( c ) => c !== category )
                    : [ ...categories, category ]
                );
              } }
            >
              { category }
            </div>
          ) ) }
        </div>
      </div>

      {/* Technologies */ }
      <div className="space-y-2">
        <Label htmlFor="technologies">Technologies (comma-separated)</Label>
        <Input
          id="technologies"
          value={ technologies.join( ', ' ) }
          onChange={ ( e ) => setTechnologies( e.target.value.split( ',' ).map( tech => tech.trim() ) ) }
          placeholder="React, TypeScript, Next.js, etc."
        />
      </div>

      {/* Slug */ }
      <div className="space-y-2">
        <Label htmlFor="slug">URL Slug</Label>
        <Input
          id="slug"
          name="slug"
          value={ slug }
          onChange={ ( e ) => setSlug( e.target.value ) }
          placeholder="URL Slug"
        />
      </div>

      {/* Meta Title */ }
      <div className="space-y-2">
        <Label htmlFor="metaTitle">Meta Title</Label>
        <Input
          id="metaTitle"
          name="metaTitle"
          value={ metaTitle }
          onChange={ ( e ) => setMetaTitle( e.target.value ) }
          placeholder="Meta Title"
        />
      </div>

      {/* Meta Description */ }
      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          name="metaDescription"
          value={ metaDescription }
          onChange={ ( e ) => setMetaDescription( e.target.value ) }
          placeholder="Meta Description"
        />
      </div>

      {/* Featured Image */ }
      <div className="space-y-2">
        <Label htmlFor="featuredImage">Featured Image</Label>
        <Input
          id="featuredImage"
          type="file"
          onChange={ handleImageChange }
          accept="image/*"
          className="cursor-pointer"
        />
        { featuredImageURL && (
          <div className="mt-2">
            <img
              src={ featuredImageURL }
              alt="Featured"
              className="mt-2 h-48 w-full rounded-lg object-cover"
            />
            <Button
              type="button"
              onClick={ () =>
              {
                setFeaturedImageURL( '' );
                setFeaturedImage( null );
              } }
              className="mt-2 text-cyan-700"
            >
              Remove Image
            </Button>
          </div>
        ) }
      </div>

      {/* Published Status */ }
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isPublished"
          checked={ isPublished }
          onCheckedChange={ ( checked ) =>
            setIsPublished( checked as boolean )
          }
        />
        <Label htmlFor="isPublished">Published</Label>
      </div>

      {/* Excerpt */ }
      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={ excerpt }
          onChange={ ( e ) => setExcerpt( e.target.value ) }
          placeholder="Excerpt"
        />
      </div>

      {/* Tags */ }
      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          name="tags"
          value={ tags.join( ', ' ) }
          onChange={ ( e ) =>
            setTags( e.target.value.split( ',' ).map( ( tag ) => tag.trim() ) )
          }
          placeholder="Tags (comma-separated)"
        />
      </div>
    </div>
  );
}