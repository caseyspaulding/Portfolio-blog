'use client';

// components/BlogPost/BlogPostForm.tsx
import React, { useEffect, useState, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '@nextui-org/button';
import { Checkbox } from '../ui/checkbox';
import JoditEditor from 'jodit-react';

import { BlogPostFormData } from './types';

// Start with just the minimal needed parts
const BlogPostForm: React.FC = () =>
{
  const router = useRouter();
  const supabase = createClient();
  const editor = useRef( null );

  // User Authentication
  const [ user, setUser ] = useState<User | null>( null );
  const [ title, setTitle ] = useState( '' );
  const [ content, setContent ] = useState( '' );
  const [ isLoading, setIsLoading ] = useState( true );

  // Check user authentication
  useEffect( () =>
  {
    const checkUser = async () =>
    {
      try
      {
        const { data: { user } } = await supabase.auth.getUser();
        if ( user?.email !== 'casey.spaulding@gmail.com' )
        {
          toast.error( 'You do not have access to this page.' );
          router.push( '/' );
          return;
        }
        setUser( user );
      } catch ( error )
      {
        console.error( 'Error checking user:', error );
        toast.error( 'Authentication error' );
      } finally
      {
        setIsLoading( false );
      }
    };
    checkUser();
  }, [ router, supabase ] );

  // A very simple version of the editor config
  const editorConfig = {
    readonly: false,
    placeholder: 'Start typing your blog post...',
    height: 500,
    buttons: [ 'bold', 'italic', 'underline', 'ul', 'ol', 'link', 'source' ],
    askBeforePasteHTML: false,
    defaultMode: 1,
    spellcheck: true
  };

  const handleSubmit = ( e: React.FormEvent ) =>
  {
    e.preventDefault();
    toast.success( 'Form submitted successfully (test)' );
  };

  if ( isLoading )
  {
    return <div>Loading...</div>;
  }

  if ( !user )
  {
    return <div>Not authorized</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <Card className="mx-auto max-w-6xl">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-foreground mb-8">Create New Blog Post (Simplified)</h1>
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

            {/* Content */ }
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <div className="rounded-md border border-input">
                <JoditEditor
                  ref={ editor }
                  value={ content }
                  config={ editorConfig }
                  onBlur={ ( newContent ) =>
                  {
                    if ( newContent !== content )
                    {
                      setContent( newContent );
                    }
                  } }
                />
              </div>
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