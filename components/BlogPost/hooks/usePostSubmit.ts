// components/BlogPost/hooks/usePostSubmit.ts
import { useState } from 'react';
import toast from 'react-hot-toast';
import { createBlogPost } from '@/app/actions/blogActions';
import { UsePostSubmitResult, BlogPostFormData } from '../types';

interface UsePostSubmitProps
{
  formData: BlogPostFormData;
  setFormData: React.Dispatch<React.SetStateAction<BlogPostFormData>>;
  extractDiagramsFromContent: ( htmlContent: string ) => any[];
  handleImageUpload: ( file: File | null ) => Promise<string | null>;
  selectedCategories: string[];
  selectedTechnologies: string[];
}

export function usePostSubmit ( {
  formData,
  setFormData,
  extractDiagramsFromContent,
  handleImageUpload,
  selectedCategories,
  selectedTechnologies
}: UsePostSubmitProps ): UsePostSubmitResult
{

  const calculateReadingTime = ( text: string ): number =>
  {
    const wordsPerMinute = 200; // Average reading speed
    const textLength = text.trim().split( /\s+/ ).length;
    return Math.ceil( textLength / wordsPerMinute );
  };

  const resetForm = () =>
  {
    // Create a new object with the same structure but empty values
    const emptyFormData: BlogPostFormData = {
      title: '',
      content: '',
      excerpt: '',
      tags: '',
      slug: '',
      metaTitle: '',
      metaDescription: '',
      isPublished: false,
      featuredImage: null,
      postImage: null,
      diagrams: [],
      categories: [],
      technologies: [],
      difficultyLevel: 'Beginner',
      rawMarkdown: ''
    };

    setFormData( emptyFormData );

    // Clear any existing mermaid diagrams
    if ( typeof document !== 'undefined' )
    {
      const existingDiagrams = document.querySelectorAll( '.mermaid' );
      existingDiagrams.forEach( diagram =>
      {
        diagram.innerHTML = '';
      } );
    }
  };

  const handleSubmit = async ( e: React.FormEvent ) =>
  {
    e.preventDefault();

    if ( !formData.featuredImage )
    {
      toast.error( 'Please select a featured image.' );
      return;
    }

    try
    {
      // Extract diagrams before uploading image
      const extractedDiagrams = extractDiagramsFromContent( formData.content );
      const imageUrl = await handleImageUpload( formData.featuredImage );

      if ( !imageUrl )
      {
        toast.error( 'Failed to upload the image.' );
        return;
      }

      // Combine all metadata into tags
      const metadataTags = [
        ...selectedCategories,
        ...selectedTechnologies,
        formData.difficultyLevel,
        ...formData.tags.split( ',' ).map( t => t.trim() ).filter( t => t )
      ].join( ', ' );

      const readingTime = calculateReadingTime( formData.content );
      const submitData = new FormData();

      submitData.append( 'title', formData.title );
      submitData.append( 'content', formData.content );
      submitData.append( 'excerpt', formData.excerpt );
      submitData.append( 'authorId', '1' ); // Hardcode the author ID as 1
      submitData.append( 'tags', metadataTags );
      submitData.append( 'diagrams', JSON.stringify( extractedDiagrams ) );
      submitData.append( 'slug', formData.slug );
      submitData.append( 'metaTitle', formData.metaTitle );
      submitData.append( 'metaDescription', formData.metaDescription );
      submitData.append( 'isPublished', formData.isPublished.toString() );
      submitData.append( 'categories', JSON.stringify( formData.categories ) );
      submitData.append( 'technologies', JSON.stringify( formData.technologies ) );
      submitData.append( 'difficultyLevel', formData.difficultyLevel );
      submitData.append( 'readingTime', readingTime.toString() );
      submitData.append( 'featuredImage', imageUrl );
      submitData.append( 'publishedAt', new Date().toISOString() );

      const response = await createBlogPost( submitData );
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

  return {
    handleSubmit,
    resetForm
  };
}