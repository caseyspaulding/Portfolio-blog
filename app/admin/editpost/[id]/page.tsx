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
        <div className="bg-gray-100 rounded-2xl p-5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 p-5 py-12 bg-white rounded-2xl">
                <h1 className="mb-8 text-3xl font-bold text-gray-800">Edit Blog Post</h1>
                <form onSubmit={ handleUpdate } className="space-y-6">
                    {/* Post Title */ }
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Post Title</label>
                        <input
                            name="title"
                            type="text"
                            value={ title }
                            onChange={ ( e ) => setTitle( e.target.value ) }
                            placeholder="Post Title"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            required
                        />
                    </div>

                    {/* URL Slug */ }
                    <div>
                        <label className="block text-sm font-medium text-gray-700">URL Slug</label>
                        <input
                            name="slug"
                            type="text"
                            value={ slug }
                            onChange={ ( e ) => setSlug( e.target.value ) }
                            placeholder="URL Slug"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        />
                    </div>

                    {/* Meta Title */ }
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Meta Title</label>
                        <input
                            name="metaTitle"
                            type="text"
                            value={ metaTitle }
                            onChange={ ( e ) => setMetaTitle( e.target.value ) }
                            placeholder="Meta Title"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        />
                    </div>

                    {/* Meta Description */ }
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                        <textarea
                            name="metaDescription"
                            value={ metaDescription }
                            onChange={ ( e ) => setMetaDescription( e.target.value ) }
                            placeholder="Meta Description"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        />
                    </div>

                    {/* Featured Image */ }
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Featured Image</label>
                        <input
                            type="file"
                            onChange={ handleImageChange }
                            accept="image/*"
                            className="mt-1 block w-full text-gray-500"
                        />
                        { featuredImageURL && (
                            <div className="mt-2">
                                <img
                                    src={ featuredImageURL }
                                    alt="Featured"
                                    className="mt-2 h-48 w-full object-cover rounded-lg"
                                />
                                <button
                                    type="button"
                                    onClick={ () =>
                                    {
                                        setFeaturedImageURL( '' );
                                        setFeaturedImage( null );
                                    } }
                                    className="mt-2 text-red-600 text-sm hover:text-red-800"
                                >
                                    Remove Image
                                </button>
                            </div>
                        ) }
                    </div>

                    {/* Published Checkbox */ }
                    <div className="flex items-center">
                        <input
                            name="isPublished"
                            type="checkbox"
                            checked={ isPublished }
                            onChange={ ( e ) => setIsPublished( e.target.checked ) }
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-700">Published</label>
                    </div>

                    {/* Excerpt */ }
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                        <textarea
                            name="excerpt"
                            value={ excerpt }
                            onChange={ ( e ) => setExcerpt( e.target.value ) }
                            placeholder="Excerpt"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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

                    {/* Author Select Dropdown */ }
                    <div>
                        {/*<label className="block text-sm font-medium text-gray-700">Author</label>
                        <select
                            name="authorId"
                            value={ authorId || '1' }
                            onChange={ ( e ) => setAuthorId( Number( e.target.value ) ) }
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            required
                        >
                            <option value="">Select an author</option>
                            { authorsList.map( ( author ) => (
                                <option key={ author.id } value={ author.id }>
                                    { author.name }
                                </option>
                            ) ) }
                        </select>*/}
                    </div>

                    {/* Tags */ }
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                        <input
                            name="tags"
                            type="text"
                            value={ tags.join( ', ' ) }
                            onChange={ ( e ) => setTags( e.target.value.split( ',' ).map( ( tag ) => tag.trim() ) ) }
                            placeholder="Tags (comma-separated)"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        />
                    </div>

                    {/* Submit Button */ }
                    <div>
                        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                            Update Post
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
