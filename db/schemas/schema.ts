
import { sql } from 'drizzle-orm';
import
{
    pgTable,
    uuid,
    text,
    timestamp,
    numeric,
    serial,
    varchar,
    integer,
    boolean,

    date,
    jsonb,
    doublePrecision,
    time,
    uniqueIndex
} from 'drizzle-orm/pg-core';

// Organizations Table
export const organizations = pgTable( 'organizations', {
    id: uuid( 'id' )
        .primaryKey()
        .default( sql`uuid_generate_v4()` ),
    name: text( 'name' ).notNull().unique(),

    contactPhone: text( 'contact_phone' ),
    website: text( 'website' ),
    address: text( 'address' ),
    city: text( 'city' ),
    state: text( 'state' ),
    country: text( 'country' ),
    zipCode: text( 'zip_code' ),
    logoUrl: text( 'logo_url' ),
    industry: text( 'industry' ), // e.g., 'non-profit', 'entertainment', 'education'
    orgType: text( 'org_type' ), // e.g., 'non-profit', 'business', 'government'
    foundedDate: date( 'founded_date' ), // Date the organization was founded
    numberOfEmployees: integer( 'number_of_employees' ), // Size of the organization
    annualRevenue: numeric( 'annual_revenue', { precision: 15, scale: 2 } ), // Organization's annual revenue
    socialMediaLinks: jsonb( 'social_media_links' ), // Links to social media profiles
    affiliatedOrganizations: jsonb( 'affiliated_organizations' ), // Affiliated organizations or partnerships
    isVerified: boolean( 'is_verified' ).default( false ), // Flag for verified organizations
    subscriptionStatus: text( 'subscription_status' ), // e.g., 'active', 'expired', 'trial'
    lastActivity: timestamp( 'last_activity' ),
    status: text( 'status' ).default( 'active' ),
    stripeAccountId: varchar( 'stripe_account_id' ),
    stripeConnectLinked: boolean( 'stripe_connect_linked' ),
    stripeAccountCreated: timestamp( 'stripe_account_created' ),
    updatedAt: timestamp( 'updated_at' ).default( sql`CURRENT_TIMESTAMP` ),
    metadata: jsonb( 'metadata' ),
    createdAt: timestamp( 'created_at' ).defaultNow().notNull()
} );



// User Profiles Table
export const userProfiles = pgTable( 'user_profiles', {
    id: uuid( 'id' )
        .primaryKey()
        .default( sql`uuid_generate_v4()` ),
    userId: uuid( 'user_id' ).notNull().unique(), // Will reference auth.users table in Supabase
    orgId: uuid( 'org_id' )
        .notNull()
        .references( () => organizations.id ),
    firstName: text( 'first_name' ), // New field for first name
    lastName: text( 'last_name' ), // New field for last name
    profileImageUrl: text( 'profile_image_url' ),
    organizationName: text( 'organization_name' ).notNull(),
    role: text( 'role' ).notNull().default( 'user' ), // User's role within the organization
    contactNumber: text( 'contact_number' ), // Contact phone number
    bio: text( 'bio' ), // User biography or description
    socialLinks: jsonb( 'social_links' ), // Links to social media profiles
    isActive: boolean( 'is_active' ).default( true ), // Active status flag
    lastLogin: timestamp( 'last_login' ), // Last login timestamp
    permissions: jsonb( 'permissions' ), // JSON field for user-specific permissions
    preferences: jsonb( 'preferences' ), // JSON field for storing user preferences
    department: text( 'department' ), // Department within the organization
    createdAt: timestamp( 'created_at' ).default( sql`now()` ),
    updatedAt: timestamp( 'updated_at' ).default( sql`now()` ),
}, ( table ) =>
{
    return {
        userIdUnique: uniqueIndex( 'user_profiles_user_id_unique' ).on( table.userId ), // Ensure userId is unique
    };
} );

// Feedback
export const feedbackTable = pgTable( 'feedback', {
    id: serial( 'id' ).primaryKey(),
    subject: varchar( 'subject', { length: 255 } ).notNull(),
    category: varchar( 'category', { length: 50 } ).notNull(),
    description: text( 'description' ).notNull(),
    attachment_url: varchar( 'attachment_url', { length: 255 } ),
    user_id: varchar( 'user_id', { length: 255 } ).notNull(),
    created_at: timestamp( 'created_at' ).defaultNow(),
} );



