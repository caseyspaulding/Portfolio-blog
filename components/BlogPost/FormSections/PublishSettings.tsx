// components/BlogPost/FormSections/PublishSettings.tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@nextui-org/button';

interface PublishSettingsProps
{
  tags: string;
  setTags: ( tags: string ) => void;
  isPublished: boolean;
  setIsPublished: ( isPublished: boolean ) => void;
  onSubmit: ( e: React.FormEvent ) => Promise<void>;
}

const PublishSettings: React.FC<PublishSettingsProps> = ( {
  tags,
  setTags,
  isPublished,
  setIsPublished,
  onSubmit
} ) =>
{
  return (
    <>
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
    </>
  );
};

export default PublishSettings;