'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { updateBlogPost } from '@/app/actions/blogActions';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';
import { Button } from 'flowbite-react';
import LogoSpinner from '@/components/Loaders/LogoSpinner';
import dynamic from 'next/dynamic';

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
                // Add these lines
                setFeaturedImageURL( post.featuredImage ?? '' );
                setTags( post.tags ? post.tags.split( ',' ).map( ( tag: string ) => tag.trim() ) : [] );
                setIsPublished( post.isPublished ?? false );
                setMetaTitle( post.metaTitle ?? '' );
                setMetaDescription( post.metaDescription ?? '' );
                setLoading( false );
            }
        };

        fetchPost();
    }, [ id, router ] );


    // Add this state update to show the uploaded image preview
    const handleImageChange = ( e: React.ChangeEvent<HTMLInputElement> ) =>
    {
        const file = e.target.files?.[ 0 ];
        if ( file )
        {
            setFeaturedImage( file );
            // Create a temporary URL for preview
            const tempUrl = URL.createObjectURL( file );
            setFeaturedImageURL( tempUrl );
        }
    }

    const handleUpdate = async ( e: React.FormEvent ) =>
    {
        e.preventDefault();
        setLoading( true );  // Add loading state while updating

        try
        {
            let imageURL = featuredImageURL;  // Keep existing image URL by default

            // Only upload if there's a new image file
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

    // Configuration for the editor
    const config = useMemo(
        () => ( {
            readonly: false,
            placeholder: 'Start typing your blog post...',
        } ),
        []
    );

    const editor = useRef( null ); // Define the editor reference

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
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 p-5 py-12 bg-white rounded-2xl">
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

                    {/* Jodit Editor for Content */ }
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <JoditEditor
                            ref={ editor }
                            value={ content }
                            config={ config }
                            onBlur={ ( newContent ) => setContent( newContent ) }
                        />
                    </div>

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
