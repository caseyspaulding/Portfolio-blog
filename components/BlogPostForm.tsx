'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createBlogPost } from '../app/actions/blogActions';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { Button } from '@nextui-org/button';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { CATEGORIES, TECHNOLOGIES, DIFFICULTY_LEVELS } from '@/constants/blogConstants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from '@/cn';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import EasyMDE from 'easymde'; // Make sure to import this explicitly
import 'easymde/dist/easymde.min.css';
import { marked } from 'marked'; // Add this import for markdown parsing
// Import SimpleMDE and styling
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

// Optional: Import mermaid for diagram rendering
import mermaid from 'mermaid';

// Diagram Modal Component
interface DiagramModalProps {
  onClose: () => void;
  onSubmit: (data: { title: string; content: string }) => void;
}

const DiagramModal = ({ onClose, onSubmit }: DiagramModalProps) =>
{
  const [ title, setTitle ] = useState( '' );
  const [ content, setContent ] = useState( '' );

  const handleSubmit = () =>
  {
    onSubmit( { title, content } );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Create Mermaid Diagram</h2>

        <div className="mb-4">
          <Label htmlFor="diagram-title">Diagram Title</Label>
          <Input
            id="diagram-title"
            value={ title }
            onChange={ ( e ) => setTitle( e.target.value ) }
            placeholder="Enter diagram title"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="diagram-content">Mermaid Code</Label>
          <Textarea
            id="diagram-content"
            value={ content }
            onChange={ ( e ) => setContent( e.target.value ) }
            placeholder="Enter Mermaid diagram code"
            className="min-h-[200px] font-mono"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button onClick={ onClose } variant="ghost">Cancel</Button>
          <Button onClick={ handleSubmit }>Insert Diagram</Button>
        </div>
      </div>
    </div>
  );
};