/// Forms Table
export const forms = pgTable( 'forms', {
    id: uuid( 'id' ).primaryKey().default( sql`uuid_generate_v4()` ),
    orgId: uuid( 'org_id' ).notNull().references( () => organizations.id ),
    formName: text( 'form_name' ).notNull(),
    creator_id: uuid( 'creator_id' ).notNull().references( () => userProfiles.userId ), // Reference to the userProfiles table
    description: text( 'description' ),
    status: text( 'status' ).default( 'active' ),
    isArchived: boolean( 'is_archived' ).default( false ), // New field for archiving
    isDeleted: boolean( 'is_deleted' ).default( false ),   // New field for soft deletion
    isDraft: boolean( 'is_draft' ).default( false ), // New field for draft forms
    headerMediaUrl: text( 'header_media_url' ),    // New column for media URL
    headerMediaType: text( 'header_media_type' ),  // New column for media type ('image' or 'video')
    createdAt: timestamp( 'created_at' ).defaultNow(),
    updatedAt: timestamp( 'updated_at' ).defaultNow(),
} );


export const formFields = pgTable( 'form_fields', {
    id: uuid( 'id' )
        .primaryKey()
        .default( sql`uuid_generate_v4()` ),
    formId: uuid( 'form_id' )
        .notNull()
        .references( () => forms.id ), // Foreign key to the forms table
    fieldName: text( 'field_name' ).notNull(), // Name of the field (e.g., 'email', 'phone')
    placeholder: text( 'placeholder' ), // Placeholder text for the field
    fieldType: text( 'field_type' ).notNull(), // Type of the field (e.g., 'text', 'checkbox', 'radio', 'date')
    options: jsonb( 'options' ), // JSON object for additional options (e.g., dropdown options, validation rules)
    isRequired: boolean( 'is_required' ).default( false ), // Whether the field is required
    order: integer( 'order' ).notNull(), // The order of the field in the form
    createdAt: timestamp( 'created_at' ).defaultNow().notNull(),
} );

export const formResponses = pgTable( 'form_responses', {
    id: uuid( 'id' )
        .primaryKey()
        .default( sql`uuid_generate_v4()` ),
    formId: uuid( 'form_id' )
        .notNull()
        .references( () => forms.id ), // Foreign key to the forms table
    orgId: uuid( 'org_id' )
        .notNull()
        .references( () => organizations.id ), // Foreign key to the organization
    responderId: uuid( 'responder_id' ), // (Optional) ID of the user filling out the form
    responseData: jsonb( 'response_data' ).notNull(), // JSON data storing the responses
    submittedAt: timestamp( 'submitted_at' ).defaultNow().notNull(),
} );

export const formResponseDetails = pgTable( 'form_response_details', {
    id: uuid( 'id' )
        .primaryKey()
        .default( sql`uuid_generate_v4()` ),
    formResponseId: uuid( 'form_response_id' )
        .notNull()
        .references( () => formResponses.id ), // Foreign key to form responses
    formFieldId: uuid( 'form_field_id' )
        .notNull()
        .references( () => formFields.id ), // Foreign key to form fields
    fieldValue: jsonb( 'field_value' ).notNull(), // Changed from 'text' to 'jsonb'
    createdAt: timestamp( 'created_at' ).defaultNow().notNull(),
} );





// Tags Table
export const tags = pgTable( 'tags', {
    id: uuid( 'id' ).primaryKey().default( sql`uuid_generate_v4()` ),
    name: text( 'name' ).notNull().unique(), // Tag name, must be unique
    createdAt: timestamp( 'created_at' ).default( sql`now()` ),
    updatedAt: timestamp( 'updated_at' ).default( sql`now()` )
} );







