'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { updateBlogPost } from '@/app/actions/blogActions';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';
import { Button } from 'flowbite-react';
import LogoSpinner from '@/components/Loaders/LogoSpinner';
import dynamic from 'next/dynamic';
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
import mermaid from 'mermaid';
import DiagramModal from '@/components/DiagramModal';
import { CardContent } from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/card';
import { Label } from '@/components/ui/label';

interface DiagramData
{
    id: string;
    type: string;
    content: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}



interface JoditConfig
{
    readonly: boolean;
    placeholder: string;
    buttons: Array<string | { name: string; icon: string; tooltip: string; exec: ( editor: any ) => boolean }>;
    events: {
        'insertDiagram.click': () => boolean;
    };
}
// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic( () => import( 'jodit-react' ), {
    ssr: false,
} );

interface Author
{
    id: number;
    name: string;
}

interface BlogPost
{
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt?: string | null;
    authorId: number;
    tags?: string[] | null;
    featuredImage?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    isPublished: boolean | null;
    createdAt: Date;
    updatedAt: Date;
}

export default function EditPostPage ()
{
    const router = useRouter();
    const { id } = useParams();
    const idAsNumber = Number( id );
    const editor = useRef( null );

    // Group all useState declarations
    const [ authorsList, setAuthorsList ] = useState<Author[]>( [] );
    const [ title, setTitle ] = useState( '' );
    const [ content, setContent ] = useState( '' );
    const [ excerpt, setExcerpt ] = useState<string>( '' );
    const [ authorId, setAuthorId ] = useState<number | null>( null );
    const [ tags, setTags ] = useState<string[]>( [] );
    const [ slug, setSlug ] = useState( '' );
    const [ metaTitle, setMetaTitle ] = useState( '' );
    const [ metaDescription, setMetaDescription ] = useState( '' );
    const [ isPublished, setIsPublished ] = useState( false );
    const [ featuredImage, setFeaturedImage ] = useState<File | null>( null );
    const [ featuredImageURL, setFeaturedImageURL ] = useState( '' );
    const [ loading, setLoading ] = useState( true );
    const [ showDiagramModal, setShowDiagramModal ] = useState( false );
    const [ diagrams, setDiagrams ] = useState<DiagramData[]>( [] );

    useEffect( () =>
    {
        if ( typeof window !== 'undefined' )
        {
            ( window as any ).Prism.highlightAll();
        }
    }, [ content ] );

    // Add Mermaid initialization effect
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
    // Fetch post data useEffect
    useEffect( () =>
    {
        const fetchPost = async () =>
        {
            const supabase = createClient();
            const { data: post, error } = await supabase
                .from( 'blog_posts' )
                .select( '*' )
                .eq( 'id', idAsNumber )
                .single();

            if ( error )
            {
                toast.error( 'Error fetching post data' );
                router.push( '/admin/dashboard' );
                return;
            }

            if ( post )
            {
                setTitle( post.title );
                setContent( post.content );
                setExcerpt( post.excerpt ?? '' );
                setSlug( post.slug );
                setFeaturedImageURL( post.featuredImage ?? '' );
                setTags( post.tags ? post.tags.split( ',' ).map( ( tag: string ) => tag.trim() ) : [] );
                setIsPublished( post.isPublished ?? false );
                setMetaTitle( post.metaTitle ?? '' );
                setMetaDescription( post.metaDescription ?? '' );
                setLoading( false );
            }
        };

        fetchPost();
    }, [ id, router, idAsNumber ] );

    // Editor configuration
    interface JoditButton
    {
        name: string;
        icon: string;
        tooltip: string;
        exec: ( editor: any ) => boolean;
    }

    interface JoditEvents
    {
        'insertDiagram.click': () => boolean;
        'change': () => void;
        [ key: string ]: any;
    }

    interface JoditConfig
    {
        readonly: boolean;
        placeholder: string;
        buttons: Array<string | JoditButton>;
        events: JoditEvents;
        css: string;
    }

    const config: JoditConfig = useMemo(
        () => ( {
            readonly: false,
            placeholder: 'Start typing your blog post...',
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
                    exec: ( _editor ) =>
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
                'insertDiagram.click': () =>
                {
                    setShowDiagramModal( true );
                    return false;
                },
                'change': () =>
                {
                    // Initialize Prism.js highlighting on change
                    if ( typeof window !== 'undefined' )
                    {
                        setTimeout( () =>
                        {
                            ( window as any ).Prism.highlightAll();
                        }, 0 );
                    }
                }
            },
            // Add custom CSS for code blocks
            css: `
      .jodit-wysiwyg pre {
        background: #1e1e1e;
        border-radius: 4px;
        padding: 15px;
        margin: 15px 0;
        overflow-x: auto;
      }
      .jodit-wysiwyg code {
        font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.4;
        color: #d4d4d4;
      }
    `
        } ),
        []
    );
    // Handler functions
    const handleDiagramSubmit = ( diagramData: { title: string; content: string } ) =>
    {
        const now = new Date().toISOString();
        const newDiagram: DiagramData = {
            id: crypto.randomUUID(),
            type: 'mermaid',
            content: diagramData.content.trim(),
            title: diagramData.title,
            createdAt: now,
            updatedAt: now
        };

        try
        {
            mermaid.parse( diagramData.content );
            setDiagrams( prev => [ ...prev, newDiagram ] );

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

            setTimeout( () =>
            {
                mermaid.init( undefined, document.querySelectorAll( '.mermaid' ) );
            }, 0 );

        } catch ( error )
        {
            toast.error( 'Invalid diagram syntax. Please check your Mermaid code.' );
            console.error( 'Mermaid syntax error:', error );
        }
    };

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

    const handleUpdate = async ( e: React.FormEvent ) =>
    {
        e.preventDefault();
        setLoading( true );

        try
        {
            let imageURL = featuredImageURL;

            if ( featuredImage )
            {
                const supabase = createClient();
                const { data, error } = await supabase.storage
                    .from( 'blogimages' )
                    .upload( `images/${ Date.now() }-${ featuredImage.name }`, featuredImage );

                if ( error )
                {
                    toast.error( 'Error uploading image' );
                    setLoading( false );
                    return;
                }

                imageURL = `${ process.env.NEXT_PUBLIC_SUPABASE_URL }/storage/v1/object/public/blogimages/${ data.path }`;
            }

            const formData = new FormData();
            formData.append( 'title', title );
            formData.append( 'content', content );
            formData.append( 'excerpt', excerpt || '' );
            formData.append( 'authorId', authorId?.toString() || '1' );
            formData.append( 'tags', tags.join( ',' ) );
            formData.append( 'slug', slug );
            formData.append( 'metaTitle', metaTitle );
            formData.append( 'metaDescription', metaDescription );
            formData.append( 'isPublished', isPublished.toString() );
            formData.append( 'featuredImage', imageURL );

            const response = await updateBlogPost( idAsNumber, formData );

            if ( response.success )
            {
                toast.success( 'Post updated successfully!' );
                router.push( '/admin/dashboard' );
            } else
            {
                toast.error( 'Error updating post' );
            }
        } catch ( error )
        {
            console.error( 'Error updating post:', error );
            toast.error( 'An error occurred while updating the post' );
        } finally
        {
            setLoading( false );
        }
    };

    // Loading state check (after all hooks)
    if ( loading )
    {
        return (
            <div>
                <LogoSpinner />
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-background p-8">
            <Card className="mx-auto max-w-6xl">
                <CardContent className="p-6">
                    <h1 className="mb-8 text-3xl font-bold text-foreground">Edit Blog Post</h1>
                    <form onSubmit={ handleUpdate } className="space-y-6">
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

                        {/* Content Editor */ }
                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <div className="rounded-md border border-input">
                                <JoditEditor
                                    ref={ editor }
                                    value={ content }
                                    config={ {
                                        ...config,
                                        theme: 'dark',
                                        style: {
                                            background: 'var(--background)',
                                            color: 'var(--foreground)'
                                        },
                                        colors: {
                                            background: [ 'var(--background)' ],
                                            border: [ 'var(--border)' ],
                                            buttons: [ 'var(--primary)' ],
                                            icons: [ 'var(--foreground)' ],
                                            panel: [ 'var(--card)' ],
                                            text: [ 'var(--foreground)' ],
                                            textPanels: [ 'var(--foreground)' ]
                                        }
                                    } }
                                    onBlur={ ( newContent ) => setContent( newContent ) }
                                />
                            </div>
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

                        {/* Published Checkbox */ }
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

                        {/* Submit Button */ }
                        <Button
                            type="submit"
                            className="w-full text-xl bg-primary text-primary-foreground hover:bg-primary/90 "
                            disabled={ loading }
                        >
                            { loading ? 'Updating...' : 'Update Post' }
                        </Button>
                    </form>
                </CardContent>
            </Card>

            { showDiagramModal && (
                <DiagramModal
                    onClose={ () => setShowDiagramModal( false ) }
                    onSubmit={ handleDiagramSubmit }
                />
            ) }
        </div>
    );
}
