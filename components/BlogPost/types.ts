// components/BlogPost/types.ts
import { User } from '@supabase/supabase-js';

export interface DiagramData
{
  id: string;
  type: 'mermaid';
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostFormData
{
  title: string;
  content: string;
  excerpt: string;
  tags: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  isPublished: boolean;
  featuredImage: File | null;
  postImage: File | null;
  diagrams: DiagramData[];
  categories: string[];
  technologies: string[];
  difficultyLevel: string;
  rawMarkdown: string;
}

export interface JoditConfig
{
  readonly: boolean;
  placeholder: string;
  buttons: Array<string | {
    name: string;
    icon: string;
    tooltip: string;
    exec: ( editor: any ) => boolean
  }>;
  events?: {
    [ key: string ]: ( () => boolean | void ) | undefined;
  };
  [ key: string ]: any;
}

export interface CreateBlogPostResponse
{
  success: boolean;
  message: string;
}

export interface DiagramModalProps
{
  onClose: () => void;
  onSubmit: ( diagram: { title: string; content: string } ) => void;
}

export interface MarkdownPreviewProps
{
  content: string;
}

export interface UseImageUploadResult
{
  handleImageUpload: ( file: File | null ) => Promise<string | null>;
  handleBlogPostImageUpload: () => Promise<void>;
}

export interface UseDiagramsResult
{
  diagrams: DiagramData[];
  showDiagramModal: boolean;
  setShowDiagramModal: ( show: boolean ) => void;
  handleDiagramSubmit: ( diagramData: { title: string; content: string } ) => void;
  extractDiagramsFromContent: ( htmlContent: string ) => DiagramData[];
}

export interface UsePostSubmitResult
{
  handleSubmit: ( e: React.FormEvent ) => Promise<void>;
  resetForm: () => void;
}