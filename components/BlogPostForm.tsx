'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { createBlogPost } from '../app/actions/blogActions';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { Button } from '@nextui-org/button';
import JoditEditor from 'jodit-react';





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
  const [ user, setUser ] = useState<User | null>( null );

  // State variables
  const [ title, setTitle ] = useState( '' );
  const [ content, setContent ] = useState( '' );
  const [ excerpt, setExcerpt ] = useState( '' );
  const [ authorId, setAuthorId ] = useState( '' );
  const [ authorsList, setAuthorsList ] = useState<Author[]>( [] );
  const [ tags, setTags ] = useState( '' );
  const [ slug, setSlug ] = useState( '' );
  const [ metaTitle, setMetaTitle ] = useState( '' );
  const [ metaDescription, setMetaDescription ] = useState( '' );
  const [ isPublished, setIsPublished ] = useState( false );
  const [ featuredImage, setFeaturedImage ] = useState<File | null>( null );
  const [ postImage, setPostImage ] = useState<File | null>( null ); // State for blog post image



  // Configuration for the editor
  const config = useMemo(
    () => ( {
      readonly: false,
      placeholder: 'Start typing your blog post...',
    } ),
    []
  );

  const editor = useRef( null ); // Define the editor reference


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

    const fetchAuthors = async () =>
    {
      const { data: authors, error } = await supabase.from( 'authors' ).select( 'id, name' );

      if ( error )
      {
        toast.error( 'Error fetching authors' );
      } else
      {
        setAuthorsList( authors || [] );
      }
    };

    checkUser();
    fetchAuthors();
  }, [ router, supabase ] );

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

  const handleSubmit = async ( e: React.FormEvent ) =>
  {
    e.preventDefault();

    if ( !featuredImage )
    {
      toast.error( 'Please select a featured image.' );
      return;
    }

    const imageUrl = await handleImageUpload( featuredImage );
    if ( !imageUrl )
    {
      toast.error( 'Failed to upload the image.' );
      return;
    }

    const formData = new FormData();
    formData.append( 'title', title );
    formData.append( 'content', content );
    formData.append( 'excerpt', excerpt );
    formData.append( 'authorId', '1' ); // Hardcode the author ID as 1
    formData.append( 'tags', tags );
    formData.append( 'slug', slug );
    formData.append( 'metaTitle', metaTitle );
    formData.append( 'metaDescription', metaDescription );
    formData.append( 'isPublished', isPublished.toString() );
    formData.append( 'featuredImage', imageUrl );

    const response: CreateBlogPostResponse = await createBlogPost( formData );

    if ( response.success )
    {
      toast.success( response.message );
      // Reset form fields
      setTitle( '' );
      setContent( '' );
      setExcerpt( '' );
      setTags( '' );
      setSlug( '' );
      setMetaTitle( '' );
      setMetaDescription( '' );
      setIsPublished( false );
      setFeaturedImage( null );
    } else
    {
      toast.error( response.message );
    }
  };

  if ( !user )
  {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-gray-100 rounded-2xl p-5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 p-5 py-12 bg-white rounded-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Blog Post</h1>
        <form onSubmit={ handleSubmit } className="space-y-6">
          {/* Post Title */ }
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Post Title
            </label>
            <input
              name="title"
              type="text"
              value={ title }
              onChange={ ( e ) => setTitle( e.target.value ) }
              placeholder="Post Title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Featured Image */ }
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Featured Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={ ( e ) => setFeaturedImage( e.target.files?.[ 0 ] || null ) }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Blog Post Image Input */ }
          <div>
            <label className="block text-sm font-medium text-gray-700">Blog Post Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={ ( e ) => setPostImage( e.target.files?.[ 0 ] || null ) }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <Button onClick={ handleBlogPostImageUpload } className="mt-2 bg-blue-600 text-white">
              Upload and Insert Image
            </Button>
          </div>

          {/* URL Slug */ }
          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL Slug
            </label>
            <input
              name="slug"
              type="text"
              value={ slug }
              onChange={ ( e ) => setSlug( e.target.value ) }
              placeholder="URL Slug"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Excerpt */ }
          <div>
            <label className="block text-sm font-medium text-gray-700">Excerpt</label>
            <textarea
              name="excerpt"
              value={ excerpt }
              onChange={ ( e ) => setExcerpt( e.target.value ) }
              placeholder="Excerpt"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Content */ }

          {/* Jodit Editor for Content */ }
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <JoditEditor
              ref={ editor }
              value={ content } // The editor's current content
              config={ config } // Editor configuration
              onBlur={ ( newContent ) => setContent( newContent ) } // Use this to update the content
              onChange={ ( newContent ) => setContent( newContent ) } // Optional: Update the content as the user types
            />
          </div>


          {/* Author Select Dropdown */ }
          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <select
              name="authorId"
              value={ authorId }
              onChange={ ( e ) => setAuthorId( e.target.value ) }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select an author</option>
              { authorsList.map( ( author ) => (
                <option key={ author.id } value={ author.id }>
                  { author.name }
                </option>
              ) ) }
            </select>
          </div>

          {/* Tags */ }
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              name="tags"
              type="text"
              value={ tags }
              onChange={ ( e ) => setTags( e.target.value ) }
              placeholder="Tags (comma-separated)"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
              shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
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

          {/* Submit Button */ }
          <div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogPostForm;
