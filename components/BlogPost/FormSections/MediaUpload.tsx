// components/BlogPost/FormSections/MediaUpload.tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@nextui-org/button';

interface MediaUploadProps
{
  featuredImage: File | null;
  setFeaturedImage: ( file: File | null ) => void;
  postImage: File | null;
  setPostImage: ( file: File | null ) => void;
  handleBlogPostImageUpload: () => Promise<void>;
}

const MediaUpload: React.FC<MediaUploadProps> = ( {
  featuredImage,
  setFeaturedImage,
  postImage,
  setPostImage,
  handleBlogPostImageUpload
} ) =>
{
  return (
    <>
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
        { featuredImage && (
          <div className="text-sm text-gray-500 mt-1">
            Selected: { featuredImage.name }
          </div>
        ) }
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
        { postImage && (
          <div className="text-sm text-gray-500 mt-1">
            Selected: { postImage.name }
          </div>
        ) }
        <Button
          onClick={ handleBlogPostImageUpload }
          variant="solid"
          className="mt-2"
          disabled={ !postImage }
        >
          Upload and Insert Image
        </Button>
      </div>
    </>
  );
};

export default MediaUpload;