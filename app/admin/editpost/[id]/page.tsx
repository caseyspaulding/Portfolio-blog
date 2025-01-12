
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { updateBlogPost } from '@/app/actions/blogActions';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import LogoSpinner from '@/components/Loaders/LogoSpinner';
import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/card';
import DiagramModal from '@/components/DiagramModal';
import mermaid from 'mermaid';
import { PostMetadata } from '@/components/PostMetaData';
import { PostEditor } from '@/components/PostEditor';


interface DiagramData
{
    id: string;
    type: string;
    content: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}

// Import the types from your schema
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

interface DiagramData
{
    id: string;
    type: string;
    content: string;
    title: string;
    createdAt: string;
    updatedAt: string;
}


export default function EditPostPage ()
{
    const router = useRouter();
    const { id } = useParams();
    const idAsNumber = Number( id );

    // State declarations
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

    const [ difficultyLevel, setDifficultyLevel ] = useState<DifficultyLevel | ''>( '' );
    const [ categories, setCategories ] = useState<Category[]>( [] );
    const [ technologies, setTechnologies ] = useState<string[]>( [] );
    const [ readingTime, setReadingTime ] = useState( 5 );

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
                setDifficultyLevel( post.difficultyLevel ?? '' );
                setCategories( typeof post.categories === 'string' ? JSON.parse( post.categories ) : post.categories ?? [] );
                setTechnologies( post.technologies ?? [] );
                setReadingTime( post.readingTime ?? 5 );
                setLoading( false );
            }
        };

        fetchPost();
    }, [ id, router, idAsNumber ] );


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
            formData.append( 'difficultyLevel', difficultyLevel );
            formData.append( 'categories', JSON.stringify( categories ) );
            formData.append( 'technologies', JSON.stringify( technologies ) );
            formData.append( 'readingTime', readingTime.toString() );
            formData.append( 'diagrams', JSON.stringify( diagrams ) );

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
                        <PostMetadata
                            title={ title }
                            setTitle={ setTitle }
                            slug={ slug }
                            setSlug={ setSlug }
                            metaTitle={ metaTitle }
                            setMetaTitle={ setMetaTitle }
                            metaDescription={ metaDescription }
                            setMetaDescription={ setMetaDescription }
                            featuredImage={ featuredImage }
                            setFeaturedImage={ setFeaturedImage }
                            featuredImageURL={ featuredImageURL }
                            setFeaturedImageURL={ setFeaturedImageURL }
                            isPublished={ isPublished }
                            setIsPublished={ setIsPublished }
                            excerpt={ excerpt }
                            setExcerpt={ setExcerpt }
                            tags={ tags }
                            setTags={ setTags }
                            difficultyLevel={ difficultyLevel }
                            setDifficultyLevel={ setDifficultyLevel }
                            categories={ categories }
                            setCategories={ setCategories }
                            technologies={ technologies }
                            setTechnologies={ setTechnologies }
                            readingTime={ readingTime }
                            setReadingTime={ setReadingTime }
                        />


                        <PostEditor
                            content={ content }
                            setContent={ setContent }
                            setShowDiagramModal={ setShowDiagramModal }
                        />

                        <Button
                            type="submit"
                            className="w-full text-xl bg-primary text-primary-foreground hover:bg-primary/90"
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