// Org Members Table
export const orgMembers = pgTable( 'org_members', {
    id: uuid( 'id' )
        .primaryKey()
        .default( sql`uuid_generate_v4()` ),
    orgId: uuid( 'org_id' )
        .notNull()
        .references( () => organizations.id ),

    tags: jsonb( 'tags' ),
    name: text( 'name' ).notNull(),
    email: text( 'email' ).notNull().unique(),
    role: text( 'role' ).notNull(), // Role within the organization
    isActive: boolean( 'is_active' ).default( true ), // Indicates if the member is currently active
    lastLogin: timestamp( 'last_login' ), // Last login time of the member
    department: text( 'department' ), // Department or team the member belongs to
    permissions: jsonb( 'permissions' ), // List of permissions or access levels
    joinedDate: date( 'joined_date' ).notNull(), // Date the member joined the organization
    profileImageUrl: text( 'profile_image_url' ), // URL of the member's profile image
    phoneNumber: text( 'phone_number' ), // Member's phone number
    isVerified: boolean( 'is_verified' ).default( false ), // Indicates if the member's email or profile is verified
    isAdmin: boolean( 'is_admin' ).default( false ), // Indicates if the member has admin privileges
    departedAt: timestamp( 'departed_at' ), // Date when the member left the organization
    notes: text( 'notes' ), // Additional notes or information about the member
    createdAt: timestamp( 'created_at' ).default( sql`now()` ),
    updatedAt: timestamp( 'updated_at' ).default( sql`now()` )
} );

// Invites Table
export const orgInvites = pgTable( 'org_invites', {
    id: uuid( 'id' )
        .primaryKey()
        .default( sql`uuid_generate_v4()` ),
    orgId: uuid( 'org_id' )
        .notNull()
        .references( () => organizations.id ),
    email: text( 'email' ).notNull(),
    status: text( 'status' ).notNull(),
    inviterId: uuid( 'inviter_id' ).references( () => userProfiles.id ),
    expiresAt: timestamp( 'expires_at' ),
    token: text( 'token' ).unique().notNull(),
    role: text( 'role' ),
    acceptedAt: timestamp( 'accepted_at' ),
    isResent: boolean( 'is_resent' ).default( false ),
    isRevoked: boolean( 'is_revoked' ).default( false ),
    createdAt: timestamp( 'created_at' ).default( sql`now()` ),
    updatedAt: timestamp( 'updated_at' ).default( sql`now()` )
} );

// Blog Posts Table with Diagrams
export const blogPosts = pgTable( 'blog_posts', {
    id: serial( 'id' ).primaryKey(),
    slug: varchar( 'slug', { length: 255 } ).notNull().unique(),
    title: text( 'title' ).notNull(),
    content: text( 'content' ).notNull(),
    excerpt: text( 'excerpt' ),
    authorId: serial( 'author_id' )
        .notNull()
        .references( () => authors.id ),
    // Add diagrams as JSONB array
    diagrams: jsonb( 'diagrams' ).default( sql`'[]'` ),
    createdAt: timestamp( 'created_at' ).defaultNow().notNull(),
    updatedAt: timestamp( 'updated_at' ).defaultNow().notNull(),
    publishedAt: timestamp( 'published_at' ),
    tags: text( 'tags' ),
    featuredImage: varchar( 'featured_image', { length: 255 } ),
    metaTitle: varchar( 'meta_title', { length: 255 } ),
    metaDescription: text( 'meta_description' ),
    isPublished: boolean( 'is_published' ).default( false ),
} );

// Type definition for diagrams
export type BlogDiagram = {
    id: string;
    type: 'mermaid';
    content: string;
    title: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
};

// Type for the entire blog post
export type BlogPost = typeof blogPosts.$inferSelect & {
    diagrams: BlogDiagram[];
};

// Authors Table
export const authors = pgTable( 'authors', {
    id: serial( 'id' ).primaryKey(),
    slug: varchar( 'slug', { length: 255 } ).notNull().unique(),
    name: varchar( 'name', { length: 100 } ).notNull(),
    bio: text( 'bio' ),
    avatarUrl: varchar( 'avatar_url', { length: 255 } ),
    createdAt: timestamp( 'created_at' ).default( sql`now()` ),
    updatedAt: timestamp( 'updated_at' ).default( sql`now()` ),
} );