const BlogPostForm: React.FC = () =>
{
  const router = useRouter();
  const supabase = createClient();

  // State variables
  const [ user, setUser ] = useState<User | null>( null );
  const [ title, setTitle ] = useState( '' );
  const [ content, setContent ] = useState( '' );
  const [ excerpt, setExcerpt ] = useState( '' );
  const [ tags, setTags ] = useState( '' );
  const [ slug, setSlug ] = useState( '' );
  const [ metaTitle, setMetaTitle ] = useState( '' );
  const [ metaDescription, setMetaDescription ] = useState( '' );
  const [ isPublished, setIsPublished ] = useState( false );
  const [ featuredImage, setFeaturedImage ] = useState<File | null>( null );
  const [ showDiagramModal, setShowDiagramModal ] = useState( false );
  const [ categories, setCategories ] = useState<string[]>( [] );
  const [ technologies, setTechnologies ] = useState<string[]>( [] );
  const [ selectedCategories, setSelectedCategories ] = useState<string[]>( [] );
  const [ selectedTechnologies, setSelectedTechnologies ] = useState<string[]>( [] );
  const [ difficultyLevel, setDifficultyLevel ] = useState<string>( 'Beginner' );
  const [ openCategories, setOpenCategories ] = useState( false );
  const [ openTechnologies, setOpenTechnologies ] = useState( false );

  const calculateReadingTime = ( text: string ): number =>
  {
    const wordsPerMinute = 200; // Average reading speed
    const textLength = text.trim().split( /\s+/ ).length;
    return Math.ceil( textLength / wordsPerMinute );
  };

  // Initialize mermaid
  useEffect( () =>
  {
    mermaid.initialize( {
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      themeVariables: {
        fontSize: '30px',
        fontFamily: 'Arial',
        lineColor: 'gray',
      }
    } );
  }, [] );

  // Check user authentication
  useEffect( () =>
  {
    const checkUser = async () =>
    {
      const { data: { user } } = await supabase.auth.getUser();
      if ( user?.email !== 'casey.spaulding@gmail.com' )
      {
        toast.error( 'You do not have access to this page.' );
        router.push( '/' );
        return;
      }
      setUser( user );
    };
    checkUser();
  }, [ router, supabase ] );

  // Configuration for SimpleMDE
  const editorOptions: EasyMDE.Options = {
    autofocus: true,
    spellChecker: false,
    toolbar: [
      "bold" as const, "italic" as const, "heading" as const, "|" as const,
      "quote" as const, "unordered-list" as const, "ordered-list" as const, "|" as const,
      "link" as const, "image" as const, "|" as const,
      "code" as const, "table" as const, "|" as const,
      {
        name: "custom-diagram",
        action: () =>
        {
          setShowDiagramModal( true );
        },
        className: "fa fa-project-diagram",
        title: "Insert Mermaid Diagram",
      } as EasyMDE.ToolbarIcon,
      "|" as const,
      "preview" as const, "side-by-side" as const, "fullscreen" as const, "|" as const,
      "guide" as const
    ],
    renderingConfig: {
      codeSyntaxHighlighting: true,
    },
    previewRender: function(plainText: string): string {
      const html = marked.parse(plainText, { async: false }) as string;
      
      setTimeout(() => {
        // Initialize mermaid diagrams in the preview if needed
        if ( typeof mermaid !== 'undefined' )
        {
          document.querySelectorAll( '.editor-preview .mermaid' ).forEach( ( el ) =>
          {
            mermaid.init( undefined, el as HTMLElement );
          } );
        }
        // Re-highlight code blocks with Prism if needed
        if ( typeof window !== 'undefined' && ( window as any ).Prism )
        {
          ( window as any ).Prism.highlightAllUnder( document.querySelector( '.editor-preview' ) );
        }
      }, 0);

      return html;
    },
  };


  // Handle diagram insertion
  const handleDiagramSubmit = ( diagramData: { title: string; content: string } ) =>
  {
    // Add the diagram in markdown format
    const diagramMarkdown = `
### ${ diagramData.title }

\`\`\`mermaid
${ diagramData.content }
\`\`\`
`;
    setContent( prev => prev + diagramMarkdown );
  };

  // Image upload handler
  const handleImageUpload = async ( file: File | null ) =>
  {
    if ( !file )
    {
      console.error( 'No file selected' );
      return null;
    }

    const fileName = `${ Date.now() }-${ file.name }`;

    const { data, error } = await supabase
      .storage
      .from( 'blogimages' )
      .upload( `public/${ fileName }`, file, {
        cacheControl: '3600',
        upsert: false,
      } );

    if ( error )
    {
      console.error( 'Error uploading file:', error.message );
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from( 'blogimages' )
      .getPublicUrl( `public/${ fileName }` );

    return publicUrl || '';
  };

  const handleSubmit = async ( e: React.FormEvent ) =>
  {
    e.preventDefault();

    if ( !featuredImage )
    {
      toast.error( 'Please select a featured image.' );
      return;
    }

    try
    {
      const imageUrl = await handleImageUpload( featuredImage );

      if ( !imageUrl )
      {
        toast.error( 'Failed to upload the image.' );
        return;
      }

      // Combine all metadata into tags
      const metadataTags = [
        ...selectedCategories,
        ...selectedTechnologies,
        difficultyLevel,
        ...tags.split( ',' ).map( t => t.trim() ).filter( t => t )
      ].join( ', ' );

      const readingTime = calculateReadingTime( content );
      const formData = new FormData();
      formData.append( 'title', title );
      formData.append( 'content', content );
      formData.append( 'excerpt', excerpt );
      formData.append( 'authorId', '1' ); // Hardcode the author ID as 1
      formData.append( 'tags', metadataTags );
      formData.append( 'slug', slug );
      formData.append( 'metaTitle', metaTitle );
      formData.append( 'metaDescription', metaDescription );
      formData.append( 'isPublished', isPublished.toString() );
      formData.append( 'categories', JSON.stringify( categories ) );
      formData.append( 'technologies', JSON.stringify( technologies ) );
      formData.append( 'difficultyLevel', difficultyLevel );
      formData.append( 'readingTime', readingTime.toString() );
      formData.append( 'featuredImage', imageUrl );
      formData.append( 'publishedAt', new Date().toISOString() );

      const response = await createBlogPost( formData );
      if ( response.success )
      {
        toast.success( response.message );
        resetForm();
      } else
      {
        toast.error( response.message );
      }
    } catch ( error )
    {
      console.error( 'Error submitting blog post:', error );
      toast.error( 'An error occurred while creating the blog post.' );
    }
  };

  const resetForm = () =>
  {
    setTitle( '' );
    setContent( '' );
    setExcerpt( '' );
    setTags( '' );
    setSlug( '' );
    setMetaTitle( '' );
    setMetaDescription( '' );
    setIsPublished( false );
    setFeaturedImage( null );
    setSelectedCategories( [] );
    setSelectedTechnologies( [] );
  };

  if ( !user )
  {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <Card className="mx-auto max-w-6xl">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-foreground mb-8">Create New Blog Post</h1>
          <form onSubmit={ handleSubmit } className="space-y-6">
            {/* Post Title */ }
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

            {/* Featured Image */ }
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
                id="featuredImage"
                type="file"
                accept="image/*"
                onChange={ ( e ) => setFeaturedImage( e.target.files?.[ 0 ] || null ) }
                className="cursor-pointer"
              />
            </div>

            {/* URL Slug */ }
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
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Difficulty Level */ }
              <div className="space-y-2">
                <Label htmlFor="difficultyLevel">Difficulty Level</Label>
                <Select
                  value={ difficultyLevel }
                  onValueChange={ setDifficultyLevel }
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

              {/* Categories */ }
              <div className="space-y-2">
                <Label>Categories</Label>
                <Popover open={ openCategories } onOpenChange={ setOpenCategories }>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      role="combobox"
                      aria-expanded={ openCategories }
                      className="w-full justify-between"
                    >
                      { selectedCategories.length > 0
                        ? `${ selectedCategories.length } selected`
                        : "Select categories..." }
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full bg-white p-0">
                    <Command>
                      <CommandInput placeholder="Search categories..." />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        { CATEGORIES.map( ( category ) => (
                          <CommandItem
                            key={ category }
                            onSelect={ () =>
                            {
                              // Update selectedCategories and call setCategories to persist
                              const updatedCategories = selectedCategories.includes( category )
                                ? selectedCategories.filter( ( item ) => item !== category )
                                : [ ...selectedCategories, category ];
                              setSelectedCategories( updatedCategories );
                              setCategories( updatedCategories ); // Ensure persistence in the database
                            } }
                          >
                            <Check
                              className={ cn(
                                "mr-2 h-4 w-4",
                                selectedCategories.includes( category )
                                  ? "opacity-100"
                                  : "opacity-0"
                              ) }
                            />
                            { category }
                          </CommandItem>
                        ) ) }
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                { selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    { selectedCategories.map( ( category ) => (
                      <Badge
                        key={ category }
                        variant="default"
                        className="cursor-pointer"
                        onClick={ () =>
                        {
                          const updatedCategories = selectedCategories.filter(
                            ( c ) => c !== category
                          );
                          setSelectedCategories( updatedCategories );
                          setCategories( updatedCategories ); // Ensure persistence in the database
                        } }
                      >
                        { category } ×
                      </Badge>
                    ) ) }
                  </div>
                ) }
              </div>

              {/* Technologies - Similar to Categories */ }
              <div className="space-y-2">
                <Label>Technologies</Label>
                <Popover open={ openTechnologies } onOpenChange={ setOpenTechnologies }>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      role="combobox"
                      aria-expanded={ openTechnologies }
                      className="w-full justify-between"
                    >
                      { selectedTechnologies.length > 0
                        ? `${ selectedTechnologies.length } selected`
                        : "Select technologies..." }
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full bg-white p-0">
                    {/* Command component for Technologies */ }
                    <Command>
                      <CommandInput placeholder="Search technologies..." />
                      <CommandEmpty>No technology found.</CommandEmpty>
                      <CommandGroup>
                        { TECHNOLOGIES.map( ( tech ) => (
                          <CommandItem
                            key={ tech }
                            onSelect={ () =>
                            {
                              const updatedTechnologies = selectedTechnologies.includes( tech )
                                ? selectedTechnologies.filter( ( item ) => item !== tech )
                                : [ ...selectedTechnologies, tech ];
                              setSelectedTechnologies( updatedTechnologies );
                              setTechnologies( updatedTechnologies );
                            } }
                          >
                            <Check
                              className={ cn(
                                "mr-2 h-4 w-4",
                                selectedTechnologies.includes( tech )
                                  ? "opacity-100"
                                  : "opacity-0"
                              ) }
                            />
                            { tech }
                          </CommandItem>
                        ) ) }
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                { selectedTechnologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    { selectedTechnologies.map( ( tech ) => (
                      <Badge
                        key={ tech }
                        variant="default"
                        className="cursor-pointer"
                        onClick={ () =>
                        {
                          const updatedTechnologies = selectedTechnologies.filter(
                            ( t ) => t !== tech
                          );
                          setSelectedTechnologies( updatedTechnologies );
                          setTechnologies( updatedTechnologies );
                        } }
                      >
                        { tech } ×
                      </Badge>
                    ) ) }
                  </div>
                ) }
              </div>
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
                className="min-h-[100px]"
              />
            </div>

            {/* SimpleMDE Editor */ }
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <div className="border border-input rounded-md overflow-hidden">
                <SimpleMDE
                  value={ content }
                  onChange={ setContent }
                  options={ editorOptions }
                />
              </div>
              <p className="text-sm text-gray-500">
                Use markdown for formatting. For code blocks, use triple backticks followed by the language name: <code>```javascript</code>
              </p>
            </div>

            {/* Diagram Modal */ }
            { showDiagramModal && (
              <DiagramModal
                onClose={ () => setShowDiagramModal( false ) }
                onSubmit={ handleDiagramSubmit }
              />
            ) }

            {/* Tags */ }
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={ tags }
                onChange={ ( e ) => setTags( e.target.value ) }
                placeholder="Tags (comma-separated)"
              />
            </div>

            {/* Published Checkbox */ }
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPublished"
                checked={ isPublished }
                onCheckedChange={ ( checked ) =>
                  setIsPublished( checked as boolean )
                }
              />
              <Label
                htmlFor="isPublished"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Published
              </Label>
            </div>

            {/* Submit Button */ }
            <Button type="submit" className="w-full bg-blue-400">
              Create Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPostForm;