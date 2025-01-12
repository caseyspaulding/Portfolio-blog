'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { createBlogPost } from '../app/actions/blogActions';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { Button } from '@nextui-org/button';
import JoditEditor from 'jodit-react';
import mermaid from 'mermaid';
import DiagramModal from './DiagramModal';
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { CATEGORIES, TECHNOLOGIES, DIFFICULTY_LEVELS, parseMetadataFromTags } from '@/constants/blogConstants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from '@/cn';


const categoryOptions = [
  'Web Development',
  'Mobile Development',
  'DevOps',
  'Data Science',
  'Machine Learning',
  'Cybersecurity'
];

const technologyOptions = [
  'React',
  'Node.js',
  'Python',
  'TypeScript',
  'Docker',
  'AWS'
];

const difficultyOptions = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert'
];

interface DiagramData
{
  id: string;
  type: 'mermaid';
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}


interface Author
{
  id: number;
  name: string;
}

interface CreateBlogPostResponse
{
  success: boolean;
  message: string;
}

const BlogPostForm: React.FC = () =>
{
  const router = useRouter();
  const supabase = createClient();
  const editor = useRef( null );

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
  const [ postImage, setPostImage ] = useState<File | null>( null );
  const [ diagrams, setDiagrams ] = useState<DiagramData[]>( [] );
  const [ showDiagramModal, setShowDiagramModal ] = useState( false );
  const [ categories, setCategories ] = useState<string[]>( [] );
  const [ technologies, setTechnologies ] = useState<string[]>( [] );
  const [ currentDiagram, setCurrentDiagram ] = useState( {
    content: '',
    title: ''
  } );
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
  // Initialize Prism.js when content changes
  useEffect( () =>
  {
    if ( typeof window !== 'undefined' )
    {
      ( window as any ).Prism.highlightAll();
    }
  }, [ content ] );

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


  useEffect( () =>
  {

  }, [ showDiagramModal ] );
  // Configuration for the editor
  interface JoditConfig
  {
    readonly: boolean;
    placeholder: string;
    buttons: Array<string | { name: string; icon: string; tooltip: string; exec: ( editor: any ) => boolean }>;
    events: {
      'insertDiagram.click': () => boolean;
    };
  }

  const config = useMemo(
    () => ( {
      readonly: false,
      placeholder: 'Start typing your blog post...',
      height: 500, // Add a fixed height to prevent resizing issues
      enableDragAndDropFileToEditor: true,
      buttons: [
        'source', '|',
        'bold', 'italic', 'underline', '|',
        'ul', 'ol', '|',
        'font', 'fontsize', 'brush', 'paragraph', '|',
        'image', 'table', 'link', '|',
        'left', 'center', 'right', 'justify', '|',
        'undo', 'redo', '|',
        'hr', 'eraser', 'fullsize', '|',
        {
          name: 'insertDiagram',
          icon: '📊',
          tooltip: 'Insert Mermaid Diagram',
          exec: ( _editor: any ) =>
          {
            setShowDiagramModal( true );
            return false;
          }
        },
        {
          name: 'insertCode',
          icon: '⌨️',
          tooltip: 'Insert Code Block',
          exec: ( editor ) =>
          {
            const language = prompt( 'Enter programming language (e.g., javascript, python, typescript):' );
            if ( language )
            {
              const code = `<pre><code class="language-${ language }">\n// Your code here\n</code></pre>`;
              editor.selection.insertHTML( code );
            }
            return false;
          }
        }
      ],
      events: {
        'change': () =>
        {
          if ( typeof window !== 'undefined' )
          {
            setTimeout( () =>
            {
              ( window as any ).Prism.highlightAll();
            }, 0 );
          }
        }
      },
      askBeforePasteHTML: false, // Add this to prevent paste interruptions
      defaultMode: 1,
      removeButtons: [ 'about' ],
      showXPathInStatusbar: false,
      spellcheck: true,
      editorCssClass: 'prose max-w-none', // If you're using Tailwind's typography plugin
      style: {
        background: '#ffffff',
        color: '#000000',
      },
      colors: {
        background: [ '#ffffff' ],
        border: [ '#d1d5db' ],
        buttons: [ '#000000' ],
        icons: [ '#000000' ],
        panel: [ '#ffffff' ],
        text: [ '#000000' ],
        textPanels: [ '#000000' ]
      },
      // Add custom CSS
      css: `
      .jodit-workplace {
        background-color: #ffffff !important;
      }
      .jodit-wysiwyg {
        background-color: #ffffff !important;
        color: #000000 !important;
      }
      .jodit-toolbar__box {
        background-color: #ffffff !important;
        border-bottom: 1px solid #d1d5db !important;
      }
      .jodit-toolbar-button {
        color: #000000 !important;
      }
      .jodit-toolbar-button:hover {
        background-color: #f3f4f6 !important;
      }
      .jodit-toolbar-button__icon {
        fill: #000000 !important;
      }
      .jodit-status-bar {
        background-color: #ffffff !important;
        border-top: 1px solid #d1d5db !important;
        color: #000000 !important;
      }
      .jodit-wysiwyg pre {
        background: #1e1e1e !important;
        border-radius: 4px !important;
        padding: 15px !important;
        margin: 15px 0 !important;
        overflow-x: auto !important;
      }
      .jodit-wysiwyg code {
        font-family: 'Monaco', 'Consolas', 'Courier New', monospace !important;
        font-size: 14px !important;
        line-height: 1.4 !important;
        color: #d4d4d4 !important;
      }
      .jodit-container {
        border-color: #d1d5db !important;
      }
      .jodit-container:not(.jodit_inline) {
        border: 1px solid #d1d5db !important;
        border-radius: 0.375rem !important;
      }
      .jodit-placeholder {
        color: #6b7280 !important;
      }
      .jodit-wysiwyg table {
        border-collapse: collapse !important;
        width: 100% !important;
      }
      .jodit-wysiwyg table td,
      .jodit-wysiwyg table th {
        border: 1px solid #d1d5db !important;
        padding: 8px !important;
      }
      .jodit-toolbar-button.jodit-toolbar-button_size_middle {
        background-color: transparent !important;
      }
      .jodit-toolbar-button.jodit-toolbar-button_size_middle:hover {
        background-color: #f3f4f6 !important;
      }
      .jodit .jodit-workplace + .jodit-status-bar:not(:empty) {
        border-top: 1px solid #d1d5db !important;
        background-color: #ffffff !important;
      }
      .jodit-dialog__header {
        background-color: #ffffff !important;
        color: #000000 !important;
      }
      .jodit-dialog__content {
        background-color: #ffffff !important;
      }
      .jodit-form__group {
        background-color: #ffffff !important;
      }
      .jodit-input {
        background-color: #ffffff !important;
        color: #000000 !important;
        border: 1px solid #d1d5db !important;
      }
      .jodit-button {
        background-color: #ffffff !important;
        color: #000000 !important;
        border: 1px solid #d1d5db !important;
      }
      .jodit-button:hover {
        background-color: #f3f4f6 !important;
      }
    `
    } ),
    []
  );




  const extractDiagramsFromContent = ( htmlContent: string ): DiagramData[] =>
  {
    const parser = new DOMParser();
    const doc = parser.parseFromString( htmlContent, 'text/html' );
    const diagramElements = doc.querySelectorAll( '.mermaid-diagram' );

    return Array.from( diagramElements ).map( element =>
    {
      const id = element.getAttribute( 'data-diagram-id' ) || crypto.randomUUID();
      const titleElement = element.querySelector( '.diagram-title' );
      const mermaidElement = element.querySelector( '.mermaid' );

      return {
        id,
        type: 'mermaid' as const,
        title: titleElement?.textContent?.trim() || 'Untitled Diagram',
        content: mermaidElement?.textContent?.trim() || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } );
  };

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

  // Handle uploading the blog post image and inserting it into the RichTextEditor
  const handleBlogPostImageUpload = async () =>
  {
    if ( !postImage )
    {
      toast.error( 'Please select an image to upload.' );
      return;
    }

    const imageUrl = await handleImageUpload( postImage );
    if ( !imageUrl )
    {
      toast.error( 'Failed to upload the image.' );
      return;
    }

    // Insert the image URL into the content
    setContent( ( prevContent ) => `${ prevContent }<img src="${ imageUrl }" alt="Uploaded Image" />` );
    setPostImage( null ); // Clear the selected image
    toast.success( 'Image uploaded and inserted into the content.' );
  };

  // Enhanced diagram submission handler
  const handleDiagramSubmit = ( diagramData: { title: string; content: string } ) =>
  {
    const now = new Date().toISOString();
    const newDiagram: DiagramData = {
      id: crypto.randomUUID(),
      type: 'mermaid',
      content: diagramData.content.trim(), // Ensure content is trimmed
      title: diagramData.title,
      createdAt: now,
      updatedAt: now
    };

    // Validate diagram syntax before adding
    try
    {
      mermaid.parse( diagramData.content );
      setDiagrams( prev => [ ...prev, newDiagram ] );

      // Insert enhanced placeholder with preview
      const placeholderHtml = `
     <div class="mermaid-diagram" data-diagram-id="${ newDiagram.id }">
    <div class="diagram-header">
      <div class="diagram-title text-lg font-semibold mb-2">${ newDiagram.title }</div>
      <div class="diagram-metadata text-sm text-gray-500">
        Created: ${ new Date( newDiagram.createdAt ).toLocaleDateString() }
      </div>
    </div>
    <pre class="mermaid">
      ${ newDiagram.content }
    </pre>
  </div>
    `;
      setContent( prev => `${ prev }${ placeholderHtml }` );

      // Re-initialize mermaid to render the new diagram
      setTimeout( () =>
      {
        mermaid.init( undefined, document.querySelectorAll( '.mermaid' ) );
      }, 0 );

    } catch ( error )
    {
      toast.error( 'Invalid diagram syntax. Please check your Mermaid code.' );
      console.error( 'Mermaid syntax error:', error );
      return;
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
    setDiagrams( [] );
    setFeaturedImage( null );
    setPostImage( null );

    // Clear any existing mermaid diagrams
    const existingDiagrams = document.querySelectorAll( '.mermaid' );
    existingDiagrams.forEach( diagram =>
    {
      diagram.innerHTML = '';
    } );
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
      // Extract diagrams before uploading image
      const extractedDiagrams = extractDiagramsFromContent( content );
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
      formData.append( 'diagrams', JSON.stringify( extractedDiagrams ) );
      formData.append( 'slug', slug );
      formData.append( 'metaTitle', metaTitle );
      formData.append( 'metaDescription', metaDescription );
      formData.append( 'isPublished', isPublished.toString() );
      formData.append( 'categories', JSON.stringify( categories ) );
      console.log( 'CATAGORIES data:', categories );
      formData.append( 'technologies', JSON.stringify( technologies ) );
      formData.append( 'difficultyLevel', difficultyLevel );
      formData.append( 'readingTime', readingTime.toString() );
      formData.append( 'featuredImage', imageUrl );
      formData.append( 'publishedAt', new Date().toISOString() );

      const response: CreateBlogPostResponse = await createBlogPost( formData );
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

            {/* Blog Post Image */ }
            <div className="space-y-2">
              <Label htmlFor="postImage">Blog Post Image</Label>
              <Input
                id="postImage"
                type="file"
                accept="image/*"
                onChange={ ( e ) => setPostImage( e.target.files?.[ 0 ] || null ) }
                className="cursor-pointer"
              />
              <Button
                onClick={ handleBlogPostImageUpload }
                variant="solid"
                className="mt-2"
              >
                Upload and Insert Image
              </Button>
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


              {/* Technologies */ }
              <div className="space-y-2">
                <Label>Technologies</Label>
                <Popover open={ openTechnologies } onOpenChange={ setOpenTechnologies }>
                  <PopoverTrigger asChild>
                    <Button
                      variant='bordered'
                      role="combobox"
                      aria-expanded={ openTechnologies }
                      className="w-full justify-between "
                    >
                      { selectedTechnologies.length > 0
                        ? `${ selectedTechnologies.length } selected`
                        : "Select technologies..." }
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full bg-white p-0">
                    <Command>
                      <CommandInput placeholder="Search technologies..." />
                      <CommandEmpty>No technology found.</CommandEmpty>
                      <CommandGroup>
                        { TECHNOLOGIES.map( ( tech ) => (
                          <CommandItem
                            key={ tech }
                            onSelect={ () =>
                            {
                              // Update selectedTechnologies and call setTechnologies to persist
                              const updatedTechnologies = selectedTechnologies.includes( tech )
                                ? selectedTechnologies.filter( ( item ) => item !== tech )
                                : [ ...selectedTechnologies, tech ];
                              setSelectedTechnologies( updatedTechnologies );
                              setTechnologies( updatedTechnologies ); // Ensure persistence in the database
                            } }
                          >
                            <Check
                              className={ cn(
                                "mr-2 h-4 w-4",
                                selectedTechnologies.includes( tech )
                                  ? "opacity-50"
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
                          setTechnologies( updatedTechnologies ); // Ensure persistence in the database
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

            {/* Content */ }
            { showDiagramModal && (
              <DiagramModal
                onClose={ () =>
                {
                  console.log( 'Closing modal' );
                  setShowDiagramModal( false );
                } }
                onSubmit={ ( diagram ) =>
                {
                  console.log( 'Submitting diagram:', diagram );
                  handleDiagramSubmit( diagram );
                } }
              />
            ) }

            {/* Jodit Editor */ }
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <div className="rounded-md border border-input">
                <JoditEditor
                  ref={ editor }
                  value={ content }
                  config={ config }

                  onBlur={ ( newContent ) =>
                  {
                    if ( newContent !== content )
                    {
                      setContent( newContent );
                    }
                  } }
                // Remove the onChange handler as it can interfere with typing
                // The onBlur handler will save content when the editor loses focus
                />
              </div>
            </div>

            <input type="hidden" name="authorId" value="1" />

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
            <Button type="submit" className="w-full bg-green-400">
              Create Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPostForm;
